'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
};

/**
  * React Components
  */

var GameLevel = function (_React$Component) {
  _inherits(GameLevel, _React$Component);

  function GameLevel() {
    _classCallCheck(this, GameLevel);

    return _possibleConstructorReturn(this, (GameLevel.__proto__ || Object.getPrototypeOf(GameLevel)).apply(this, arguments));
  }

  _createClass(GameLevel, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'level' },
        'Game Level'
      );
    }
  }]);

  return GameLevel;
}(React.Component);

var EnemiesRemaining = function (_React$Component2) {
  _inherits(EnemiesRemaining, _React$Component2);

  function EnemiesRemaining() {
    _classCallCheck(this, EnemiesRemaining);

    return _possibleConstructorReturn(this, (EnemiesRemaining.__proto__ || Object.getPrototypeOf(EnemiesRemaining)).apply(this, arguments));
  }

  _createClass(EnemiesRemaining, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'enemies-remaining' },
        'Enemies Remaining'
      );
    }
  }]);

  return EnemiesRemaining;
}(React.Component);

var ActivityLog = function (_React$Component3) {
  _inherits(ActivityLog, _React$Component3);

  function ActivityLog() {
    _classCallCheck(this, ActivityLog);

    return _possibleConstructorReturn(this, (ActivityLog.__proto__ || Object.getPrototypeOf(ActivityLog)).apply(this, arguments));
  }

  _createClass(ActivityLog, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'activity-log' },
        'Activity Log'
      );
    }
  }]);

  return ActivityLog;
}(React.Component);

var GameTips = function (_React$Component4) {
  _inherits(GameTips, _React$Component4);

  function GameTips() {
    _classCallCheck(this, GameTips);

    return _possibleConstructorReturn(this, (GameTips.__proto__ || Object.getPrototypeOf(GameTips)).apply(this, arguments));
  }

  _createClass(GameTips, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tips' },
        'Game Tips'
      );
    }
  }]);

  return GameTips;
}(React.Component);

var Game = function (_React$Component5) {
  _inherits(Game, _React$Component5);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this5 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this5.updateBgArr = _this5.updateBgArr.bind(_this5);
    _this5.handleKeyDown = _this5.handleKeyDown.bind(_this5);
    _this5.updatePlayerArr = _this5.updatePlayerArr.bind(_this5);
    _this5.updateGameClassState = _this5.updateGameClassState.bind(_this5);
    _this5.pickupItem = _this5.pickupItem.bind(_this5);
    _this5.focus = _this5.focus.bind(_this5);
    _this5.maintainFocus = _this5.maintainFocus.bind(_this5);
    _this5.endFocus = _this5.endFocus.bind(_this5);
    _this5.handleGameOver = _this5.handleGameOver.bind(_this5);

    _this5.state = {
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 1,
      levels: 10,
      hero: 'Mage',
      heroIcon: null,
      heroFacing: '',
      moveCount: 0,
      gameOver: false,
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: { count: 0, type: '', item: {} },
      //type: pickup, use, equip, unequip, buy, sell
      quickConsume: { count: 0, num: 0 },
      enemyArr: [],
      enemyPalettes: {},
      enemyAttack: { count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {} },
      exchangeAttacks: { count: 0, spawnIndex: 0, attacks: [] },
      enemyDead: { count: 0, spawnIndex: 0, coord: [], source: {}, level: 0 },
      overlayMode: 'off'
      //inv-overlay, inGameOptions, startOptions
    };
    return _this5;
  }

  _createClass(Game, [{
    key: 'updateBgArr',
    value: function updateBgArr(bgArr, floorCoords) {
      this.setState({ bgArr: bgArr, floorCoords: floorCoords });
    }
  }, {
    key: 'updatePlayerArr',
    value: function updatePlayerArr(playerArr) {
      this.setState({ playerArr: [].concat(_toConsumableArray(playerArr)) });
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

        console.log('Picked up', item.name);
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
            playerArr = _state.playerArr,
            bgArr = _state.bgArr,
            itemArr = _state.itemArr,
            enemyArr = _state.enemyArr,
            heroFacing = _state.heroFacing,
            directionKeys = {
          ArrowUp: 'up',
          KeyW: 'up',
          ArrowRight: 'right',
          KeyD: 'right',
          ArrowDown: 'down',
          KeyS: 'down',
          ArrowLeft: 'left',
          KeyA: 'left'
        },
            consumeDigits = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8'];
        var moveCount = this.state.moveCount,
            nState = {},
            direction = '',
            row = 0,
            col = 0;


        if (directionKeys[el]) {
          moveCount++;
          direction = directionKeys[el];

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
          } else {
            nState.moveCount = moveCount;
            if (heroFacing !== direction) nState.heroFacing = direction;
            this.setState(nState);
          }
        } else if (el === 'KeyI' || el === 'KeyE') {
          this.setState({ overlayMode: 'inv-overlay' });
        } else if (consumeDigits.includes(el)) {
          this.setState({ quickConsume: { count: this.state.quickConsume.count + 1, num: el.slice(-1) } });
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
      var _this6 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this6.focus();
      }, 250);
    }
  }, {
    key: 'endFocus',
    value: function endFocus() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'handleGameOver',
    value: function handleGameOver() {
      console.log('GAME OVER');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.maintainFocus();
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
      if (this.state.gameOver) this.handleGameOver();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'game', tabIndex: '0', onKeyDown: this.handleKeyDown },
        React.createElement(
          'div',
          { className: 'col-lft' },
          React.createElement(GameLevel, null),
          React.createElement(Hero, {
            tileSize: this.state.tileSize,
            hero: this.state.hero,
            heroIcon: this.state.heroIcon,
            inventory: this.state.inventory,
            itemPalettes: this.state.itemPalettes,
            interactItem: this.state.interactItem,
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
            'CrimsonQuest'
          ),
          React.createElement(GameStage, {
            boardSize: this.state.boardSize,
            tileSize: this.state.tileSize,
            floor: this.state.floor,
            gameLevel: this.state.gameLevel,
            levels: this.state.levels,
            hero: this.state.hero,
            playerArr: this.state.playerArr,
            heroFacing: this.state.heroFacing,
            updatePlayerArr: this.updatePlayerArr,
            bgArr: this.state.bgArr,
            updateBgArr: this.updateBgArr,
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
            updateGameClassState: this.updateGameClassState }),
          React.createElement(ConsumableItems, {
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
          React.createElement(EnemiesRemaining, null),
          React.createElement(EnemyManager, {
            tileSize: this.state.tileSize,
            floor: this.state.floor,
            gameLevel: this.state.gameLevel,
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
          React.createElement(ActivityLog, null),
          React.createElement(GameTips, null)
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


var PageHeader = function (_React$Component6) {
  _inherits(PageHeader, _React$Component6);

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


var PageFooter = function (_React$Component7) {
  _inherits(PageFooter, _React$Component7);

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


var App = function (_React$Component8) {
  _inherits(App, _React$Component8);

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
        React.createElement(PageHeader, null),
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