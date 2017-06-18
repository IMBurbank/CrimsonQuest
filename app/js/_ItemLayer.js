'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: boardSize, stageSize, tileSize, gameLevel, levels, bgArr, itemArr, updateGameClassState
//playerArr, itemPalettes, floorCoords, itemPaletteArrMap, enemyDead, bgLevelProcessed
var ItemLayer = function (_React$Component) {
  _inherits(ItemLayer, _React$Component);

  function ItemLayer(props) {
    _classCallCheck(this, ItemLayer);

    var _this = _possibleConstructorReturn(this, (ItemLayer.__proto__ || Object.getPrototypeOf(ItemLayer)).call(this, props));

    _this.initItemArr = _this.initItemArr.bind(_this);
    _this.initTempCanvas = _this.initTempCanvas.bind(_this);
    _this.getItemImages = _this.getItemImages.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.setPaletteArrMap = _this.setPaletteArrMap.bind(_this);
    _this.setSpawnQuants = _this.setSpawnQuants.bind(_this);
    _this.setItemArr = _this.setItemArr.bind(_this);
    _this.activatePortal = _this.activatePortal.bind(_this);
    _this.drawItems = _this.drawItems.bind(_this);

    _this.enemyDeadCount = 0;
    _this.levelProcessed = 0;

    _this.state = {
      srcTileSize: 16,
      itemTypes: [],
      images: {},
      spawnQuants: [],
      tempCanv: null,
      renderArr: [],
      portalCoord: [],
      displayedItems: ['consumable', 'gold', 'openChest', 'door']
    };
    return _this;
  }

  _createClass(ItemLayer, [{
    key: 'initItemArr',
    value: function initItemArr() {
      var len = this.props.boardSize,
          itemArr = initZeroArray(len);

      this.props.updateGameClassState({ itemArr: itemArr });
    }
  }, {
    key: 'getItemImages',
    value: function getItemImages() {
      var path = 'img/items/',
          type = '.png',
          that = this;

      var amuletImg = void 0,
          armorImg = void 0,
          bookImg = void 0,
          bootImg = void 0,
          chest0Img = void 0,
          chest1Img = void 0,
          door0Img = void 0,
          door1Img = void 0,
          gloveImg = void 0,
          hatImg = void 0,
          longWepImg = void 0,
          medWepImg = void 0,
          moneyImg = void 0,
          potionImg = void 0,
          ringImg = void 0,
          shieldImg = void 0,
          shortWepImg = void 0,
          wandImg = void 0,
          images = {
        amuletImg: amuletImg,
        armorImg: armorImg,
        bookImg: bookImg,
        bootImg: bootImg,
        chest0Img: chest0Img,
        chest1Img: chest1Img,
        door0Img: door0Img,
        door1Img: door1Img,
        gloveImg: gloveImg,
        hatImg: hatImg,
        longWepImg: longWepImg,
        medWepImg: medWepImg,
        moneyImg: moneyImg,
        potionImg: potionImg,
        ringImg: ringImg,
        shieldImg: shieldImg,
        shortWepImg: shortWepImg,
        wandImg: wandImg
      },
          el = void 0,
          iLen = 0,
          i = 0;

      var handleItemLoad = function handleItemImageLoad() {
        i++;
        if (i === iLen) {
          that.setState({ images: images });
          that.setPalettes(images);
        }
      };

      for (el in images) {
        images[el] = new Image();
        images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
        images[el].addEventListener('load', handleItemLoad);
        iLen++;
      }
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var _props = this.props,
          stageSize = _props.stageSize,
          tileSize = _props.tileSize,
          rLen = stageSize / tileSize,
          smoothRender = false,
          tempCanv = initMemCanvas(stageSize, stageSize, smoothRender),
          renderArr = initZeroArray(rLen);


      this.setState({ tempCanv: tempCanv, renderArr: renderArr });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(images) {
      var ts = this.props.tileSize,
          srcTs = this.state.srcTileSize,
          scale = ts / srcTs,
          renderSmoothing = false,
          imgPixDataName = 'imgPixData';

      var itemPalettes = {},
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
        p[name][imgPixDataName] = ctx.getImageData(0, 0, p[name].width, p[name].height).data;
      }

      this.props.updateGameClassState({ itemPalettes: itemPalettes });
    }
  }, {
    key: 'setPaletteArrMap',
    value: function setPaletteArrMap() {
      var itemTypes = [itemAmulets, itemArmors, itemFeet, itemGloves, itemHelmets, itemRings, itemShields, itemWeapons, itemConsumables, chestConsumables, interactivePortals];

      var itemPaletteArrMap = {},
          i = 101,
          props = null;

      itemTypes.forEach(function (el) {
        for (props in el) {
          el[props]['itemArrVal'] = i;
          itemPaletteArrMap['' + i] = el[props];
          i++;
        }
      });

      this.setSpawnQuants(itemTypes);
      this.setState({ itemTypes: itemTypes });
      this.props.updateGameClassState({ itemPaletteArrMap: itemPaletteArrMap });
    }
  }, {
    key: 'setSpawnQuants',
    value: function setSpawnQuants(itemTypes) {
      var levels = this.props.levels,
          valKey = 'itemArrVal';

      var spawnQuants = [],
          item = [],
          spawnObj = {},
          props = null,
          lvl = 0,
          val = 0,
          i = 0;

      spawnQuants.length = levels;
      while (i < levels) {
        spawnQuants[i] = [], i++;
      }itemTypes.forEach(function (el) {
        for (props in el) {
          spawnObj = el[props];
          val = spawnObj[valKey];
          for (lvl in spawnObj.spawnQuant) {
            item = [val, spawnObj.spawnQuant[lvl]];
            spawnQuants[lvl * 1 - 1].push(item);
          }
        }
      });

      this.setState({ spawnQuants: spawnQuants });
    }
  }, {
    key: 'setItemArr',
    value: function setItemArr(nextProps, nextState) {
      var spawnQuants = nextState.spawnQuants,
          gameLevel = nextProps.gameLevel,
          bgArr = nextProps.bgArr,
          topCenterFloorVal = 42;


      var itemArr = [].concat(_toConsumableArray(nextProps.itemArr)),
          floorCoords = [].concat(_toConsumableArray(nextProps.floorCoords)),
          len = itemArr.length,
          fLen = floorCoords.length,
          coord = [],
          index = 0,
          cur = 0,
          i = 0,
          j = 0;

      while (i < len) {
        while (j < len) {
          itemArr[i][j] = 0, j++;
        }j = 0, i++;
      }

      spawnQuants[gameLevel - 1].forEach(function (el) {
        for (i = 0; i < el[1]; i++) {
          index = randInt(0, fLen);
          coord = floorCoords[index];
          itemArr[coord[0]][coord[1]] = el[0];
          floorCoords.splice(index, 1);
          fLen--;
        }
      });

      while (cur !== topCenterFloorVal) {
        index = randInt(0, fLen);
        coord = floorCoords[index];
        cur = bgArr[coord[0]][coord[1]];
      }

      coord[0]--;
      itemArr[coord[0]][coord[1]] = interactivePortals['inactivePortal'].itemArrVal;

      this.setState({ portalCoord: coord });
      this.props.updateGameClassState({ floorCoords: floorCoords, itemArr: itemArr, itemLevelProcessed: gameLevel });
    }
  }, {
    key: 'activatePortal',
    value: function activatePortal() {
      var portalCoord = this.state.portalCoord,
          activePortal = interactivePortals['activePortal'];


      var itemArr = [].concat(_toConsumableArray(this.props.itemArr));

      itemArr[portalCoord[0]][portalCoord[1]] = activePortal.itemArrVal;

      this.props.updateGameClassState({ itemArr: itemArr });

      console.log('Potal Activated');
    }
  }, {
    key: 'drawItems',
    value: function drawItems(timestamp) {
      if (!timeRef) timeRef = timestamp;

      var pIndex = (timestamp - timeRef) % 1000 * .06 > 29 ? 1 : 0,
          _props2 = this.props,
          tileSize = _props2.tileSize,
          stageSize = _props2.stageSize,
          itemArr = _props2.itemArr,
          playerArr = _props2.playerArr,
          itemPaletteArrMap = _props2.itemPaletteArrMap,
          itemPalettes = _props2.itemPalettes,
          displayedItems = this.state.displayedItems,
          iLen = itemArr.length,
          rLen = stageSize / tileSize;
      var _state = this.state,
          renderArr = _state.renderArr,
          tempCanv = _state.tempCanv,
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

      var _calcRenderPadding = calcRenderPadding(playerArr, iLen, rLen, tileSize),
          startRow = _calcRenderPadding.startRow,
          startCol = _calcRenderPadding.startCol,
          renderArrHeight = _calcRenderPadding.renderArrHeight,
          renderArrWidth = _calcRenderPadding.renderArrWidth,
          sX = _calcRenderPadding.sX,
          sY = _calcRenderPadding.sY;

      while (i < renderArrHeight) {
        while (j < renderArrWidth) {
          renderArr[i][j] = itemArr[startRow + i][startCol + j], j++;
        }
        j = 0, i++;
      }

      tempCtx.clearRect(0, 0, stageSize, stageSize);

      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          el = renderArr[i][j];
          if (el) {
            item = displayedItems.includes(itemPaletteArrMap['' + el].type) ? itemPaletteArrMap['' + el] : chestConsumables.closedChest;
            palette = item.type === 'door' ? item.palette[pIndex] : item.palette;
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
      window.requestAnimationFrame(this.drawItems);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getItemImages();
      this.initItemArr();
      this.initTempCanvas();
      this.setPaletteArrMap();
      console.log('ItemArr Mounted');
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.levelProcessed !== nextProps.bgLevelProcessed && (this.props.playerArr[0] !== nextProps.playerArr[0] || this.props.playerArr[1] !== nextProps.playerArr[1])) {
        console.log('New Item Array');

        this.levelProcessed = nextProps.bgLevelProcessed;
        this.setItemArr(nextProps, nextState);
      }

      if (nextProps.enemyDead.count !== this.enemyDeadCount) {
        this.enemyDeadCount = nextProps.enemyDead.count;
        if (nextProps.enemyDead.source.boss) this.activatePortal();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (Object.keys(prevProps.itemPalettes).length !== Object.keys(this.props.itemPalettes).length && Object.keys(this.props.itemPalettes).length) {

        window.requestAnimationFrame(this.drawItems);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'item-layer',
        className: 'item-layer',
        width: size,
        height: size });
    }
  }]);

  return ItemLayer;
}(React.Component);