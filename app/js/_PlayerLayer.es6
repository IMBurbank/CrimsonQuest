//props: stageSize, tileSize, hero, heroFacing, gameLevel, bgArr, playerArr, updateGameClassState,
//floorCoords
class PlayerLayer extends React.Component {
  constructor(props) {
    super(props);
    this.getPlayerImages = this.getPlayerImages.bind(this);
    this.initPaletteMap = this.initPaletteMap.bind(this);
    this.setPalette = this.setPalette.bind(this);
    this.setHeroIcon = this.setHeroIcon.bind(this);
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
      srcTS = this.state.srcTileSize,
      gmTS = nextProps.tileSize,
      scale = gmTS / srcTS,
      w = 4 * gmTS,
      h = 4 * gmTS;

    let canvas = document.createElement('canvas'),
      ctx = null;

    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext('2d');
  	ctx.imageSmoothingEnabled = false;
    ctx.drawImage(srcImg, 0, 0, w/scale, h/scale, 0, 0, w, h);

    this.setState({ playerPalette: {canvas, ctx} }, this.setHeroIcon(canvas));
  }

  setHeroIcon(canvas) {
    const w = this.props.tileSize,
      h = w;

    let heroIcon = document.createElement('canvas'),
      hCtx = null;

    heroIcon.width = w;
    heroIcon.height = h;
    hCtx = heroIcon.getContext('2d');
    hCtx.imageSmoothingEnabled = false;
    hCtx.drawImage(canvas, 0, 0, w, h, 0, 0, w, h);
    this.props.updateGameClassState({ heroIcon });
  }

  pickPlayerStart(nextProps) {
    const playerArr = nextProps.floorCoords[randInt(0, nextProps.floorCoords.length - 1)];
    nextProps.updateGameClassState({ playerArr });
  }

  drawPlayer(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const img = this.state.playerPalette.canvas,
      imgD = this.props.tileSize,
      dir = this.props.heroFacing,
      dx = (this.props.stageSize - imgD) / 2,
      dy = dx,
      srcY = dir === 'down' ? 0 : dir === 'left' ? 1 : dir === 'right' ? 2 : 3,
      frameStep = Math.floor((timestamp - timeRef) % 1000 * .06 / 15);

    let canvas = document.getElementById('player-layer'),
      ctx = canvas.getContext('2d');

    ctx.clearRect(dx, dy, imgD, imgD);
    ctx.drawImage(img, frameStep * imgD, srcY * imgD, imgD, imgD, dx, dy, imgD, imgD);
    window.requestAnimationFrame(this.drawPlayer);
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.playerPalette !== this.state.playerPalette) {
      window.requestAnimationFrame(this.drawPlayer);
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
