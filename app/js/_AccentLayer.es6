//stageSize, boardSize, tileSize, gameLevel, playerArr, bgArr, accArr, updateAccArr, enemyDead
class AccentLayer extends React.Component {
  constructor(props) {
    super(props);
    this.initAccArr = this.initAccArr.bind(this);
    this.initTempCanvas = this.initTempCanvas.bind(this);
    this.getAccImages = this.getAccImages.bind(this);
    this.initPaletteMaps = this.initPaletteMaps.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.setPaletteArrMap = this.setPaletteArrMap.bind(this);
    this.setAccArr = this.setAccArr.bind(this);
    this.handleEnemyDead = this.handleEnemyDead.bind(this);
    this.drawAccents = this.drawAccents.bind(this);

    this.state = ({
      srcTileSize: 16,
      wallAcc: 20,
      flrAcc: 40,
      decor0: null,
      decor1: null,
      ground0: null,
      ground1: null,
      ore0: null,
      ore1: null,
      dec0Canv: null,
      dec1Canv: null,
      grnd0Canv: null,
      grnd1Canv: null,
      ore0Canv: null,
      ore1Canv: null,
      decorMap: {},
      groundMap: {},
      oreMap: {},
      corpseMap: '',
      paletteArrMap: {},
      tempCanv: null,
    });
  }

  initAccArr() {
    const len = this.props.boardSize,
      accArr = initZeroArray(len);

    this.props.updateAccArr(accArr);
  }

  getAccImages() {
    const decor0 = new Image(),
      decor1 = new Image(),
      ground0 = new Image(),
      ground1 = new Image(),
      ore0 = new Image(),
      ore1 = new Image(),
      that = this;

    let i = 0;

    const handleAccLoad = function handleAccImageLoad() {
      i++;
      if (i === 6) {
        that.setState({ decor0, decor1, ground0, ground1, ore0, ore1 });

        //Delete after start screen created
        that.setPalettes(decor0, decor1, ground0, ground1, ore0, ore1, 1);
      }
    }

    decor0.src = 'img/accents/Decor0.png';
    decor1.src = 'img/accents/Decor1.png';
    ground0.src = 'img/accents/Ground0.png';
    ground1.src = 'img/accents/Ground1.png';
    ore0.src = 'img/accents/Ore0.png';
    ore1.src = 'img/accents/Ore1.png';

    decor0.addEventListener('load', handleAccLoad);
    decor1.addEventListener('load', handleAccLoad);
    ground0.addEventListener('load', handleAccLoad);
    ground1.addEventListener('load', handleAccLoad);
    ore0.addEventListener('load', handleAccLoad);
    ore1.addEventListener('load', handleAccLoad);
  }

  initTempCanvas() {
    const size = this.props.stageSize,
      smoothRender = false,
      tempCanv = initMemCanvas(size, size, smoothRender);

    this.setState({ tempCanv });
  }

  initPaletteMaps() {
    const ts = this.props.tileSize;

    let decorMap = {},
      groundMap = {},
      oreMap = {},
      corpseMap = [],
      w = 0,
      h = 0,
      i = 0,
      j = 0;

    //init decorMap
    w = 8;
    h = 19;
    for (i = 0; i < h; i++) {
      for (j = 0; j < w; j++) {
        decorMap[`${w * i + j}`] = [ts * j, ts * i];
      }
    }

    //init groundMap
    w = 8;
    h = 7;
    for (i = 0; i < h; i++) {
      for (j = 0; j < w; j++) {
        groundMap[`${w * i + j}`] = [ts * j, ts * i];
      }
    }

    //init oreMap
    w = 3;
    h = 2;
    for (i = 0; i < h; i++) {
      for (j = 0; j < w; j++) {
        oreMap[`${w * i + j}`] = [ts * j, ts * i];
      }
    }

    //init corpseMap
    corpseMap = '51';

    this.setPaletteArrMap(this.props.gameLevel, decorMap, groundMap, oreMap);
    this.setState({ decorMap, groundMap, oreMap, corpseMap });
  }

  setPalettes(decor0, decor1, ground0, ground1, ore0, ore1, gameLevel) {
    const lvl = gameLevel,
      gmTS = this.props.tileSize,
      srcTS = this.state.srcTileSize,
      scale = gmTS / srcTS,
      dH = 19 * gmTS,
      dW = 8 * gmTS,
      gH = 7 * gmTS,
      gW = 8 * gmTS,
      oH = 2 * gmTS,
      oW = 3 * gmTS;

    let dec0Canv = document.createElement('canvas'),
      dec0Ctx = dec0Canv.getContext('2d'),
      dec1Canv = document.createElement('canvas'),
      dec1Ctx = dec1Canv.getContext('2d'),
      grnd0Canv = document.createElement('canvas'),
      grnd0Ctx = grnd0Canv.getContext('2d'),
      grnd1Canv = document.createElement('canvas'),
      grnd1Ctx = grnd1Canv.getContext('2d'),
      ore0Canv = document.createElement('canvas'),
      ore0Ctx = ore0Canv.getContext('2d'),
      ore1Canv = document.createElement('canvas'),
      ore1Ctx = ore1Canv.getContext('2d'),
      srcX = 0,
      srcY = 0;

    //set decor
    srcY = 2 * srcTS;
    dec0Canv.width = dW;
    dec0Canv.height = dH;
    dec1Canv.width = dW;
    dec1Canv.height = dH;
    dec0Ctx.imageSmoothingEnabled = false;
    dec1Ctx.imageSmoothingEnabled = false;
    dec0Ctx.drawImage(decor0, 0, srcY, dW/scale, dH/scale, 0, 0, dW, dH);
    dec1Ctx.drawImage(decor1, 0, srcY, dW/scale, dH/scale, 0, 0, dW, dH);

    //set ground
    srcY = 0;
    grnd0Canv.width = gW;
    grnd0Canv.height = gH;
    grnd1Canv.width = gW;
    grnd1Canv.height = gH;
    grnd0Ctx.imageSmoothingEnabled = false;
    grnd1Ctx.imageSmoothingEnabled = false;
    grnd0Ctx.drawImage(ground0, 0, srcY, gW/scale, gH/scale, 0, 0, gW, gH);
    grnd1Ctx.drawImage(ground1, 0, srcY, gW/scale, gH/scale, 0, 0, gW, gH);

    //set ore
    srcX = lvl === 10 ? 5 * srcTS : 0;
    srcY = lvl === 1 ? 5 * srcTS : lvl === 2 ? 3 * srcTS : lvl === 3 ? 2 * srcTS : srcTS;
    ore0Canv.width = oW;
    ore0Canv.height = oH;
    ore1Canv.width = oW;
    ore1Canv.height = oH;
    ore0Ctx.imageSmoothingEnabled = false;
    ore1Ctx.imageSmoothingEnabled = false;
    ore0Ctx.drawImage(ore0, srcX, srcY, oW/scale, oH/scale, 0, 0, oW, oH);
    ore1Ctx.drawImage(ore1, srcX, srcY, oW/scale, oH/scale, 0, 0, oW, oH);

    this.setState({ dec0Canv, dec1Canv, grnd0Canv, grnd1Canv, ore0Canv, ore1Canv });
  }

  setPaletteArrMap(lvl, decorMap, groundMap, oreMap) {
    decorMap = decorMap || this.state.decorMap;
    groundMap = groundMap || this.state.groundMap;
    oreMap = oreMap || this.state.oreMap;

    let paletteArrMap = {};

    if (lvl && lvl < 5) {
      paletteArrMap = {
        //tWall
        '21': [decorMap['4'], 'decor'],
        '22': [oreMap['0'], 'ore'],
        '23': [oreMap['3'], 'ore'],
        //rWall
        '24': [decorMap['7'], 'decor'],
        '25': [oreMap['1'], 'ore'],
        '26': [oreMap['4'], 'ore'],
        //lWall
        '27': [oreMap['2'], 'ore'],
        '28': [oreMap['2'], 'ore'],
        '29': [oreMap['5'], 'ore'],
        //ground
        '41': [decorMap['5'], 'decor'],
        '42': [decorMap['14'], 'decor'],
        '43': [decorMap['15'], 'decor'],
        '44': [groundMap['0'], 'ground'],
        '45': [decorMap['80'], 'decor'],
        '46': [decorMap['81'], 'decor'],
        '47': [decorMap['88'], 'decor'],
        '48': [decorMap['89'], 'decor'],
        '49': [groundMap['40'], 'ground'],
        '51': [groundMap['48'], 'ground']
      }
    } else if (lvl < 10) {
      paletteArrMap = {
        //tWall
        '21': [decorMap['0'], 'decor'],
        '22': [decorMap['48'], 'decor'],
        '23': [decorMap['49'], 'decor'],
        //rWall
        '24': [decorMap['2'], 'decor'],
        '25': [decorMap['2'], 'decor'],
        '26': [decorMap['7'], 'decor'],
        //lWall
        '27': [decorMap['3'], 'decor'],
        '28': [decorMap['3'], 'decor'],
        '29': [decorMap['3'], 'decor'],
        //ground
        '41': [decorMap['1'], 'decor'],
        '42': [decorMap['72'], 'decor'],
        '43': [decorMap['74'], 'decor'],
        '44': [decorMap['76'], 'decor'],
        '45': [decorMap['82'], 'decor'],
        '46': [decorMap['83'], 'decor'],
        '47': [decorMap['90'], 'decor'],
        '48': [decorMap['91'], 'decor'],
        '49': [groundMap['40'], 'ground'],
        '51': [groundMap['48'], 'ground']
      }
    } else if (lvl === 10) {
      paletteArrMap = {
        //tWall
        '21': [decorMap['0'], 'decor'],
        '22': [decorMap['53'], 'decor'],
        '23': [decorMap['55'], 'decor'],
        //rWall
        '24': [decorMap['2'], 'decor'],
        '25': [oreMap['1'], 'ore'],
        '26': [oreMap['4'], 'ore'],
        //lWall
        '27': [decorMap['3'], 'decor'],
        '28': [oreMap['2'], 'ore'],
        '29': [oreMap['5'], 'ore'],
        //ground
        '41': [decorMap['1'], 'decor'],
        '42': [decorMap['70'], 'decor'],
        '43': [decorMap['71'], 'decor'],
        '44': [decorMap['72'], 'decor'],
        '45': [decorMap['84'], 'decor'],
        '46': [decorMap['85'], 'decor'],
        '47': [decorMap['92'], 'decor'],
        '48': [decorMap['93'], 'decor'],
        '49': [groundMap['40'], 'ground'],
        '51': [groundMap['48'], 'ground']
      }
    }
    this.setState({ paletteArrMap });
  }

  setAccArr(nextProps) {
    const bgArr = nextProps.bgArr,
      flr = this.state.flrAcc,
      wall = this.state.wallAcc,
      len = bgArr.length;

    let accArr = [...nextProps.accArr],
      nArr = [0,0,0,0,0,0,0,0],
      el = 0,
      n = 0,
      i = 0,
      j = 0;

    while (i < len) {
      while (j < len) {
        n = bgArr[i][j];
        el = 0;

        if (n > wall) {
          nArr[0] = bgArr[i - 1][j - 1];
          nArr[1] = bgArr[i - 1][j];
          nArr[2] = bgArr[i - 1][j + 1];
          nArr[3] = bgArr[i][j - 1];
          nArr[4] = bgArr[i][j + 1];
          nArr[5] = bgArr[i + 1][j - 1];
          nArr[6] = bgArr[i + 1][j];
          nArr[7] = bgArr[i + 1][j + 1];

          if ([22,25,27,35].includes(n) && nArr[6] > flr) { //tWall accents
            if (randInt(1,12) === 5) el = randInt(21,23);
          }
          if ([21,24,25,32].includes(n) && nArr[3] > flr) { //rWall accents
            if (randInt(1,15) === 5) el = randInt(24,26);
          }
          if ([23,24,27,34].includes(n) && nArr[4] > flr) { //lWall accents
            if (randInt(1,15) === 5) el = randInt(27,29);
          }
          if (n > flr) { //ground accents
            if (randInt(1,50) === 7) el = randInt(41,49);
          }
        }
        accArr[i][j] = el;
        j++;
      }
      j = 0;
      i++;
    }
    this.props.updateAccArr(accArr);
  }

  handleEnemyDead(enemyDead) {
    const {coord} = enemyDead,
      {corpseMap} = this.state;

    let {accArr} = this.props;

    accArr[coord[0]][coord[1]] = corpseMap;

    this.props.updateAccArr(accArr);
  }

  drawAccents(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const accArr = this.props.accArr,
      map = this.state.paletteArrMap,
      playerArr = this.props.playerArr,
      ts = this.props.tileSize,
      px = this.props.stageSize,
      decor0 = this.state.dec0Canv,
      decor1 = this.state.dec1Canv,
      ground0 = this.state.grnd0Canv,
      ground1 = this.state.grnd1Canv,
      ore0 = this.state.ore0Canv,
      ore1 = this.state.ore1Canv,
      dec0Data = decor0.getContext('2d').getImageData(0,0,decor0.width,decor0.height).data,
      dec1Data = decor1.getContext('2d').getImageData(0,0,decor1.width,decor1.height).data,
      grnd0Data = ground0.getContext('2d').getImageData(0,0,ground0.width,ground0.height).data,
      grnd1Data = ground1.getContext('2d').getImageData(0,0,ground1.width,ground1.height).data,
      ore0Data = ore0.getContext('2d').getImageData(0,0,ore0.width,ore0.height).data,
      ore1Data = ore1.getContext('2d').getImageData(0,0,ore1.width,ore1.height).data,
      rLen = px / ts,
      accLen = accArr.length,
      frame = (timestamp - timeRef) % 1000 *.06;

    let dCtx = document.getElementById('acc-layer').getContext('2d'),
      tempCanv = this.state.tempCanv,
      tempCtx = tempCanv.getContext('2d'),
      tImgData = tempCtx.createImageData(px, px),
      tImgPixData = tImgData.data,
      renderArr = [],
      iData = 0,
      pData = 0,
      sr = 0,
      sc = 0,
      pr = 0,
      pc = 0,
      sx = 0,
      sy = 0,
      img = null,
      imgW = 0,
      m = [],
      el = 0,
      srcX = 0,
      srcY = 0,
      dX = 0,
      dY = 0,
      h = 0,
      w = 0,
      i = 0,
      j = 0;

    if (playerArr[0] - ~~(rLen / 2) < 0) {
      sr = 0;
      pr = -1 * (playerArr[0] - ~~(rLen / 2));
    } else if (playerArr[0] + ~~(rLen / 2) + 1 > accLen) {
      pr =  playerArr[0] + ~~(rLen / 2) + 1 - accLen;
      sr = accLen - rLen + pr;
    } else {
      sr = playerArr[0] - ~~(rLen / 2);
      pr = 0;
    }
    if (playerArr[1] - ~~(rLen / 2) < 0) {
      sc = 0;
      pc = -1 * (playerArr[1] - ~~(rLen / 2));
    } else if (playerArr[1] + ~~(rLen / 2) + 1 > accLen ) {
      pc =  playerArr[1] + ~~(rLen / 2) + 1 - accLen;
      sc = accLen - rLen + pc;
    } else {
      sc = playerArr[1] - ~~(rLen / 2);
      pc = 0;
    }

    renderArr.length = rLen - pr;
    while(i < rLen - pr) {
      renderArr[i] = [];
      renderArr[i].length = rLen - pc;
      while (j < rLen - pc) renderArr[i][j] = accArr[sr + i][sc + j], j++;
      j = 0, i++;
    }

    sx = (!sc && pc) ? pc * ts : 0;
    sy = (!sr && pr) ? pr * ts : 0;

    for (i = 0; i < renderArr.length; i++) {
      for (j = 0; j < renderArr[i].length; j++) {
        el = renderArr[i][j];
        if (el) {
          m = map['' + el];

          if (frame > 29) {
            if (m[1] === 'decor') img = dec0Data, imgW = decor0.width;
            else if (m[1] === 'ore') img = ore0Data, imgW = ore0.width;
            else img = grnd0Data, imgW = ground0.width;
          } else {
            if (m[1] === 'decor') img = dec1Data, imgW = decor1.width;
            else if (m[1] === 'ore') img = ore1Data, imgW = ore1.width;
            else img = grnd1Data, imgW = ground1.width;
          }

          srcX = m[0][0];
          srcY = m[0][1];
          dX = sx + j * ts;
          dY = sy + i * ts;
          h = 0;

          while (h < ts) {
            w = 0;
            while (w < ts) {
              pData = ( (dX + w) + (dY + h) * px ) * 4;
              iData = ( (srcX + w) + (srcY + h) * imgW ) * 4;

              tImgPixData[pData] = img[iData];
              tImgPixData[pData + 1] = img[iData + 1];
              tImgPixData[pData + 2] = img[iData + 2];
              tImgPixData[pData + 3] = img[iData + 3];
              w++;
            }
            h++;
          }
        }
      }
    }

    dCtx.putImageData(tImgData, 0, 0);
    window.requestAnimationFrame(this.drawAccents);
  }

  componentWillMount() {
    this.getAccImages();
    this.initAccArr();
    this.initTempCanvas();
    this.initPaletteMaps();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameLevel !== nextProps.gameLevel) {
      this.setPaletteArrMap(nextProps.gameLevel);
      if (this.state.decor0) {
        this.setPalettes(
          this.state.decor0,
          this.state.decor1,
          this.state.ground0,
          this.state.ground1,
          this.state.ore0,
          this.state.ore1,
          nextProps.gameLevel
        );
      }
    }
    if (this.props.bgArr !== nextProps.bgArr) {
      this.setAccArr(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dec0Canv !== this.state.dec0Canv) {
      window.requestAnimationFrame(this.drawAccents);
    }
    if (prevProps.enemyDead.count !== this.props.enemyDead.count) {
      this.handleEnemyDead(this.props.enemyDead);
    }
  }

  render() {
    const size = this.props.stageSize;
    return (
      <canvas
        id = 'acc-layer'
        className = 'acc-layer'
        width = {size}
        height = {size} />
    );
  }
}
