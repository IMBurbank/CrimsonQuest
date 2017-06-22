//props: stageSize, boardSize, tileSize, gameLevel, bgArr, playerArr,
//bgLevelProcessed, updateGameClassState
class LayerBackground extends React.Component {
  constructor(props) {
    super(props);
    this.initTempCanvas = this.initTempCanvas.bind(this);
    this.getBgImages = this.getBgImages.bind(this);
    this.initPaletteMaps = this.initPaletteMaps.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.drawBackground = this.drawBackground.bind(this);

    this.lastPlayerArr = [];

    this.state = ({
      srcTileSize: 16,
      floorImg: null,
      wallImg: null,
      floorPalette: {},
      wallPalette: {},
      floorPaletteMap: {},
      wallPaletteMap: {},
      tempCanv: null,
      renderArr: [],
      playerLoc: []
    });
  }

  getBgImages() {
    const floorImg = new Image(),
      wallImg = new Image(),
      that = this;

    let i = 0;

    const handleLoad = function handleImageLoad() {
      i++;
      if (i === 2) {
        that.setState({ floorImg, wallImg });

        that.setPalettes(floorImg, wallImg, that.props.gameLevel);
      }
    }

    floorImg.src = 'img/terrain/Floor.png';
    wallImg.src = 'img/terrain/Wall.png';
    floorImg.addEventListener('load', handleLoad);
    wallImg.addEventListener('load', handleLoad);
  }

  initTempCanvas() {
    const {stageSize, tileSize} = this.props,
      rLen = stageSize / tileSize,
      smoothRender = false,
      tempCanv = initMemCanvas(stageSize, stageSize, smoothRender);

    let renderArr = [],
      i = 0;

    renderArr.length = rLen;

    while (i < rLen) renderArr[i] = initZeroArray(rLen), i++;

    this.setState({ tempCanv, renderArr });
  }

  initPaletteMaps() {
    const ts = this.props.tileSize;

    const floorPaletteMap = {
      '41': [0,0],
      '42': [ts, 0],
      '43': [2*ts, 0],
      '44': [0, ts],
      '45': [ts, ts],
      '46': [2*ts, ts],
      '47': [0, 2*ts],
      '48': [ts, 2*ts],
      '49': [2*ts, 2*ts],
      '51': [3*ts, 0],
      '52': [3*ts, ts],
      '53': [3*ts, 2*ts],
      '54': [4*ts, ts],
      '55': [5*ts, ts],
      '56': [6*ts, ts],
      '57': [5*ts, 0],
    };

    const wallPaletteMap = {
      '21': [0,0],
      '22': [ts, 0],
      '23': [2*ts, 0],
      '24': [0, ts],
      '25': [0, 2*ts],
      '26': [ts, ts],
      '27': [2*ts, 2*ts],
      '31': [4*ts, 0],
      '32': [3*ts, ts],
      '33': [4*ts, ts],
      '34': [5*ts, ts],
      '35': [4*ts, 2*ts],
      '36': [3*ts, 0],
    };

    this.setState({ floorPaletteMap, wallPaletteMap });
  }

  setPalettes(floorImg, wallImg, gameLevel) {
    const lvl = gameLevel,
      gmTileSize = this.props.tileSize,
      srcTileSize = this.state.srcTileSize,
      scale = gmTileSize / srcTileSize,
      h = 3 * gmTileSize,
      fw = 7 * gmTileSize,
      ww = 6 * gmTileSize;

    let fCanvas = document.createElement('canvas'),
      fCtx = fCanvas.getContext('2d'),
      wCanvas = document.createElement('canvas'),
      wCtx = wCanvas.getContext('2d'),
      srcY = 3 * srcTileSize;

    srcY *= lvl === 1 ? 5 :
      lvl === 2 ? 6 :
      lvl === 3 ? 7 :
      lvl === 4 ? 8 :
      lvl === 5 ? 1 :
      lvl < 8 ? 2 :
      lvl < 10 ? 3 :
      lvl === 10 ? 4 : 1;

    fCanvas.width = fw;
    fCanvas.height = h;
    fCtx.imageSmoothingEnabled = false;
    fCtx.drawImage(floorImg, 0, srcY, fw/scale, h/scale, 0, 0, fw, h);

    wCanvas.width = ww;
    wCanvas.height = h;
    wCtx.imageSmoothingEnabled = false;
    wCtx.drawImage(wallImg, 0, srcY, ww/scale, h/scale, 0, 0, ww, h);

    this.setState({
      floorPalette: { canvas: fCanvas, ctx: fCtx },
      wallPalette: { canvas: wCanvas, ctx: wCtx }
    });

    //Delete after start screen created
    //(this.props.playerArr !== [0,0] && this.drawBackground(this.props, this.state));
  }

  drawBackground(timestamp) {
    const {playerArr} = this.props;
    let lastArr = this.lastPlayerArr;

    if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1]) {
      this.lastPlayerArr = playerArr.slice(0);

      const {bgArr} = this.props,
        flrImg = this.state.floorPalette.canvas,
        wallImg = this.state.wallPalette.canvas,
        flrImgMap = this.state.floorPaletteMap,
        wallImgMap = this.state.wallPaletteMap,
        ts = this.props.tileSize,
        px = this.props.stageSize,
        bgLen = bgArr.length,
        rLen = px / ts,
        air = 10,
        flr = 40;

      let {renderArr, tempCanv} = this.state,
        dCtx = document.getElementById('bg-layer').getContext('2d'),
        tempCtx = tempCanv.getContext('2d'),
        img = null,
        map = null,
        el = 0,
        srcX = 0,
        srcY = 0,
        i = 0,
        j = 0;

      let {startRow, startCol, renderArrHeight, renderArrWidth, sX, sY} =
        calcRenderPadding(playerArr, bgLen, rLen, ts);

      while(i < renderArrHeight) {
        while (j < renderArrWidth) renderArr[i][j] = bgArr[startRow + i][startCol + j], j++;
        j = 0, i++;
      }

      tempCtx.fillRect(0, 0, px, px);

      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          el = renderArr[i][j];
          if (el > air) {
            img = el < flr ? wallImg : flrImg;
            map = el < flr ? wallImgMap : flrImgMap;
            srcX = map['' + el][0];
            srcY = map['' + el][1];

            tempCtx.drawImage(img, srcX, srcY, ts, ts, sX + j * ts, sY + i * ts, ts, ts);
          }
        }
      }

      dCtx.drawImage(tempCanv, 0, 0, px, px);
    }

    window.requestAnimationFrame(this.drawBackground);
  }

  componentWillMount() {
    this.getBgImages();
    this.initTempCanvas();
    this.initPaletteMaps();

    const { bgArr, floorCoords } = backgroundArray(this.props.boardSize);

    const bgLevelProcessed = this.props.gameLevel;

    this.props.updateGameClassState({ bgArr, bgLevelProcessed, floorCoords });
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.gameLevel !== nextProps.gameLevel && nextProps.gameLevel) ||
      nextProps.bgLevelProcessed === 0) {

      const { bgArr, floorCoords } = backgroundArray(this.props.boardSize);

      const bgLevelProcessed = nextProps.gameLevel;

      this.props.updateGameClassState({ bgArr, bgLevelProcessed, floorCoords });

      if (this.state.floorImg) {
        this.setPalettes(this.state.floorImg, this.state.wallImg, nextProps.gameLevel);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.floorImg && nextState.floorImg) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    window.requestAnimationFrame(this.drawBackground);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawBackground);
  }

  render() {
    const size = this.props.stageSize;
    return (
      <canvas
        id = 'bg-layer'
        className = 'bg-layer'
        width = {size}
        height = {size} />
    );
  }
}
