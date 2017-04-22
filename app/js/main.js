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

var EnemyStats = function (_React$Component3) {
  _inherits(EnemyStats, _React$Component3);

  function EnemyStats() {
    _classCallCheck(this, EnemyStats);

    return _possibleConstructorReturn(this, (EnemyStats.__proto__ || Object.getPrototypeOf(EnemyStats)).apply(this, arguments));
  }

  _createClass(EnemyStats, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'enemy-stats' },
        'Enemy Stats'
      );
    }
  }]);

  return EnemyStats;
}(React.Component);

var ActivityLog = function (_React$Component4) {
  _inherits(ActivityLog, _React$Component4);

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

var GameTips = function (_React$Component5) {
  _inherits(GameTips, _React$Component5);

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

var Game = function (_React$Component6) {
  _inherits(Game, _React$Component6);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this6 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this6.updateBgArr = _this6.updateBgArr.bind(_this6);
    _this6.handleKeyDown = _this6.handleKeyDown.bind(_this6);
    _this6.updatePlayerArr = _this6.updatePlayerArr.bind(_this6);
    _this6.updateGameClassState = _this6.updateGameClassState.bind(_this6);
    _this6.pickupItem = _this6.pickupItem.bind(_this6);
    _this6.focus = _this6.focus.bind(_this6);
    _this6.maintainFocus = _this6.maintainFocus.bind(_this6);
    _this6.endFocus = _this6.endFocus.bind(_this6);

    _this6.state = {
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 8,
      levels: 10,
      hero: 'Mage',
      heroIcon: null,
      heroFacing: '',
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: { count: 0, type: '', item: {} },
      quickConsume: { count: 0, num: 0 },
      //type: pickup, use, equip, unequip, buy, sell
      enemyArr: [],
      enemyPalegges: {},
      enemyPaletteArrMap: {},
      initAttack: { count: 0, stats: {}, coords: {} },
      attackRound: { count: 0, attacks: [] },
      enemyDead: { count: 0, enemy: {} },
      playerDead: false,
      overlayMode: 'off'
      //inv-overlay, inGameOptions, startOptions
    };
    return _this6;
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
    value: function pickupItem(coord, val) {
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
        nState = { itemArr: itemArr, inventory: inventory, interactItem: interactItem };

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
            arr = [].concat(_toConsumableArray(this.state.playerArr)),
            bg = this.state.bgArr,
            itm = this.state.itemArr,
            flr = this.state.floor,
            dir = this.state.heroFacing,
            len = this.state.boardSize - 1,
            consumeDigits = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8'];

        var r = arr[0],
            c = arr[1],
            nState = {};

        if (el === 'ArrowUp' || el === 'KeyW') {
          if (r > 0 && bg[r - 1][c] > flr) {
            r--;
            if (itm[r][c]) this.pickupItem([r, c], itm[r][c]);else {
              nState.playerArr = [r, c];
              if (dir !== 'up') nState.heroFacing = 'up';
              this.setState(nState);
            }
          } else if (dir !== 'up') {
            this.setState({ heroFacing: 'up' });
          }
        } else if (el === 'ArrowRight' || el === 'KeyD') {
          if (c < len && bg[r][c + 1] > flr) {
            c++;
            if (itm[r][c]) this.pickupItem([r, c], itm[r][c]);else {
              nState.playerArr = [r, c];
              if (dir !== 'right') nState.heroFacing = 'right';
              this.setState(nState);
            }
          } else if (dir !== 'right') {
            this.setState({ heroFacing: 'right' });
          }
        } else if (el === 'ArrowDown' || el === 'KeyS') {
          if (r < len && bg[r + 1][c] > flr) {
            r++;
            if (itm[r][c]) this.pickupItem([r, c], itm[r][c]);else {
              nState.playerArr = [r, c];
              if (dir !== 'down') nState.heroFacing = 'down';
              this.setState(nState);
            }
          } else if (dir !== 'down') {
            this.setState({ heroFacing: 'down' });
          }
        } else if (el === 'ArrowLeft' || el === 'KeyA') {
          if (c > 0 && bg[r][c - 1] > flr) {
            c--;
            if (itm[r][c]) this.pickupItem([r, c], itm[r][c]);else {
              nState.playerArr = [r, c];
              if (dir !== 'left') nState.heroFacing = 'left';
              this.setState(nState);
            }
          } else if (dir !== 'left') {
            this.setState({ heroFacing: 'left' });
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
      var _this7 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this7.focus();
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
          React.createElement(EnemyStats, null),
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


var PageHeader = function (_React$Component7) {
  _inherits(PageHeader, _React$Component7);

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


var PageFooter = function (_React$Component8) {
  _inherits(PageFooter, _React$Component8);

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


var App = function (_React$Component9) {
  _inherits(App, _React$Component9);

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