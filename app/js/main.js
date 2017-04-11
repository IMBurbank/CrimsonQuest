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

var CharacterInfo = function (_React$Component2) {
  _inherits(CharacterInfo, _React$Component2);

  function CharacterInfo() {
    _classCallCheck(this, CharacterInfo);

    return _possibleConstructorReturn(this, (CharacterInfo.__proto__ || Object.getPrototypeOf(CharacterInfo)).apply(this, arguments));
  }

  _createClass(CharacterInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'char-info' },
        'Character Info'
      );
    }
  }]);

  return CharacterInfo;
}(React.Component);

var GameItems = function (_React$Component3) {
  _inherits(GameItems, _React$Component3);

  function GameItems() {
    _classCallCheck(this, GameItems);

    return _possibleConstructorReturn(this, (GameItems.__proto__ || Object.getPrototypeOf(GameItems)).apply(this, arguments));
  }

  _createClass(GameItems, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'items' },
        'Game Items'
      );
    }
  }]);

  return GameItems;
}(React.Component);

var EnemiesRemaining = function (_React$Component4) {
  _inherits(EnemiesRemaining, _React$Component4);

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

var EnemyStats = function (_React$Component5) {
  _inherits(EnemyStats, _React$Component5);

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

var ActivityLog = function (_React$Component6) {
  _inherits(ActivityLog, _React$Component6);

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

var GameTips = function (_React$Component7) {
  _inherits(GameTips, _React$Component7);

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

var Game = function (_React$Component8) {
  _inherits(Game, _React$Component8);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this8 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this8.updateBgArr = _this8.updateBgArr.bind(_this8);
    _this8.handleKeyDown = _this8.handleKeyDown.bind(_this8);
    _this8.updatePlayerArr = _this8.updatePlayerArr.bind(_this8);

    _this8.state = {
      boardSize: 120,
      floor: 40,
      gameLevel: 1,
      hero: 'Paladin',
      playerArr: [],
      bgArr: [],
      floorCoords: []
    };
    return _this8;
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
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var el = e.nativeEvent.code,
          arr = this.state.playerArr,
          bg = this.state.bgArr,
          flr = this.state.floor,
          len = this.state.boardSize - 1;

      var r = arr[0],
          c = arr[1];

      if ((el === 'ArrowUp' || el === 'KeyW') && r > 0 && bg[r - 1][c] > flr) {
        r--;
        this.setState({ playerArr: [r, c] });
      } else if ((el === 'ArrowRight' || el === 'KeyD') && c < len && bg[r][c + 1] > flr) {
        c++;
        this.setState({ playerArr: [r, c] });
      } else if ((el === 'ArrowDown' || el === 'KeyS') && r < len && bg[r + 1][c] > flr) {
        r++;
        this.setState({ playerArr: [r, c] });
      } else if ((el === 'ArrowLeft' || el === 'KeyA') && c > 0 && bg[r][c - 1] > flr) {
        c--;
        this.setState({ playerArr: [r, c] });
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
          React.createElement(CharacterInfo, null)
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
            floor: this.state.floor,
            gameLevel: this.state.gameLevel,
            hero: this.state.hero,
            playerArr: this.state.playerArr,
            bgArr: this.state.bgArr,
            updateBgArr: this.updateBgArr,
            floorCoords: this.state.floorCoords,
            updatePlayerArr: this.updatePlayerArr }),
          React.createElement(GameItems, null)
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


var PageHeader = function (_React$Component9) {
  _inherits(PageHeader, _React$Component9);

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


var PageFooter = function (_React$Component10) {
  _inherits(PageFooter, _React$Component10);

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


var App = function (_React$Component11) {
  _inherits(App, _React$Component11);

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