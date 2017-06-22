'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  * React Components
  */

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.resetGame = _this.resetGame.bind(_this);
    _this.toggleMute = _this.toggleMute.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.updateGameClassState = _this.updateGameClassState.bind(_this);
    _this.pickupItem = _this.pickupItem.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.maintainFocus = _this.maintainFocus.bind(_this);
    _this.endFocus = _this.endFocus.bind(_this);

    _this.directionKeys = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowRight: 'right',
      KeyD: 'right',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left'
    };
    _this.statIncreaseKeys = {
      KeyV: 'bVitality',
      KeyB: 'bDurability',
      KeyN: 'bStrength',
      KeyM: 'bAgility'
    };
    _this.consumeDigits = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8'];

    _this.state = {
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 1,
      bgLevelProcessed: 0,
      itemLevelProcessed: 0,
      levels: 10,
      hero: '',
      heroIcon: null,
      heroFacing: '',
      playerPalettes: {},
      moveCount: 0,
      levelUpCount: 1,
      gameOver: false,
      gameMuted: false,
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: { count: 0, type: '', item: {}, source: {} },
      //type: pickup, use, equip, unequip, buy, buySuccess, buyFail, sell
      useStatPoint: { count: 0, type: '', item: {}, source: {} },
      increasedStat: { count: 0, type: '', stat: '', quant: 0 },
      quickConsume: { count: 0, num: 0 },
      enemyArr: [],
      enemyPalettes: {},
      enemyAttack: { count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {} },
      exchangeAttacks: { count: 0, spawnIndex: 0, attacks: [] },
      enemyDead: {
        count: 0,
        spawnIndex: 0,
        coord: [],
        source: {},
        level: 0,
        experience: 0,
        gold: 0
      },
      overlayMode: 'hero-selection-overlay'
      //off, inv-overlay, help-overlay, merchant-overlay, game-over-overlay, game-win-overlay, hero-selection-overlay
    };
    return _this;
  }

  _createClass(Game, [{
    key: 'resetGame',
    value: function resetGame() {
      this.setState({
        gameLevel: 1,
        bgLevelProcessed: 0,
        hero: '',
        heroIcon: null,
        heroFacing: '',
        playerPalettes: {},
        moveCount: 0,
        levelUpCount: 1,
        gameOver: false,
        inventory: {},
        playerArr: [],
        bgArr: [],
        itemArr: [],
        floorCoords: [],
        itemPalettes: {},
        itemPaletteArrMap: {},
        interactItem: { count: 0, type: '', item: {}, source: {} },
        useStatPoint: { count: 0, type: '', item: {}, source: {} },
        increasedStat: { count: 0, type: '', stat: '', quant: 0 },
        quickConsume: { count: 0, num: 0 },
        enemyArr: [],
        enemyPalettes: {},
        enemyAttack: { count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {} },
        exchangeAttacks: { count: 0, spawnIndex: 0, attacks: [] },
        enemyDead: {
          count: 0,
          spawnIndex: 0,
          coord: [],
          source: {},
          level: 0,
          experience: 0,
          gold: 0
        }
      });
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute() {
      this.setState({ gameMuted: !this.state.gameMuted });
    }
  }, {
    key: 'updateGameClassState',
    value: function updateGameClassState() {
      var updatedEls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState(updatedEls);
    }
  }, {
    key: 'pickupItem',
    value: function pickupItem(coord, val, moveCount) {
      var item = Object.assign({}, this.state.itemPaletteArrMap['' + val]),
          inventory = Object.assign({}, this.state.inventory),
          itemArr = [].concat(_toConsumableArray(this.state.itemArr)),
          pArr = this.state.playerArr;

      var nState = {},
          interactItem = Object.assign({}, this.state.interactItem),
          dir = '';

      if (item.type !== 'openChest') {
        if (inventory[item.name]) inventory[item.name].count += 1;else item.count = 1, item.equipped = false, inventory[item.name] = item;

        if (['consumable', 'gold'].includes(item.type)) itemArr[coord[0]][coord[1]] = 0;else itemArr[coord[0]][coord[1]] = chestConsumables.openChest.itemArrVal;

        interactItem.count += 1;
        interactItem.type = 'pickup';
        interactItem.item = item;
        nState = { itemArr: itemArr, inventory: inventory, interactItem: interactItem, moveCount: moveCount };
      }

      dir = coord[0] < pArr[0] ? 'up' : coord[0] > pArr[0] ? 'down' : coord[1] < pArr[1] ? 'left' : 'right';

      if (this.state.heroFacing !== dir) nState.heroFacing = dir;

      nState.playerArr = coord;
      this.setState(nState);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if (this.state.overlayMode === 'off') {
        var el = e.nativeEvent.code,
            _state = this.state,
            boardSize = _state.boardSize,
            floor = _state.floor,
            levels = _state.levels,
            playerArr = _state.playerArr,
            bgArr = _state.bgArr,
            itemArr = _state.itemArr,
            itemPaletteArrMap = _state.itemPaletteArrMap,
            enemyArr = _state.enemyArr,
            heroFacing = _state.heroFacing;
        var _state2 = this.state,
            gameLevel = _state2.gameLevel,
            moveCount = _state2.moveCount,
            nState = {},
            direction = '',
            row = 0,
            col = 0;


        if (this.directionKeys[el]) {
          moveCount++;
          direction = this.directionKeys[el];

          row = direction === 'up' ? playerArr[0] - 1 : direction === 'down' ? playerArr[0] + 1 : playerArr[0];

          col = direction === 'right' ? playerArr[1] + 1 : direction === 'left' ? playerArr[1] - 1 : playerArr[1];

          if (row >= 0 && row < boardSize && col >= 0 && col < boardSize && bgArr[row][col] > floor && !enemyArr[row][col]) {

            if (itemArr[row][col]) {
              this.pickupItem([row, col], itemArr[row][col], moveCount);
            } else {
              nState.playerArr = [row, col];
              nState.moveCount = moveCount;
              if (heroFacing !== direction) nState.heroFacing = direction;
              this.setState(nState);
            }
          } else if (itemArr[row][col] && itemPaletteArrMap['' + itemArr[row][col]].name === 'Active Portal') {

            if (gameLevel < levels) {
              this.setState({ gameLevel: gameLevel + 1 });
            } else {
              console.log('VICTORY!!!');
              this.setState({ gameOver: true, overlayMode: 'game-win-overlay' });
            }
          } else if (enemyArr[row][col] && enemyArr[row][col].type === 'merchant') {

            this.setState({ overlayMode: 'merchant-overlay' });
          } else {
            nState.moveCount = moveCount;
            if (heroFacing !== direction) nState.heroFacing = direction;
            this.setState(nState);
          }
        } else if (el === 'KeyI' || el === 'KeyE') {
          this.setState({ overlayMode: 'inv-overlay' });
        } else if (el === 'KeyH') {
          this.setState({ overlayMode: 'help-overlay' });
        } else if (this.consumeDigits.includes(el)) {
          this.setState({ quickConsume: { count: this.state.quickConsume.count + 1, num: el.slice(-1) } });
        } else if (this.statIncreaseKeys[el]) {
          this.setState({ useStatPoint: { count: this.state.useStatPoint.count + 1, stat: this.statIncreaseKeys[el] } });
        } else if (el === 'KeyQ' || el === 'KeyP') {
          this.toggleMute();
        }
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      ReactDOM.findDOMNode(this).focus();
    }
  }, {
    key: 'maintainFocus',
    value: function maintainFocus() {
      var _this2 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this2.focus();
      }, 250);
    }
  }, {
    key: 'endFocus',
    value: function endFocus() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.overlayMode === 'off') this.maintainFocus();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.overlayMode !== nextState.overlayMode) {
        if (nextState.overlayMode === 'off') this.maintainFocus();else this.endFocus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (this.state.gameOver) {
        this.resetGame();
      }
      if (this.state.hero && this.state.heroIcon && this.state.overlayMode === 'hero-selection-overlay') {

        setTimeout(function () {
          _this3.setState({ overlayMode: 'off' });
        }, 1000);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var gameOver = this.state.gameOver;


      return React.createElement(
        'div',
        { className: 'game', tabIndex: '0', onKeyDown: this.handleKeyDown },
        gameOver ? null : React.createElement(GameSounds, {
          gameOver: this.state.gameOver,
          gameLevel: this.state.gameLevel,
          gameMuted: this.state.gameMuted,
          levels: this.state.levels,
          levelUpCount: this.state.levelUpCount,
          interactItem: this.state.interactItem,
          useStatPoint: this.state.useStatPoint,
          exchangeAttacks: this.state.exchangeAttacks,
          enemyDead: this.state.enemyDead,
          overlayMode: this.state.overlayMode }),
        React.createElement(
          'div',
          { className: 'game-display' },
          React.createElement(
            'div',
            { className: 'col-lft' },
            gameOver ? null : React.createElement(GameLevel, {
              gameLevel: this.state.gameLevel }),
            gameOver ? null : React.createElement(Hero, {
              tileSize: this.state.tileSize,
              hero: this.state.hero,
              heroIcon: this.state.heroIcon,
              inventory: this.state.inventory,
              itemPalettes: this.state.itemPalettes,
              interactItem: this.state.interactItem,
              useStatPoint: this.state.useStatPoint,
              increasedStat: this.state.increasedStat,
              enemyAttack: this.state.enemyAttack,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead,
              gameOver: this.state.gameOver,
              updateGameClassState: this.updateGameClassState })
          ),
          React.createElement(
            'div',
            { className: 'col-mid' },
            React.createElement(
              'div',
              { className: 'title' },
              React.createElement('img', { src: 'img/CrimsonQuestTitle.png' })
            ),
            gameOver ? null : React.createElement(GameStage, {
              boardSize: this.state.boardSize,
              tileSize: this.state.tileSize,
              floor: this.state.floor,
              gameLevel: this.state.gameLevel,
              bgLevelProcessed: this.state.bgLevelProcessed,
              levels: this.state.levels,
              hero: this.state.hero,
              playerPalettes: this.state.playerPalettes,
              playerArr: this.state.playerArr,
              heroFacing: this.state.heroFacing,
              bgArr: this.state.bgArr,
              floorCoords: this.state.floorCoords,
              itemArr: this.state.itemArr,
              itemPalettes: this.state.itemPalettes,
              itemPaletteArrMap: this.state.itemPaletteArrMap,
              inventory: this.state.inventory,
              interactItem: this.state.interactItem,
              overlayMode: this.state.overlayMode,
              enemyArr: this.state.enemyArr,
              enemyPalettes: this.state.enemyPalettes,
              enemyDead: this.state.enemyDead,
              toggleMute: this.toggleMute,
              updateGameClassState: this.updateGameClassState }),
            gameOver ? null : React.createElement(ConsumableItems, {
              tileSize: this.state.tileSize,
              inventory: this.state.inventory,
              itemPalettes: this.state.itemPalettes,
              interactItem: this.state.interactItem,
              quickConsume: this.state.quickConsume,
              updateGameClassState: this.updateGameClassState })
          ),
          React.createElement(
            'div',
            { className: 'col-rgt' },
            gameOver ? null : React.createElement(CurrentObjective, {
              gameLevel: this.state.gameLevel,
              enemyDead: this.state.enemyDead }),
            gameOver ? null : React.createElement(EnemyManager, {
              tileSize: this.state.tileSize,
              floor: this.state.floor,
              gameLevel: this.state.gameLevel,
              itemLevelProcessed: this.state.itemLevelProcessed,
              playerArr: this.state.playerArr,
              moveCount: this.state.moveCount,
              bgArr: this.state.bgArr,
              floorCoords: this.state.floorCoords,
              enemyArr: this.state.enemyArr,
              enemyPalettes: this.state.enemyPalettes,
              enemyAttack: this.state.enemyAttack,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead,
              updateGameClassState: this.updateGameClassState }),
            gameOver ? null : React.createElement(ActivityLog, {
              gameLevel: this.state.gameLevel,
              levelUpCount: this.state.levelUpCount,
              interactItem: this.state.interactItem,
              useStatPoint: this.state.useStatPoint,
              increasedStat: this.state.increasedStat,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead }),
            gameOver ? null : React.createElement(GameTips, null)
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/


var PageHeader = function (_React$Component2) {
  _inherits(PageHeader, _React$Component2);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg-header' },
        React.createElement(
          'h1',
          null,
          'CrimsonQuest'
        )
      );
    }
  }]);

  return PageHeader;
}(React.Component);

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/


var PageFooter = function (_React$Component3) {
  _inherits(PageFooter, _React$Component3);

  function PageFooter() {
    _classCallCheck(this, PageFooter);

    return _possibleConstructorReturn(this, (PageFooter.__proto__ || Object.getPrototypeOf(PageFooter)).apply(this, arguments));
  }

  _createClass(PageFooter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg-footer' },
        React.createElement(
          'span',
          null,
          '\xA9 2017 Isaac Burbank.'
        ),
        React.createElement(
          'span',
          null,
          'Tiles By\xA0',
          React.createElement(
            'a',
            { href: 'http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181', target: '_blank' },
            'DragonDePlatino'
          )
        )
      );
    }
  }]);

  return PageFooter;
}(React.Component);

/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/


var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg' },
        React.createElement(
          'div',
          { className: 'pg-content' },
          React.createElement(Game, null)
        ),
        React.createElement(PageFooter, null)
      );
    }
  }]);

  return App;
}(React.Component);

/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));