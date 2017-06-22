
//stageSize, boardSize, tileSize, playerArr, enemyArr, enemyPalettes, updateGameClassState
//
class LayerEnemy extends React.Component {
  constructor(props) {
    super(props);
    this.initEnemyArr = this.initEnemyArr.bind(this);
    this.getEnemyImages = this.getEnemyImages.bind(this);
    this.initTempCanvas = this.initTempCanvas.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.drawEnemies = this.drawEnemies.bind(this);

    this.lastRenderFrame = 0;
    this.lastPlayerArr = [];

    this.state = ({
      srcTileSize: 16,
      images: {},
      tempCanv: null,
      renderArr: [],
      renderPadArr: [3, 2, 1, 0, 0, 0, 1, 2, 3],
      renderInset: 3,
      renderLenBase: 0,
      minPadPx: 0,
    });
  }

  initEnemyArr() {
    const {boardSize} = this.props,
      enemyArr = initZeroArray(boardSize);

    this.props.updateGameClassState({ enemyArr });
  }

  getEnemyImages() {
    const path = 'img/characters/',
      type = '.png',
      that = this;

    let avian0Img,
      avian1Img,
      demon0Img,
      demon1Img,
      elemental0Img,
      elemental1Img,
      humanoid0Img,
      humanoid1Img,
      reptile0Img,
      reptile1Img,
      undead0Img,
      undead1Img,
      images = {
        avian0Img,
        avian1Img,
        demon0Img,
        demon1Img,
        elemental0Img,
        elemental1Img,
        humanoid0Img,
        humanoid1Img,
        reptile0Img,
        reptile1Img,
        undead0Img,
        undead1Img,
      },
      el,
      eLen = 0,
      i = 0;

    const handleItemLoad = function handleEnemyImageLoad() {
      i++;
      if (i === eLen) {
        that.setState({ images });
        that.setPalettes(images);
      }
    }

    for (el in images) {
      images[el] = new Image();
      images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
      images[el].addEventListener('load', handleItemLoad);
      eLen++;
    }
  }

  initTempCanvas() {
    const {stageSize, tileSize} = this.props,
      {renderInset} = this.state,
      renderLenBase = stageSize / tileSize - 2 * renderInset,
      minPadPx = renderInset * tileSize,
      smoothRender = false,
      maxRenderSize = renderLenBase * tileSize,
      tempCanv = initMemCanvas(maxRenderSize, maxRenderSize, smoothRender);

    let renderArr = [],
      i = 0;

    renderArr.length = renderLenBase

    while (i < renderLenBase) renderArr[i] = initZeroArray(renderLenBase), i++;

    this.setState({ tempCanv, renderArr, renderLenBase, minPadPx, maxRenderSize });
  }

  setPalettes(images) {
    const ts = this.props.tileSize,
      srcTs = this.state.srcTileSize,
      scale = ts / srcTs,
      renderSmoothing = false,
      imgPixDataName = 'imgPixData';

    let enemyPalettes = {},
      p = null,
      el = null,
      ctx = null,
      img = null,
      name = '',
      w = 0,
      h = 0;

    for (el in images) {
      img = images[el];
      name = el.slice(0, -3) + 'Palette';
      w = img.width;
      h = img.height;
      p = enemyPalettes;
      p[name] = document.createElement('canvas');
      p[name].width = scale * w;
      p[name].height = scale * h;
      ctx = p[name].getContext('2d');
      ctx.imageSmoothingEnabled = renderSmoothing;
      ctx.drawImage(img, 0, 0, w, h, 0, 0, p[name].width, p[name].height);
      p[name][imgPixDataName] = ctx.getImageData(0,0,p[name].width,p[name].height).data;
    }

    this.props.updateGameClassState({ enemyPalettes });
  }

  drawEnemies(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const {playerArr} = this.props,
      frame = (timestamp - timeRef) % 1000 *.06 > 29 ? 1 : 0;

    let lastArr = this.lastPlayerArr,
      lastFrame = this.lastRenderFrame;

    if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1] || lastFrame !== frame) {
      this.lastPlayerArr = playerArr.slice(0);
      this.lastRenderFrame = frame;

      const {tileSize, enemyArr, enemyPalettes} = this.props,
        {renderPadArr, renderLenBase, maxRenderSize, minPadPx} = this.state,
        enemyArrLen = enemyArr.length;

      let {renderArr} = this.state,
        dCtx = getById('enemy-layer').getContext('2d'),
        tempCanv = this.state.tempCanv,
        tempCtx = tempCanv.getContext('2d'),
        canvas = null,
        startRow = 0,
        startCol = 0,
        padRow = 0,
        padCol = 0,
        renderArrHeight = 0,
        renderArrWidth = 0,
        renderPadX = 0,
        renderPadY = 0,
        el = 0,
        srcX = 0,
        srcY = 0,
        dX = 0,
        dY = 0,
        i = 0,
        j = 0;

      if (playerArr[0] < ~~(renderLenBase / 2)) {
        startRow = 0;
        padRow = ~~(renderLenBase / 2) - playerArr[0];
      } else if (playerArr[0] + ~~(renderLenBase / 2) + 1 > enemyArrLen) {
        padRow =  playerArr[0] + ~~(renderLenBase / 2) + 1 - enemyArrLen;
        startRow = enemyArrLen - renderLenBase + padRow;
      } else {
        startRow = playerArr[0] - ~~(renderLenBase / 2);
        padRow = 0;
      }

      if (playerArr[1] < ~~(renderLenBase / 2)) {
        startCol = 0;
        padCol = ~~(renderLenBase / 2) - playerArr[1];
      } else if (playerArr[1] + ~~(renderLenBase / 2) + 1 > enemyArrLen ) {
        padCol =  playerArr[1] + ~~(renderLenBase / 2) + 1 - enemyArrLen;
        startCol = enemyArrLen - renderLenBase + padCol;
      } else {
        startCol = playerArr[1] - ~~(renderLenBase / 2);
        padCol = 0;
      }

      renderArrHeight = renderLenBase - padRow;
      renderArrWidth = renderLenBase - padCol;

      while(i < renderArrHeight) {
        while (j < renderArrWidth) {
          if (j >= renderPadArr[(startRow ? i : i + padRow)] &&
            j < renderArrHeight - renderPadArr[(startCol ? i : i + padCol)]) {

            renderArr[i][j] = enemyArr[startRow + i][startCol + j];

          } else {
            renderArr[i][j] = 0;
          }
          j++;
        }
        j = 0, i++;
      }

      renderPadX = (!startCol && padCol) ? (padCol) * tileSize : 0;
      renderPadY = (!startRow && padRow) ? (padRow) * tileSize : 0;

      tempCtx.clearRect(0, 0, maxRenderSize, maxRenderSize);

      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          el = renderArr[i][j];

          if (el) {
            canvas = enemyPalettes[el.palette[frame]];
            srcX = el.iconLoc[0];
            srcY = el.iconLoc[1];
            dX = renderPadX + j * tileSize;
            dY = renderPadY + i * tileSize;

            tempCtx.drawImage(
              canvas,
              srcX,
              srcY,
              tileSize,
              tileSize,
              dX,
              dY,
              tileSize,
              tileSize
            );
          }
        }
      }

      dCtx.clearRect(minPadPx, minPadPx, maxRenderSize, maxRenderSize);
      dCtx.drawImage(
        tempCanv,
        renderPadX,
        renderPadY,
        renderArrWidth * tileSize,
        renderArrHeight * tileSize,
        minPadPx + renderPadX,
        minPadPx + renderPadY,
        renderArrWidth * tileSize,
        renderArrHeight * tileSize);
    }

    window.requestAnimationFrame(this.drawEnemies);
  }

  componentWillMount() {
    this.getEnemyImages();
    this.initEnemyArr();
    this.initTempCanvas();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!Object.keys(this.props.enemyPalettes).length &&
      Object.keys(nextProps.enemyPalettes).length) {

      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    window.requestAnimationFrame(this.drawEnemies);

  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawEnemies);
  }

  render() {
    const size = this.props.stageSize;
    return (
      <canvas
        id = 'enemy-layer'
        className = 'enemy-layer'
        width = {size}
        height = {size} />
    );
  }
}
