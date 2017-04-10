//props: stageSize, tileSize, hero, gameLevel, bgArr, playerArr, updatePlayerArr, floorCoords
class PlayerLayer extends React.Component {
  constructor(props) {
    super(props);
    this.getPlayerImages = this.getPlayerImages.bind(this);
    this.initPaletteMap = this.initPaletteMap.bind(this);
    this.setPalette = this.setPalette.bind(this);
    this.pickPlayerStart = this.pickPlayerStart.bind(this);
    this.drawPlayer = this.drawPlayer.bind(this);

    this.state = ({
      srcTileSize: 16,
      mageImg: null,
      rogueImg: null,
      paladinImg: null,
      warriorImg: null,
      playerPalette: null,
      playerPaletteMap: {},
    });
  }

  getPlayerImages() {
    const mageImg = new Image,
      rogueImg = new Image,
      paladinImg = new Image,
      warriorImg = new Image,
      that = this;

    let i = 0;

    const handleLoad = function handleImageLoad() {
      i++;
      if (i === 4) {
        that.setState({ mageImg, rogueImg, paladinImg, warriorImg });

        //temporary palette assignment until start screen is created
        that.setPalette(that.props);
      }
    }

    mageImg.src = 'img/heroes/Mage.png';
    rogueImg.src = 'img/heroes/Rogue.png';
    paladinImg.src = 'img/heroes/Paladin.png';
    warriorImg.src = 'img/heroes/Warrior.png';
    mageImg.addEventListener('load', handleLoad);
    rogueImg.addEventListener('load', handleLoad);
    paladinImg.addEventListener('load', handleLoad);
    warriorImg.addEventListener('load', handleLoad);
  }

  initPaletteMap() {
    const ts = this.props.tileSize,
      w = 4;

    let playerPaletteMap = {},
      j = 0;

    ['down', 'left', 'right', 'up'].forEach( (el, i) => {
      for (j = 0; j < w; j++) {
        playerPaletteMap[el + (j + 1)] = [i * ts, j * ts];
      }
    });

    this.setState({ playerPaletteMap });
  }

  setPalette(nextProps) {
    const hero = nextProps.hero.toLowerCase(),
      srcImg = this.state[hero + 'Img'],
      srcTileSize = this.state.srcTileSize,
      gmTileSize = nextProps.tileSize,
      scale = gmTileSize / srcTileSize,
      w = 4 * gmTileSize,
      h = 4 * gmTileSize;

    let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;
  	ctx.imageSmoothingEnabled = false;
    ctx.drawImage(srcImg, 0, 0, w/scale, h/scale, 0, 0, w, h);

    this.setState({ playerPalette: {canvas, ctx} });
  }

  pickPlayerStart(nextProps) {
    const playerArr = nextProps.floorCoords[randInt(0, nextProps.floorCoords.length - 1)];
    nextProps.updatePlayerArr(playerArr);
  }

  drawPlayer(nextProps, nextState) {
    const img = nextState.playerPalette.canvas,
      imgD = nextProps.tileSize,
      stageD = nextProps.stageSize,
      sCoord = [0,0], //temp static
      dx = (stageD - imgD) / 2,
      dy = dx;

    let canvas = document.getElementById('player-layer'),
      ctx = canvas.getContext('2d');

    ctx.drawImage(img, sCoord[0], sCoord[1], imgD, imgD, dx, dy, imgD, imgD);
  }

  componentWillMount() {
    this.getPlayerImages();
    this.initPaletteMap();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bgArr !== nextProps.bgArr) {
      this.pickPlayerStart(nextProps);
    }
    /*
    if (!this.state.playerPalette && nextProps.hero && this.state.mageImg) {
      this.setPalette(nextProps);
    }
    */
  }

  componentWillUpdate(nextProps, nextState) {
    //stub rule
    if (this.state.playerPalette !== nextState.playerPalette) {
      this.drawPlayer(nextProps, nextState);
    }
  }

  render() {
    const size = this.props.stageSize;
    return (
      <canvas
        id = 'player-layer'
        className = 'player-layer'
        width = {size}
        height = {size} />
    );
  }
}
