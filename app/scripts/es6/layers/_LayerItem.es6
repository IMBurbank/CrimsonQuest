//props: boardSize, stageSize, tileSize, gameLevel, levels, bgArr, itemArr, updateGameClassState
//playerArr, itemPalettes, floorCoords, itemPaletteArrMap, enemyDead, bgLevelProcessed
class LayerItem extends React.Component {
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
    this.lastRenderFrame = 0;
    this.lastPlayerArr = [];

    this.state = ({
      srcTileSize: 16,
      itemTypes: [],
      images: {},
      spawnQuants: [],
      tempCanv: null,
      renderArr: [],
      portalCoord: [],
      displayedItems: ['consumable', 'gold', 'openChest', 'door']
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
      tempCanv = initMemCanvas(stageSize, stageSize, smoothRender),
      renderArr = initZeroArray(rLen);

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
      index = randInt(0, fLen - 1);
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
  }

  drawItems(timestamp) {
    if (!timeRef) timeRef = timestamp;

    const {playerArr} = this.props,
      frame = (timestamp - timeRef) % 1000 *.06 > 29 ? 1 : 0;

    let lastArr = this.lastPlayerArr,
      lastFrame = this.lastRenderFrame;

    if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1] || lastFrame !== frame) {
      this.lastPlayerArr = playerArr.slice(0);
      this.lastRenderFrame = frame;

      const {tileSize, stageSize, itemArr, itemPaletteArrMap, itemPalettes} = this.props,
        {displayedItems} = this.state,
        iLen = itemArr.length,
        rLen = stageSize / tileSize;

      let {renderArr, tempCanv} = this.state,
        dCtx = document.getElementById('item-layer').getContext('2d'),
        tempCtx = tempCanv.getContext('2d'),
        palette = '',
        img = null,
        item = undefined,
        el = 0,
        srcX = 0,
        srcY = 0,
        dX = 0,
        dY = 0,
        i = 0,
        j = 0;

      let {startRow, startCol, renderArrHeight, renderArrWidth, sX, sY} =
        calcRenderPadding(playerArr, iLen, rLen, tileSize);

      while(i < renderArrHeight) {
        while (j < renderArrWidth) {
          renderArr[i][j] = itemArr[startRow + i][startCol + j], j++;
        }
        j = 0, i++;
      }

      tempCtx.clearRect(0, 0, stageSize, stageSize)

      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          el = renderArr[i][j];
          if (el) {
            item = displayedItems.includes(itemPaletteArrMap[`${el}`].type) ?
              itemPaletteArrMap[`${el}`] :
              chestConsumables.closedChest;
            palette = item.type === 'door' ? item.palette[frame] : item.palette;
            img = itemPalettes[palette];

            srcX = item.iconLoc[0];
            srcY = item.iconLoc[1];
            dX = sX + j * tileSize;
            dY = sY + i * tileSize;

            tempCtx.drawImage(img, srcX, srcY, tileSize, tileSize, dX, dY, tileSize, tileSize);
          }
        }
      }

      dCtx.clearRect(0, 0, stageSize, stageSize);
      dCtx.drawImage(tempCanv, 0, 0, stageSize, stageSize);
    }

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

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawItems);
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
