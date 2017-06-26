'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  *		@desc Stage for all game animation layers.
	*		@param {object} props - Component props.
	*		@param {number} props.boardSize - Length of square game state arrays.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {number} props.floor - First integer of floor value range in bgArr.
	*		@param {number} props.gameLevel - Current game level.
	*		@param {number} props.levels - Total game levels.
	*		@param {number} props.bgLevelProcessed - Updated as LayerBackground processes a level.
	*		@param {string} props.hero - Name of chosen hero.
	*		@param {string} props.heroFacing - Current hero direction.
	*		@param {string} props.overlayMode - Current GameStage overlay.
	*		@param {array} props.playerArr - Hero's coordinates on the game board.
	*		@param {array} props.bgArr - Square array holds level background layer state.
	*		@param {array} props.itemArr - Square array holds level item layer state.
	*		@param {array} props.enemyArr - Square array holds level enemy layer state.
	*		@param {array} props.floorcoords - Floor coords which haven't been take by hero/item/enemy.
	*		@param {object} props.inventory - Current hero item inventory.
	*		@param {object} props.interactItem - Hero/Item interaction details.
	*		@param {object} props.portalObjective - Portal location and current discovery state.
	*		@param {object} props.enemyDead - Most recent dead enemy details.
	*		@param {object} props.itemPaletteArrMap - Maps itemArr numbers to their corresponding object.
	*		@param {object} props.itemPalettes - Item sprite sheets on canvas.
	*		@param {object} props.enemyPalettes - Enemy sprite sheets on canvas.
	*		@param {object} props.playerPalettes - Hero sprite sheets on canvas.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *		@returns Game layer stage.
  */

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
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          hero: this.props.hero,
          heroFacing: this.props.heroFacing,
          playerArr: this.props.playerArr,
          bgArr: this.props.bgArr,
          floorCoords: this.props.floorCoords,
          playerPalettes: this.props.playerPalettes,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerBackground, {
          boardSize: this.props.boardSize,
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          bgLevelProcessed: this.props.bgLevelProcessed,
          playerArr: this.props.playerArr,
          bgArr: this.props.bgArr,
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
          levels: this.props.levels,
          bgLevelProcessed: this.props.bgLevelProcessed,
          playerArr: this.props.playerArr,
          bgArr: this.props.bgArr,
          itemArr: this.props.itemArr,
          floorCoords: this.props.floorCoords,
          enemyDead: this.props.enemyDead,
          itemPaletteArrMap: this.props.itemPaletteArrMap,
          itemPalettes: this.props.itemPalettes,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerEnemy, {
          boardSize: this.props.boardSize,
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize,
          playerArr: this.props.playerArr,
          enemyArr: this.props.enemyArr,
          enemyPalettes: this.props.enemyPalettes,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerDistanceFog, {
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize }),
        React.createElement(LayerExploreFog, {
          boardSize: this.props.boardSize,
          stageSize: this.state.stageSize,
          tileSize: this.props.tileSize,
          gameLevel: this.props.gameLevel,
          playerArr: this.props.playerArr,
          portalObjective: this.props.portalObjective,
          updateGameClassState: this.props.updateGameClassState }),
        React.createElement(LayerOverlays, {
          tileSize: this.props.tileSize,
          overlayMode: this.props.overlayMode,
          playerArr: this.props.playerArr,
          enemyArr: this.props.enemyArr,
          inventory: this.props.inventory,
          interactItem: this.props.interactItem,
          playerPalettes: this.props.playerPalettes,
          toggleMute: this.props.toggleMute,
          updateGameClassState: this.props.updateGameClassState })
      );
    }
  }]);

  return GameStage;
}(React.Component);