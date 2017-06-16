'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//stageSize, boardSize, tileSize, playerArr, enemyArr, enemyPalettes, updateGameClassState
//
var EnemyLayer = function (_React$Component) {
  _inherits(EnemyLayer, _React$Component);

  function EnemyLayer(props) {
    _classCallCheck(this, EnemyLayer);

    var _this = _possibleConstructorReturn(this, (EnemyLayer.__proto__ || Object.getPrototypeOf(EnemyLayer)).call(this, props));

    _this.initEnemyArr = _this.initEnemyArr.bind(_this);
    _this.getEnemyImages = _this.getEnemyImages.bind(_this);
    _this.initTempCanvas = _this.initTempCanvas.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.drawEnemies = _this.drawEnemies.bind(_this);

    _this.state = {
      srcTileSize: 16,
      images: {},
      tempCanv: null,
      renderPadArr: [3, 2, 1, 0, 0, 0, 1, 2, 3]
    };
    return _this;
  }

  _createClass(EnemyLayer, [{
    key: 'initEnemyArr',
    value: function initEnemyArr() {
      var len = this.props.boardSize,
          enemyArr = initZeroArray(len);

      this.props.updateGameClassState({ enemyArr: enemyArr });
    }
  }, {
    key: 'getEnemyImages',
    value: function getEnemyImages() {
      var path = 'img/characters/',
          type = '.png',
          that = this;

      var avian0Img = void 0,
          avian1Img = void 0,
          demon0Img = void 0,
          demon1Img = void 0,
          elemental0Img = void 0,
          elemental1Img = void 0,
          humanoid0Img = void 0,
          humanoid1Img = void 0,
          reptile0Img = void 0,
          reptile1Img = void 0,
          undead0Img = void 0,
          undead1Img = void 0,
          images = {
        avian0Img: avian0Img,
        avian1Img: avian1Img,
        demon0Img: demon0Img,
        demon1Img: demon1Img,
        elemental0Img: elemental0Img,
        elemental1Img: elemental1Img,
        humanoid0Img: humanoid0Img,
        humanoid1Img: humanoid1Img,
        reptile0Img: reptile0Img,
        reptile1Img: reptile1Img,
        undead0Img: undead0Img,
        undead1Img: undead1Img
      },
          el = void 0,
          eLen = 0,
          i = 0;

      var handleItemLoad = function handleEnemyImageLoad() {
        i++;
        if (i === eLen) {
          that.setState({ images: images });
          that.setPalettes(images);
        }
      };

      for (el in images) {
        images[el] = new Image();
        images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
        images[el].addEventListener('load', handleItemLoad);
        eLen++;
      }
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var size = this.props.stageSize,
          smoothRender = false,
          tempCanv = initMemCanvas(size, size, smoothRender);

      this.setState({ tempCanv: tempCanv });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(images) {
      var ts = this.props.tileSize,
          srcTs = this.state.srcTileSize,
          scale = ts / srcTs,
          renderSmoothing = false,
          imgPixDataName = 'imgPixData';

      var enemyPalettes = {},
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
        p[name][imgPixDataName] = ctx.getImageData(0, 0, p[name].width, p[name].height).data;
      }

      this.props.updateGameClassState({ enemyPalettes: enemyPalettes });
    }
  }, {
    key: 'drawEnemies',
    value: function drawEnemies(timestamp) {
      if (!timeRef) timeRef = timestamp;

      var pIndex = (timestamp - timeRef) % 1000 * .06 > 29 ? 1 : 0,
          _props = this.props,
          stageSize = _props.stageSize,
          tileSize = _props.tileSize,
          playerArr = _props.playerArr,
          enemyArr = _props.enemyArr,
          enemyPalettes = _props.enemyPalettes,
          renderPadArr = this.state.renderPadArr,
          renderInset = 3,
          renderLenBase = stageSize / tileSize - 2 * renderInset,
          enemyArrLen = enemyArr.length;


      var dCtx = getById('enemy-layer').getContext('2d'),
          tempCanv = this.state.tempCanv,
          tempCtx = tempCanv.getContext('2d'),
          tImgData = tempCtx.createImageData(stageSize, stageSize),
          tImgPixData = tImgData.data,
          canvas = null,
          renderArr = [],
          iData = 0,
          pData = 0,
          startRow = 0,
          startCol = 0,
          padRow = 0,
          padCol = 0,
          renderPadX = 0,
          renderPadY = 0,
          img = null,
          imgW = 0,
          imgH = 0,
          el = 0,
          srcX = 0,
          srcY = 0,
          dX = 0,
          dY = 0,
          pxRow = 0,
          pxCol = 0,
          i = 0,
          j = 0;

      if (playerArr[0] < ~~(renderLenBase / 2)) {
        startRow = 0;
        padRow = ~~(renderLenBase / 2) - playerArr[0];
      } else if (playerArr[0] + ~~(renderLenBase / 2) + 1 > enemyArrLen) {
        padRow = playerArr[0] + ~~(renderLenBase / 2) + 1 - enemyArrLen;
        startRow = enemyArrLen - renderLenBase + padRow;
      } else {
        startRow = playerArr[0] - ~~(renderLenBase / 2);
        padRow = 0;
      }

      if (playerArr[1] < ~~(renderLenBase / 2)) {
        startCol = 0;
        padCol = ~~(renderLenBase / 2) - playerArr[1];
      } else if (playerArr[1] + ~~(renderLenBase / 2) + 1 > enemyArrLen) {
        padCol = playerArr[1] + ~~(renderLenBase / 2) + 1 - enemyArrLen;
        startCol = enemyArrLen - renderLenBase + padCol;
      } else {
        startCol = playerArr[1] - ~~(renderLenBase / 2);
        padCol = 0;
      }

      renderArr.length = renderLenBase - padRow;

      while (i < renderLenBase - padRow) {
        renderArr[i] = [];
        renderArr[i].length = renderLenBase - padCol;

        while (j < renderLenBase - padCol) {
          if (j >= renderPadArr[startRow ? i : i + padRow] && j < renderLenBase - padRow - renderPadArr[startCol ? i : i + padCol]) {

            renderArr[i][j] = enemyArr[startRow + i][startCol + j];
          } else {
            renderArr[i][j] = 0;
          }

          j++;
        }

        j = 0, i++;
      }

      renderPadX = !startCol && padCol ? (padCol + renderInset) * tileSize : renderInset * tileSize;

      renderPadY = !startRow && padRow ? (padRow + renderInset) * tileSize : renderInset * tileSize;

      for (i = 0; i < renderArr.length; i++) {
        for (j = 0; j < renderArr[i].length; j++) {
          el = renderArr[i][j];

          if (el) {
            canvas = enemyPalettes[el.palette[pIndex]];
            imgW = canvas.width;
            imgH = canvas.height;
            img = canvas.getContext('2d').getImageData(0, 0, imgW, imgH).data;

            srcX = el.iconLoc[0];
            srcY = el.iconLoc[1];
            dX = renderPadX + j * tileSize;
            dY = renderPadY + i * tileSize;
            pxRow = 0;

            while (pxRow < tileSize) {
              pxCol = 0;

              while (pxCol < tileSize) {
                pData = (dX + pxCol + (dY + pxRow) * stageSize) * 4;
                iData = (srcX + pxCol + (srcY + pxRow) * imgW) * 4;

                tImgPixData[pData] = img[iData];
                tImgPixData[pData + 1] = img[iData + 1];
                tImgPixData[pData + 2] = img[iData + 2];
                tImgPixData[pData + 3] = img[iData + 3];
                pxCol++;
              }

              pxRow++;
            }
          }
        }
      }

      dCtx.putImageData(tImgData, 0, 0);

      window.requestAnimationFrame(this.drawEnemies);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getEnemyImages();
      this.initEnemyArr();
      this.initTempCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (Object.keys(prevProps.enemyPalettes).length !== Object.keys(this.props.enemyPalettes).length && Object.keys(this.props.enemyPalettes).length) {

        window.requestAnimationFrame(this.drawEnemies);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'enemy-layer',
        className: 'enemy-layer',
        width: size,
        height: size });
    }
  }]);

  return EnemyLayer;
}(React.Component);