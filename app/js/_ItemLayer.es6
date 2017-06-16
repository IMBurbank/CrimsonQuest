//props: boardSize, stageSize, tileSize, gameLevel, levels, bgArr, itemArr, updateGameClassState
//playerArr, itemPalettes, floorCoords, itemPaletteArrMap, enemyDead, bgLevelProcessed
class ItemLayer extends React.Component {
  constructor(props) {
    super(props);
    this.initItemArr = this.initItemArr.bind(this);
    this.initTempCanvas = this.initTempCanvas.bind(this);
    this.getItemImages = this.getItemImages.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.setPaletteArrMap = this.setPaletteArrMap.bind(this);
    this.setSpawnQuants = this.setSpawnQuants.bind(this);
    this.setItemArr = this.setItemArr.bind(this);
    this.activatePortal = this.activatePortal.bind(this);
    this.drawItems = this.drawItems.bind(this);

    this.enemyDeadCount = 0;
    this.levelProcessed = 0;

    this.state = ({
      srcTileSize: 16,
      itemTypes: [],
      images: {},
      spawnQuants: [],
      tempCanv: null,
      renderArr: [],
      portalCoord: []
    });
  }

  initItemArr() {
    const len = this.props.boardSize,
      itemArr = initZeroArray(len);

    this.props.updateGameClassState({ itemArr });
  }

  getItemImages() {
    const path = 'img/items/',
      type = '.png',
      that = this;

    let amuletImg,
      armorImg,
      bookImg,
      bootImg,
      chest0Img,
      chest1Img,
      door0Img,
      door1Img,
      gloveImg,
      hatImg,
      longWepImg,
      medWepImg,
      moneyImg,
      potionImg,
      ringImg,
      shieldImg,
      shortWepImg,
      wandImg,
      images = {
        amuletImg,
        armorImg,
        bookImg,
        bootImg,
        chest0Img,
        chest1Img,
        door0Img,
        door1Img,
        gloveImg,
        hatImg,
        longWepImg,
        medWepImg,
        moneyImg,
        potionImg,
        ringImg,
        shieldImg,
        shortWepImg,
        wandImg
      },
      el,
      iLen = 0,
      i = 0;

    const handleItemLoad = function handleItemImageLoad() {
      i++;
      if (i === iLen) {
        that.setState({ images });
        that.setPalettes(images);
      }
    }

    for (el in images) {
      images[el] = new Image();
      images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
      images[el].addEventListener('load', handleItemLoad);
      iLen++;
    }
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

  setPalettes(images) {
    const ts = this.props.tileSize,
      srcTs = this.state.srcTileSize,
      scale = ts / srcTs,
      renderSmoothing = false,
      imgPixDataName = 'imgPixData';

    let itemPalettes = {},
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
      p = itemPalettes;
      p[name] = document.createElement('canvas');
      p[name].width = scale * w;
      p[name].height = scale * h;
      ctx = p[name].getContext('2d');
      ctx.imageSmoothingEnabled = renderSmoothing;
      ctx.drawImage(img, 0, 0, w, h, 0, 0, p[name].width, p[name].height);
      p[name][imgPixDataName] = ctx.getImageData(0,0,p[name].width,p[name].height).data;
    }

    this.props.updateGameClassState({itemPalettes});
  }

  setPaletteArrMap() {
    const itemTypes = [
      itemAmulets,
      itemArmors,
      itemFeet,
      itemGloves,
      itemHelmets,
      itemRings,
      itemShields,
      itemWeapons,
      itemConsumables,
      chestConsumables,
      interactivePortals
    ];

    let itemPaletteArrMap = {},
      i = 101,
      props = null;

    itemTypes.forEach( el => {
      for (props in el) {
        el[props]['itemArrVal'] = i;
        itemPaletteArrMap[`${i}`] = el[props];
        i++;
      }
    });

    this.setSpawnQuants(itemTypes);
    this.setState({ itemTypes });
    this.props.updateGameClassState({ itemPaletteArrMap });
  }

  setSpawnQuants(itemTypes) {
    const levels = this.props.levels,
      valKey = 'itemArrVal';

    let spawnQuants = [],
      item = [],
      spawnObj = {},
      props = null,
      lvl = 0,
      val = 0,
      i = 0;

    spawnQuants.length = levels;
    while (i < levels) spawnQuants[i] = [], i++;

    itemTypes.forEach( el => {
      for (props in el) {
        spawnObj = el[props]
        val = spawnObj[valKey];
        for (lvl in spawnObj.spawnQuant) {
          item = [val, spawnObj.spawnQuant[lvl]];
          spawnQuants[lvl * 1 - 1].push(item);
        }
      }
    });

    this.setState({ spawnQuants });
  }

  setItemArr(nextProps, nextState) {
    const {spawnQuants} = nextState,
      {gameLevel, bgArr} = nextProps,
      topCenterFloorVal = 42;

    let itemArr = [...nextProps.itemArr],
      floorCoords = [...nextProps.floorCoords],
      len = itemArr.length,
      fLen = floorCoords.length,
      coord = [],
      index = 0,
      cur = 0,
      i = 0,
      j = 0;

    while (i < len) {
      while (j < len) itemArr[i][j] = 0, j++;
      j = 0, i++;
    }

    spawnQuants[gameLevel - 1].forEach(
      el => {
        for (i = 0; i < el[1]; i++) {
          index = randInt(0, fLen);
          coord = floorCoords[index];
          itemArr[coord[0]][coord[1]] = el[0];
          floorCoords.splice(index, 1);
          fLen--;
        }
      }
    );

    while (cur !== topCenterFloorVal) {
      index = randInt(0, fLen);
      coord = floorCoords[index];
      cur = bgArr[coord[0]][coord[1]];
    }

    coord[0]--;
    itemArr[coord[0]][coord[1]] = interactivePortals['inactivePortal'].itemArrVal;

    this.setState({ portalCoord: coord });
    this.props.updateGameClassState({ floorCoords, itemArr, itemLevelProcessed: gameLevel });
  }

  activatePortal() {
    const {portalCoord} = this.state,
      activePortal = interactivePortals['activePortal'];

    let itemArr = [...this.props.itemArr];

    itemArr[portalCoord[0]][portalCoord[1]] = activePortal.itemArrVal;

    this.props.updateGameClassState({ itemArr });

    console.log('Potal Activated');
  }

  drawItems(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const pIndex = (timestamp - timeRef) % 1000 *.06 > 29 ? 1 : 0,
      {itemArr, playerArr, itemPaletteArrMap, itemPalettes} = this.props,
      ts = this.props.tileSize,
      px = this.props.stageSize,
      iLen = itemArr.length,
      rLen = px / ts,
      displayedItems = ['consumable', 'gold', 'openChest', 'door'];

    let {renderArr, tempCanv} = this.state,
      dCtx = document.getElementById('item-layer').getContext('2d'),
      tempCtx = tempCanv.getContext('2d'),
      renderArrHeight = 0,
      renderArrWidth = 0,
      sr = 0,
      sc = 0,
      pr = 0,
      pc = 0,
      sx = 0,
      sy = 0,
      palette = '',
      img = null,
      m = [],
      el = 0,
      srcX = 0,
      srcY = 0,
      dX = 0,
      dY = 0,
      i = 0,
      j = 0;

    //Use helper functions if performance is acceptable
    //const padding = calcRenderPadding(playerArr, iLen, rLen);
    //const renderArr = setRenderArr(itemArr, rLen, padding);

    if (playerArr[0] - ~~(rLen / 2) < 0) {
      sr = 0;
      pr = -1 * (playerArr[0] - ~~(rLen / 2));
    } else if (playerArr[0] + ~~(rLen / 2) + 1 > iLen) {
      pr =  playerArr[0] + ~~(rLen / 2) + 1 - iLen;
      sr = iLen - rLen + pr;
    } else {
      sr = playerArr[0] - ~~(rLen / 2);
      pr = 0;
    }
    if (playerArr[1] - ~~(rLen / 2) < 0) {
      sc = 0;
      pc = -1 * (playerArr[1] - ~~(rLen / 2));
    } else if (playerArr[1] + ~~(rLen / 2) + 1 > iLen ) {
      pc =  playerArr[1] + ~~(rLen / 2) + 1 - iLen;
      sc = iLen - rLen + pc;
    } else {
      sc = playerArr[1] - ~~(rLen / 2);
      pc = 0;
    }

    renderArrHeight = rLen - pr;
    renderArrWidth = rLen - pc;

    while(i < renderArrHeight) {
      while (j < renderArrWidth) renderArr[i][j] = itemArr[sr + i][sc + j], j++;
      j = 0, i++;
    }

    sx = (!sc && pc) ? pc * ts : 0;
    sy = (!sr && pr) ? pr * ts : 0;

    tempCtx.clearRect(0, 0, px, px)

    for (i = 0; i < renderArrHeight; i++) {
      for (j = 0; j < renderArrWidth; j++) {
        el = renderArr[i][j];
        if (el) {
          m = displayedItems.includes(itemPaletteArrMap[`${el}`].type) ?
            itemPaletteArrMap[`${el}`] :
            chestConsumables.closedChest;
          palette = m.type === 'door' ? m.palette[pIndex] : m.palette;
          img = itemPalettes[palette];

          srcX = m.iconLoc[0];
          srcY = m.iconLoc[1];
          dX = sx + j * ts;
          dY = sy + i * ts;//here

          tempCtx.drawImage(img, srcX, srcY, ts, ts, dX, dY, ts, ts);
        }
      }
    }

    dCtx.clearRect(0, 0, px, px);
    dCtx.drawImage(tempCanv, 0, 0);
    window.requestAnimationFrame(this.drawItems);
  }

  componentWillMount() {
    this.getItemImages();
    this.initItemArr();
    this.initTempCanvas();
    this.setPaletteArrMap();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.levelProcessed !== nextProps.bgLevelProcessed &&
      (this.props.playerArr[0] !== nextProps.playerArr[0] ||
      this.props.playerArr[1] !== nextProps.playerArr[1])) {
      console.log('New Item Array')

      this.levelProcessed = nextProps.bgLevelProcessed;
      this.setItemArr(nextProps, nextState)
    }

    if (nextProps.enemyDead.count !== this.enemyDeadCount) {
      this.enemyDeadCount = nextProps.enemyDead.count;
      if (nextProps.enemyDead.source.boss) this.activatePortal();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.keys(prevProps.itemPalettes).length !== Object.keys(this.props.itemPalettes).length &&
      Object.keys(this.props.itemPalettes).length) {

      window.requestAnimationFrame(this.drawItems);
    }
  }

  render() {
    const size = this.props.stageSize;
    return (
      <canvas
        id = 'item-layer'
        className = 'item-layer'
        width = {size}
        height = {size} />
    );
  }
}
