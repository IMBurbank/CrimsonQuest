'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: boardSize, gameLevel, hero, playerArr, updatePlayerArr
var GameStage = function (_React$Component) {
  _inherits(GameStage, _React$Component);

  function GameStage(props) {
    _classCallCheck(this, GameStage);

    var _this = _possibleConstructorReturn(this, (GameStage.__proto__ || Object.getPrototypeOf(GameStage)).call(this, props));

    _this.updateBgArr = _this.updateBgArr.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.updateAccArr = _this.updateAccArr.bind(_this);

    _this.state = {
      stageSize: 480,
      tileSize: 32,
      floor: 40,
      bgArr: [],
      accArr: [],
      floorCoords: [],
      hWallCoords: [],
      vWallCoords: []
    };
    return _this;
  }

  _createClass(GameStage, [{
    key: 'updateBgArr',
    value: function updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords) {
      this.setState({ bgArr: bgArr, floorCoords: floorCoords, hWallCoords: hWallCoords, vWallCoords: vWallCoords });
    }
  }, {
    key: 'updateAccArr',
    value: function updateAccArr(accArr) {
      this.setState({ accArr: accArr });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var el = e.nativeEvent.code,
          arr = this.props.playerArr,
          bg = this.state.bgArr,
          flr = this.state.floor,
          func = this.props.updatePlayerArr,
          len = this.props.boardSize - 1;

      var r = arr[0],
          c = arr[1];

      if ((el === 'ArrowUp' || el === 'KeyW') && r > 0 && bg[r - 1][c] > flr) r--, func([r, c]);else if ((el === 'ArrowRight' || el === 'KeyD') && c < len && bg[r][c + 1] > flr) c++, func([r, c]);else if ((el === 'ArrowDown' || el === 'KeyS') && r < len && bg[r + 1][c] > flr) r++, func([r, c]);else if ((el === 'ArrowLeft' || el === 'KeyA') && c > 0 && bg[r][c - 1] > flr) c--, func([r, c]);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'stage', tabIndex: '0', onKeyDown: this.handleKeyDown },
        React.createElement(BackgroundLayer, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.state.tileSize,
          gameLevel: this.props.gameLevel,
          bgArr: this.state.bgArr,
          updateBgArr: this.updateBgArr,
          playerArr: this.props.playerArr }),
        React.createElement(AccentLayer, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.state.tileSize,
          gameLevel: this.props.gameLevel,
          playerArr: this.props.playerArr,
          bgArr: this.state.bgArr,
          accArr: this.state.accArr,
          updateAccArr: this.updateAccArr }),
        React.createElement(PlayerLayer, {
          stageSize: this.state.stageSize,
          tileSize: this.state.tileSize,
          hero: this.props.hero,
          gameLevel: this.props.gameLevel,
          bgArr: this.state.bgArr,
          playerArr: this.props.playerArr,
          updatePlayerArr: this.props.updatePlayerArr,
          floorCoords: this.state.floorCoords })
      );
    }
  }]);

  return GameStage;
}(React.Component);