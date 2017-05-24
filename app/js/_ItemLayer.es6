//props: boardSize, stageSize, tileSize, gameLevel, levels, bgArr, itemArr, updateGameClassState
//playerArr, itemPalettes, floorCoords, itemPaletteArrMap, enemyDead
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
    this.drawItems = this.drawItems.bind(this);

    this.state = ({
      srcTileSize: 16,
      itemTypes: [],
      images: {},
      spawnQuants: [],
      tempCanv: null,
      lvlProcessed: 0
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
    const size = this.props.stageSize,
      smoothRender = false,
      tempCanv = initMemCanvas(size, size, smoothRender);

    this.setState({ tempCanv });
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
      chestConsumables
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
    const quants = nextState.spawnQuants,
      lvl = nextProps.gameLevel;

    let itemArr = [...nextProps.itemArr],
      floorCoords = [...nextProps.floorCoords],
      len = itemArr.length,
      fLen = floorCoords.length,
      coord = [],
      index = 0,
      i = 0,
      j = 0;

    while (i < len) {
      while (j < len) itemArr[i][j] = 0, j++;
      j = 0, i++;
    }

    quants[lvl - 1].forEach(
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

    this.setState({ lvlProcessed: lvl });
    this.props.updateGameClassState({ floorCoords, itemArr });
  }

  drawItems(nextProps) {
    const iArr = nextProps.itemArr,
      pArr = nextProps.playerArr,
      map = nextProps.itemPaletteArrMap,
      pals = nextProps.itemPalettes,
      ts = nextProps.tileSize,
      px = nextProps.stageSize,
      iLen = iArr.length,
      rLen = px / ts;

    let dCtx = document.getElementById('item-layer').getContext('2d'),
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

    //Use helper functions if performance is acceptable
    //const padding = calcRenderPadding(playerArr, iLen, rLen);
    //const renderArr = setRenderArr(itemArr, rLen, padding);

    if (pArr[0] - ~~(rLen / 2) < 0) {
      sr = 0;
      pr = -1 * (pArr[0] - ~~(rLen / 2));
    } else if (pArr[0] + ~~(rLen / 2) + 1 > iLen) {
      pr =  pArr[0] + ~~(rLen / 2) + 1 - iLen;
      sr = iLen - rLen + pr;
    } else {
      sr = pArr[0] - ~~(rLen / 2);
      pr = 0;
    }
    if (pArr[1] - ~~(rLen / 2) < 0) {
      sc = 0;
      pc = -1 * (pArr[1] - ~~(rLen / 2));
    } else if (pArr[1] + ~~(rLen / 2) + 1 > iLen ) {
      pc =  pArr[1] + ~~(rLen / 2) + 1 - iLen;
      sc = iLen - rLen + pc;
    } else {
      sc = pArr[1] - ~~(rLen / 2);
      pc = 0;
    }

    renderArr.length = rLen - pr;
    while(i < rLen - pr) {
      renderArr[i] = [];
      renderArr[i].length = rLen - pc;
      while (j < rLen - pc) renderArr[i][j] = iArr[sr + i][sc + j], j++;
      j = 0, i++;
    }

    sx = (!sc && pc) ? pc * ts : 0;
    sy = (!sr && pr) ? pr * ts : 0;

    for (i = 0; i < renderArr.length; i++) {
      for (j = 0; j < renderArr[i].length; j++) {
        el = renderArr[i][j];
        if (el) {
          m = ['consumable', 'gold', 'openChest'].includes(map[`${el}`].type) ? map[`${el}`] :
            chestConsumables.closedChest;;
          img = pals[m.palette].imgPixData;
          imgW = pals[m.palette].width;
          srcX = m.iconLoc[0];
          srcY = m.iconLoc[1];
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
  }

  componentWillMount() {
    this.getItemImages();
    this.initItemArr();
    this.initTempCanvas();
    this.setPaletteArrMap();
  }

  componentWillUpdate(nextProps, nextState) {
    if ((this.props.playerArr[0] !== nextProps.playerArr[0] ||
      this.props.playerArr[1] !== nextProps.playerArr[1]) &&
      nextProps.itemPalettes.potionPalette) {

      this.drawItems(nextProps);
    }
    if (nextState.lvlProcessed !== nextProps.gameLevel &&
      (this.props.floorCoords.length !== nextProps.floorCoords.length ||
      !this.props.floorCoords.every((arr, i) => arr.every((el, j) => el === nextProps.floorCoords[i][j])))) {

      this.setItemArr(nextProps, nextState)
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
