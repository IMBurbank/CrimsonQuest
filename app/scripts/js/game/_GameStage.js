'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: boardSize, tileSize, floor, gameLevel, levels, hero, playerArr, bgArr, floorCoords,
//updateFloorCoords, itemArr, itemPalettes, updateGameClassState, itemPaletteArrMap
//inventory, interactItem, heroFacing, enemyArr, enemyPalettes, enemyDead, bgLevelProcessed, playerPalettes, toggleMute
var GameStage = function (_React$Component) {
  _inherits(GameStage, _React$Component);

  function GameStage(props) {
    _classCallCheck(this, GameStage);

    var _this = _possibleConstructorReturn(this, (GameStage.__proto__ || Object.getPrototypeOf(GameStage)).call(this, props));

    _this.updateAccArr = _this.updateAccArr.bind(_this);

    _this.state = {
      stageSize: 480,
      accArr: []
    };
    return _this;
  }

  _createClass(GameStage, [{
    key: 'updateAccArr',
    value: function updateAccArr(accArr) {
      this.setState({ accArr: accArr });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'stage' },
        React.createElement(LayerPlayer, {
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize,
          hero: this.props.hero,
          heroFacing: this.props.heroFacing,
          playerPalettes: this.props.playerPalettes,
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          bgArr: this.props.bgArr,
          playerArr: this.props.playerArr,
          floorCoords: this.props.floorCoords,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerBackground, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          bgArr: this.props.bgArr,
          playerArr: this.props.playerArr,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerAccent, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          playerArr: this.props.playerArr,
          bgArr: this.props.bgArr,
          accArr: this.state.accArr,
          enemyDead: this.props.enemyDead,
          updateAccArr: this.updateAccArr }),
        React.createElement(LayerItem, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          levels: this.props.levels,
          playerArr: this.props.playerArr,
          bgArr: this.props.bgArr,
          floorCoords: this.props.floorCoords,
          itemArr: this.props.itemArr,
          itemPalettes: this.props.itemPalettes,
          itemPaletteArrMap: this.props.itemPaletteArrMap,
          enemyDead: this.props.enemyDead,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerEnemy, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.props.tileSize,
          playerArr: this.props.playerArr,
          enemyArr: this.props.enemyArr,
          enemyPalettes: this.props.enemyPalettes,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerDistanceFog, {
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize }),
        React.createElement(LayerExploreFog, {
          stageSize: this.state.stageSize,
          boardSize: this.props.boardSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          playerArr: this.props.playerArr }),
        React.createElement(LayerOverlays, {
          tileSize: this.props.tileSize,
          playerArr: this.props.playerArr,
          enemyArr: this.props.enemyArr,
          inventory: this.props.inventory,
          interactItem: this.props.interactItem,
          playerPalettes: this.props.playerPalettes,
          overlayMode: this.props.overlayMode,
          toggleMute: this.props.toggleMute,
          updateGameClassState: this.props.updateGameClassState })
      );
    }
  }]);

  return GameStage;
}(React.Component);