'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, boardSize, tileSize, gameLevel, bgArr, updateBgArr, playerArr, bgLevelProcessed
var BackgroundLayer = function (_React$Component) {
  _inherits(BackgroundLayer, _React$Component);

  function BackgroundLayer(props) {
    _classCallCheck(this, BackgroundLayer);

    var _this = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, props));

    _this.initTempCanvas = _this.initTempCanvas.bind(_this);
    _this.getBgImages = _this.getBgImages.bind(_this);
    _this.initPaletteMaps = _this.initPaletteMaps.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.drawBackground = _this.drawBackground.bind(_this);

    _this.lastPlayerArr = [];

    _this.state = {
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
    };
    return _this;
  }

  _createClass(BackgroundLayer, [{
    key: 'getBgImages',
    value: function getBgImages() {
      var floorImg = new Image(),
          wallImg = new Image(),
          that = this;

      var i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 2) {
          that.setState({ floorImg: floorImg, wallImg: wallImg });

          //Delete after start screen created
          that.setPalettes(floorImg, wallImg, that.props.gameLevel);
        }
      };

      floorImg.src = 'img/terrain/Floor.png';
      wallImg.src = 'img/terrain/Wall.png';
      floorImg.addEventListener('load', handleLoad);
      wallImg.addEventListener('load', handleLoad);
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var _props = this.props,
          stageSize = _props.stageSize,
          tileSize = _props.tileSize,
          rLen = stageSize / tileSize,
          smoothRender = false,
          tempCanv = initMemCanvas(stageSize, stageSize, smoothRender);


      var renderArr = [],
          i = 0;

      renderArr.length = rLen;

      while (i < rLen) {
        renderArr[i] = initZeroArray(rLen), i++;
      }this.setState({ tempCanv: tempCanv, renderArr: renderArr });
    }
  }, {
    key: 'initPaletteMaps',
    value: function initPaletteMaps() {
      var ts = this.props.tileSize;

      var floorPaletteMap = {
        '41': [0, 0],
        '42': [ts, 0],
        '43': [2 * ts, 0],
        '44': [0, ts],
        '45': [ts, ts],
        '46': [2 * ts, ts],
        '47': [0, 2 * ts],
        '48': [ts, 2 * ts],
        '49': [2 * ts, 2 * ts],
        '51': [3 * ts, 0],
        '52': [3 * ts, ts],
        '53': [3 * ts, 2 * ts],
        '54': [4 * ts, ts],
        '55': [5 * ts, ts],
        '56': [6 * ts, ts],
        '57': [5 * ts, 0]
      };

      var wallPaletteMap = {
        '21': [0, 0],
        '22': [ts, 0],
        '23': [2 * ts, 0],
        '24': [0, ts],
        '25': [0, 2 * ts],
        '26': [ts, ts],
        '27': [2 * ts, 2 * ts],
        '31': [4 * ts, 0],
        '32': [3 * ts, ts],
        '33': [4 * ts, ts],
        '34': [5 * ts, ts],
        '35': [4 * ts, 2 * ts],
        '36': [3 * ts, 0]
      };

      this.setState({ floorPaletteMap: floorPaletteMap, wallPaletteMap: wallPaletteMap });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(floorImg, wallImg, gameLevel) {
      var lvl = gameLevel,
          gmTileSize = this.props.tileSize,
          srcTileSize = this.state.srcTileSize,
          scale = gmTileSize / srcTileSize,
          h = 3 * gmTileSize,
          fw = 7 * gmTileSize,
          ww = 6 * gmTileSize;

      var fCanvas = document.createElement('canvas'),
          fCtx = fCanvas.getContext('2d'),
          wCanvas = document.createElement('canvas'),
          wCtx = wCanvas.getContext('2d'),
          srcY = 3 * srcTileSize;

      srcY *= lvl === 1 ? 5 : lvl === 2 ? 6 : lvl === 3 ? 7 : lvl === 4 ? 8 : lvl === 5 ? 1 : lvl < 8 ? 2 : lvl < 10 ? 3 : lvl === 10 ? 4 : 1;

      fCanvas.width = fw;
      fCanvas.height = h;
      fCtx.imageSmoothingEnabled = false;
      fCtx.drawImage(floorImg, 0, srcY, fw / scale, h / scale, 0, 0, fw, h);

      wCanvas.width = ww;
      wCanvas.height = h;
      wCtx.imageSmoothingEnabled = false;
      wCtx.drawImage(wallImg, 0, srcY, ww / scale, h / scale, 0, 0, ww, h);

      this.setState({
        floorPalette: { canvas: fCanvas, ctx: fCtx },
        wallPalette: { canvas: wCanvas, ctx: wCtx }
      });

      //Delete after start screen created
      //(this.props.playerArr !== [0,0] && this.drawBackground(this.props, this.state));
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(timestamp) {
      var playerArr = this.props.playerArr;

      var lastArr = this.lastPlayerArr;

      if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1]) {
        this.lastPlayerArr = playerArr.slice(0);

        var bgArr = this.props.bgArr,
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
        var _state = this.state,
            renderArr = _state.renderArr,
            tempCanv = _state.tempCanv,
            dCtx = document.getElementById('bg-layer').getContext('2d'),
            tempCtx = tempCanv.getContext('2d'),
            img = null,
            map = null,
            el = 0,
            srcX = 0,
            srcY = 0,
            i = 0,
            j = 0;

        var _calcRenderPadding = calcRenderPadding(playerArr, bgLen, rLen, ts),
            startRow = _calcRenderPadding.startRow,
            startCol = _calcRenderPadding.startCol,
            renderArrHeight = _calcRenderPadding.renderArrHeight,
            renderArrWidth = _calcRenderPadding.renderArrWidth,
            sX = _calcRenderPadding.sX,
            sY = _calcRenderPadding.sY;

        while (i < renderArrHeight) {
          while (j < renderArrWidth) {
            renderArr[i][j] = bgArr[startRow + i][startCol + j], j++;
          }j = 0, i++;
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
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getBgImages();
      this.initTempCanvas();
      this.initPaletteMaps();

      var _backgroundArray = backgroundArray(this.props.boardSize),
          bgArr = _backgroundArray.bgArr,
          floorCoords = _backgroundArray.floorCoords,
          hWallCoords = _backgroundArray.hWallCoords,
          vWallCoords = _backgroundArray.vWallCoords;

      var bgLevelProcessed = this.props.gameLevel;

      this.props.updateBgArr(bgArr, bgLevelProcessed, floorCoords);
      console.log('BG Mounted');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.gameLevel !== nextProps.gameLevel && nextProps.gameLevel || nextProps.bgLevelProcessed === 0) {
        var _backgroundArray2 = backgroundArray(this.props.boardSize),
            bgArr = _backgroundArray2.bgArr,
            floorCoords = _backgroundArray2.floorCoords;

        var bgLevelProcessed = nextProps.gameLevel;

        this.props.updateBgArr(bgArr, bgLevelProcessed, floorCoords);

        console.log('New Background Array');

        if (this.state.floorImg) {
          this.setPalettes(this.state.floorImg, this.state.wallImg, nextProps.gameLevel);
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.floorImg && nextState.floorImg) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      window.requestAnimationFrame(this.drawBackground);
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'bg-layer',
        className: 'bg-layer',
        width: size,
        height: size });
    }
  }]);

  return BackgroundLayer;
}(React.Component);