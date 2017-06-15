//props: stageSize, tileSize, hero, heroFacing, gameLevel, bgArr, playerArr, updateGameClassState,
//floorCoords, bgLevelProcessed, playerPalettes
class PlayerLayer extends React.Component {
  constructor(props) {
    super(props);
    this.getPlayerImages = this.getPlayerImages.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.setHeroIcon = this.setHeroIcon.bind(this);
    this.pickPlayerStart = this.pickPlayerStart.bind(this);
    this.drawPlayer = this.drawPlayer.bind(this);

    this.drawingStart = false;
    this.startHeroIcon = false;

    this.state = ({
      srcTileSize: 16,
      mageImg: null,
      rogueImg: null,
      paladinImg: null,
      warriorImg: null,
      images: {}
    });
  }

  getPlayerImages() {
    const mageImg = new Image,
      rogueImg = new Image,
      paladinImg = new Image,
      warriorImg = new Image,
      that = this;

    let images = {},
      i = 0;

    const handleLoad = function handleImageLoad() {
      i++;
      if (i === 4) {
        images = { mageImg, rogueImg, paladinImg, warriorImg };
        that.setState(images, that.setPalettes(images));
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

  setPalettes(images) {
    const srcTS = this.state.srcTileSize,
      gmTS = this.props.tileSize,
      scale = gmTS / srcTS,
      w = 4 * gmTS,
      h = 4 * gmTS;

    let playerPalettes = {},
      canvas = null,
      ctx = null,
      img = null;

    for (img in images) {
      canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      ctx = canvas.getContext('2d');
    	ctx.imageSmoothingEnabled = false;
      ctx.drawImage(images[img], 0, 0, w/scale, h/scale, 0, 0, w, h);

      playerPalettes[img] = canvas;
    }

    this.props.updateGameClassState({ playerPalettes });
  }

  setHeroIcon() {
    const {playerPalettes} = this.props,
      heroImageKey = this.props.hero.toLowerCase() + 'Img',
      w = this.props.tileSize,
      h = w;

    let heroIcon = document.createElement('canvas'),
      hCtx = null;

    heroIcon.width = w;
    heroIcon.height = h;
    hCtx = heroIcon.getContext('2d');
    hCtx.imageSmoothingEnabled = false;
    hCtx.drawImage(playerPalettes[heroImageKey], 0, 0, w, h, 0, 0, w, h);
    this.props.updateGameClassState({ heroIcon });
  }

  pickPlayerStart(nextProps) {
    let {floorCoords} = nextProps;

    const index = randInt(0, nextProps.floorCoords.length - 1),
      playerArr = floorCoords[index],
      filterDistance = 8;

    floorCoords = floorCoords.filter(
      a => Math.abs( a[0] - playerArr[0] ) + Math.abs( a[1] - playerArr[1] ) > filterDistance
    );

    this.props.updateGameClassState({ playerArr, floorCoords });
  }

  drawPlayer(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const img = this.props.playerPalettes[this.props.hero.toLowerCase() + 'Img'],
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bgLevelProcessed !== nextProps.bgLevelProcessed) {
      console.log('New Player Start');
      this.pickPlayerStart(nextProps);
    }
    /*?
    if (!this.state.playerPalettes && nextProps.hero && this.state.mageImg) {
      this.setPalettes(nextProps);
    }
    */
  }

  componentDidUpdate(prevProps, prevState) {
    //REDO
    if (!this.drawingStart &&
      this.props.hero &&
      this.props.playerPalettes[this.props.hero.toLowerCase()+'Img']) {

      this.drawingStart = true;
      window.requestAnimationFrame(this.drawPlayer);
    }
    if (!this.props.heroIcon &&
      !this.startHeroIcon &&
      this.props.hero &&
      this.props.playerPalettes[this.props.hero.toLowerCase()+'Img']) {

      this.startHeroIcon = true;
      this.setHeroIcon();
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
