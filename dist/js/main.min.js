'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var roomSize = {
  '2': { min: 15, max: 29 },
  '3': { min: 12, max: 18 },
  '4': { min: 9, max: 13 }
};

/**
  * Helper Functions
  */

var randInt = function randomIntFromRange(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var newRoomOne = function createNewRoomOne(rows, cols) {
  //Subtract two to leave room for permimeter walls
  var xMin = roomSize[cols].min - 2,
      xMax = roomSize[cols].max - 2,
      yMin = roomSize[rows].min - 2,
      yMax = roomSize[rows].max - 2,
      w = randInt(xMin, xMax),
      h = randInt(yMin, yMax),
      xOffset = randInt(0, xMax - w),
      yOffset = randInt(0, yMax - h),
      roomFloorArr = [];

  var i = 0,
      j = 0;

  roomFloorArr.length = yMax;
  for (; i < yMax; i++) {
    roomFloorArr[i] = [];
    for (; j < xMax; j++) {
      if (j + 1 > xOffSet && j + 1 < xOffset + w && i + 1 > yOffset && i + 1 < yOffset + h) {
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
      }
    }
  }

  return {
    xOffset: xOffset,
    yOffset: yOffset,
    roomFloorArr: roomFloorArr,
    areaWidth: xMax,
    areaHeight: yMax,
    floorWidth: w,
    floorHeight: h
  };
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

var BackgroundLayer = function (_React$Component8) {
  _inherits(BackgroundLayer, _React$Component8);

  function BackgroundLayer(props) {
    _classCallCheck(this, BackgroundLayer);

    var _this8 = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, props));

    _this8.createRooms = _this8.createRooms.bind(_this8);
    return _this8;
  }

  _createClass(BackgroundLayer, [{
    key: 'createRooms',
    value: function createRooms() {
      var rows = 0,
          cols = [],
          rooms = [],
          rmsRow = [],
          i = 0,
          j = 0;

      rows = randInt(3, 4);
      cols.length = rows;
      for (; i < rows; i++) {
        cols[i] = randInt(2, 4);
      }
      console.log('rows: ' + rows, 'cols: ' + cols);

      rooms = cols.map(function (el, index) {
        rmsRow = [];

        for (j = 0; j < el; j++) {
          rmsRow[j] = {
            rows: rows,
            columns: el,
            roomType: randInt(1, 3)
          };
        }

        return rmsRow;
      });

      console.log('rooms: ', rooms);
    }
  }, {
    key: 'render',
    value: function render() {
      this.createRooms();
      return React.createElement('div', null);
    }
  }]);

  return BackgroundLayer;
}(React.Component);

var GameStage = function (_React$Component9) {
  _inherits(GameStage, _React$Component9);

  function GameStage(props) {
    _classCallCheck(this, GameStage);

    return _possibleConstructorReturn(this, (GameStage.__proto__ || Object.getPrototypeOf(GameStage)).call(this, props));
  }

  _createClass(GameStage, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'stage' },
        React.createElement(BackgroundLayer, null),
        ' '
      );
    }
  }]);

  return GameStage;
}(React.Component);

var Game = function (_React$Component10) {
  _inherits(Game, _React$Component10);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'game' },
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
          React.createElement(GameStage, null),
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


var PageHeader = function (_React$Component11) {
  _inherits(PageHeader, _React$Component11);

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


var PageFooter = function (_React$Component12) {
  _inherits(PageFooter, _React$Component12);

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


var App = function (_React$Component13) {
  _inherits(App, _React$Component13);

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