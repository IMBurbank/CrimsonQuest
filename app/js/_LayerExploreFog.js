'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, tileSize, boardSize, playerArr, gameLevel

var LayerExploreFog = function (_React$Component) {
  _inherits(LayerExploreFog, _React$Component);

  function LayerExploreFog(props) {
    _classCallCheck(this, LayerExploreFog);

    var _this = _possibleConstructorReturn(this, (LayerExploreFog.__proto__ || Object.getPrototypeOf(LayerExploreFog)).call(this, props));

    _this.initfogState = _this.initFogState.bind(_this);
    _this.resetFogArr = _this.resetFogArr.bind(_this);
    _this.clearExploreFog = _this.clearExploreFog.bind(_this);
    _this.drawExploreFog = _this.drawExploreFog.bind(_this);

    _this.lastPlayerArr = [];
    _this.smoothingEnabled = false;
    _this.fogVal = 1;
    _this.sightRadius = 4;
    _this.sightDecrement = 1;

    _this.state = {
      fogArr: [],
      renderArr: [],
      fogSquareCanvas: null,
      tempCanvas: null
    };
    return _this;
  }

  _createClass(LayerExploreFog, [{
    key: 'initFogState',
    value: function initFogState() {
      var _state = this.state,
          fogArr = _state.fogArr,
          renderArr = _state.renderArr,
          _props = this.props,
          stageSize = _props.stageSize,
          boardSize = _props.boardSize,
          tileSize = _props.tileSize,
          fogVal = this.fogVal,
          fogSquareCanvas = initMemCanvas(tileSize, tileSize, this.smoothingEnabled),
          tempCanvas = initMemCanvas(stageSize, stageSize, this.smoothingEnabled),
          fogCtx = fogSquareCanvas.getContext('2d'),
          rLen = stageSize / tileSize,
          i = 0,
          j = 0;


      fogCtx.fillRect(0, 0, tileSize, tileSize);
      renderArr = initZeroArray(rLen);
      fogArr.length = boardSize;

      while (i < boardSize) {
        fogArr[i] = [];
        fogArr[i].length = boardSize;

        while (j < boardSize) {
          fogArr[i][j] = fogVal, j++;
        }j = 0, i++;
      }

      this.setState({ fogArr: fogArr, renderArr: renderArr, fogSquareCanvas: fogSquareCanvas, tempCanvas: tempCanvas });
    }
  }, {
    key: 'clearExploreFog',
    value: function clearExploreFog(fogArr, playerArr) {
      var sightRadius = this.sightRadius,
          sightDecrement = this.sightDecrement,
          _playerArr = _slicedToArray(playerArr, 2),
          row = _playerArr[0],
          col = _playerArr[1];


      var rowRadius = 0,
          i = 0,
          j = 0;

      for (i = 0; i <= sightRadius; i++) {
        rowRadius = i < 2 ? sightRadius : sightRadius - sightDecrement * i + 1;

        for (j = 0; j <= rowRadius; j++) {
          fogArr[row + i][col + j] = 0;
          if (i) fogArr[row - i][col + j] = 0;
          if (j) fogArr[row + i][col - j] = 0;
          if (i && j) fogArr[row - i][col - j] = 0;
        }
      }
      return fogArr;
    }
  }, {
    key: 'resetFogArr',
    value: function resetFogArr() {
      var fogArr = this.state.fogArr,
          boardSize = this.props.boardSize,
          fogVal = this.fogVal,
          i = 0,
          j = 0;


      fogArr.length = boardSize;

      while (i < boardSize) {
        fogArr[i] = [];
        fogArr[i].length = boardSize;

        while (j < boardSize) {
          fogArr[i][j] = fogVal, j++;
        }j = 0, i++;
      }
      this.setState({ fogArr: fogArr });
    }
  }, {
    key: 'drawExploreFog',
    value: function drawExploreFog(timestamp) {
      var playerArr = this.props.playerArr;

      var lastArr = this.lastPlayerArr;

      if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1]) {
        this.lastPlayerArr = playerArr.slice(0);

        var fogSquareCanvas = this.state.fogSquareCanvas,
            _props2 = this.props,
            stageSize = _props2.stageSize,
            boardSize = _props2.boardSize,
            tileSize = _props2.tileSize,
            rLen = stageSize / tileSize;
        var _state2 = this.state,
            fogArr = _state2.fogArr,
            renderArr = _state2.renderArr,
            tempCanvas = _state2.tempCanvas,
            dCtx = document.getElementById('layer-explore-fog').getContext('2d'),
            tempCtx = tempCanvas.getContext('2d'),
            dX = 0,
            dY = 0,
            i = 0,
            j = 0;

        var _calcRenderPadding = calcRenderPadding(playerArr, boardSize, rLen, tileSize),
            startRow = _calcRenderPadding.startRow,
            startCol = _calcRenderPadding.startCol,
            renderArrHeight = _calcRenderPadding.renderArrHeight,
            renderArrWidth = _calcRenderPadding.renderArrWidth,
            sX = _calcRenderPadding.sX,
            sY = _calcRenderPadding.sY;

        fogArr = this.clearExploreFog(fogArr, playerArr);

        //set renderArr
        for (i = 0; i < renderArrHeight; i++) {
          for (j = 0; j < renderArrWidth; j++) {
            renderArr[i][j] = fogArr[startRow + i][startCol + j];
          }
        }

        tempCtx.clearRect(0, 0, stageSize, stageSize);

        for (i = 0; i < renderArrHeight; i++) {
          for (j = 0; j < renderArrWidth; j++) {
            if (renderArr[i][j]) {
              dX = sX + j * tileSize;
              dY = sY + i * tileSize;

              tempCtx.drawImage(fogSquareCanvas, dX, dY, tileSize, tileSize);
            }
          }
        }

        dCtx.clearRect(0, 0, stageSize, stageSize);
        dCtx.drawImage(tempCanvas, 0, 0, stageSize, stageSize);

        this.setState({ fogArr: fogArr });
      }

      window.requestAnimationFrame(this.drawExploreFog);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initFogState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.gameLevel !== nextProps.gameLevel) {
        this.resetFogArr();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.tempCanvas && nextState.tempCanvas) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      console.log('Layer Explore Fog UPDATE... Animating Frame');
      window.requestAnimationFrame(this.drawExploreFog);
    }
  }, {
    key: 'render',
    value: function render() {
      var stageSize = this.props.stageSize;

      return React.createElement('canvas', {
        id: 'layer-explore-fog',
        className: 'layer-explore-fog',
        width: stageSize,
        height: stageSize });
    }
  }]);

  return LayerExploreFog;
}(React.Component);