'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
};

/**
  * Helper Functions
  */

var randInt = function randomIntFromRange(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

//Rectangular
var newRoomOne = function createNewRoomOne(rows, cols) {
  var xMin = roomSize[cols].min,
      xMax = roomSize[cols].max,
      yMin = roomSize[rows].min,
      yMax = roomSize[rows].max,
      xFloorMin = xMin - 4,
      xFloorMax = xMax - 4,
      yFloorMin = yMin - 4,
      yFloorMax = yMax - 4,
      w = randInt(xFloorMin, xFloorMax),
      h = randInt(yFloorMin, yFloorMax),
      xPadL = randInt(2, xMax - w - 2),
      xPadR = xMax - w - xPadL,
      yPadT = randInt(2, yMax - h - 2),
      yPadB = yMax - h - yPadT,
      roomFloorArr = [];

  var i = 0,
      j = 0;

  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];
    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + w && i + 1 > yPadT && i < yPadT + h) {
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
      }
    }
  }

  return {
    xPadL: xPadL,
    xPadR: xPadR,
    yPadT: yPadT,
    yPadB: yPadB,
    xMax: xMax,
    yMax: yMax,
    roomFloorArr: roomFloorArr
  };
};

//random out on each tile from min rectangle size
var newRoomTwo = function createNewRoomTwo(rows, cols) {
  //Subtract two to leave room for permimeter walls
  var xMin = roomSize[cols].min,
      xMax = roomSize[cols].max,
      yMin = roomSize[rows].min,
      yMax = roomSize[rows].max,
      xFloorMin = xMin - 4,
      yFloorMin = yMin - 4;

  var xPadL = randInt(2, xMax - xFloorMin - 2),
      xPadR = xMax - xFloorMin - xPadL,
      yPadT = randInt(2, yMax - yFloorMin - 2),
      yPadB = yMax - yFloorMin - yPadT,
      roomFloorArr = [],
      floorExtendArr = [],
      ext = 0,
      s = 0,
      i = 0,
      j = 0;

  //create arrays to extend min floor size
  floorExtendArr.length = 4;
  for (i = 0; i < 4; i++) {
    floorExtendArr[i] = [];

    if (i === 0) ext = yPadT - 2, s = xFloorMin;else if (i === 1) ext = xPadR - 2, s = yFloorMin;else if (i === 2) ext = yPadB - 2, s = xFloorMin;else ext = xPadL - 2, s = yFloorMin;

    for (j = 0; j < s; j++) {
      floorExtendArr[i][j] = randInt(0, ext);
    }
  }

  //Set min floor size to 1's in roomFloorArr
  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];

    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + xFloorMin && i + 1 > yPadT && i < yPadT + yFloorMin) {
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
      }
    }
  }

  //Extend top, right, bottom, left floor edges per floorExtendArr
  floorExtendArr[0].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT - 1 - i][xPadL + index] = 1;
    }
  });
  floorExtendArr[1].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + index][xPadL + xFloorMin + i] = 1;
    }
  });
  floorExtendArr[2].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + yFloorMin + i][xPadL + index] = 1;
    }
  });
  floorExtendArr[3].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + index][xPadL - 1 - i] = 1;
    }
  });

  yPadT = yPadT - Math.max.apply(Math, _toConsumableArray(floorExtendArr[0]));
  xPadR = xPadR - Math.max.apply(Math, _toConsumableArray(floorExtendArr[1]));
  yPadB = yPadB - Math.max.apply(Math, _toConsumableArray(floorExtendArr[2]));
  xPadL = xPadL - Math.max.apply(Math, _toConsumableArray(floorExtendArr[3]));

  return {
    xPadL: xPadL,
    xPadR: xPadR,
    yPadT: yPadT,
    yPadB: yPadB,
    xMax: xMax,
    yMax: yMax,
    roomFloorArr: roomFloorArr
  };
};

var newRoomThree = function createNewRoomThree(rows, cols) {
  var xMin = roomSize[cols].min,
      xMax = roomSize[cols].max,
      yMin = roomSize[rows].min,
      yMax = roomSize[rows].max,
      xFloorMax = xMax - 4,
      xFloorMin = xMin - 4,
      yFloorMax = yMax - 4,
      yFloorMin = yMin - 4,
      w = randInt(xFloorMin, xFloorMax),
      h = randInt(yFloorMin, yFloorMax),
      sidesToExtend = [randInt(0, 1), randInt(0, 1), randInt(0, 1), randInt(0, 1)];

  var xPadL = randInt(2, xMax - w - 2),
      xPadR = xMax - w - xPadL,
      yPadT = randInt(2, yMax - h - 2),
      yPadB = yMax - h - yPadT,
      roomFloorArr = [],
      floorExtendArr = [],
      ext = 0,
      s = 0,
      i = 0,
      j = 0;

  //create arrays to extend min floor size
  floorExtendArr.length = 4;
  for (i = 0; i < 4; i++) {
    floorExtendArr[i] = [];

    if (i === 0) ext = yPadT - 2, s = w;else if (i === 1) ext = xPadR - 2, s = h;else if (i === 2) ext = yPadB - 2, s = w;else ext = xPadL - 2, s = h;

    for (j = 0; j < s; j++) {
      floorExtendArr[i][j] = randInt(0, ext);
    }
  }

  //Set min floor size to 1's in roomFloorArr
  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];

    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + w && i + 1 > yPadT && i < yPadT + h) {
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
      }
    }
  }

  //Extend top, right, bottom, left floor edges per floorExtendArr
  sidesToExtend[0] && floorExtendArr[0].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT - 1 - i][xPadL + index] = 1;
    }
  });
  sidesToExtend[1] && floorExtendArr[1].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + index][xPadL + w + i] = 1;
    }
  });
  sidesToExtend[2] && floorExtendArr[2].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + h + i][xPadL + index] = 1;
    }
  });
  sidesToExtend[3] && floorExtendArr[3].forEach(function (el, index) {
    for (i = 0; i < el; i++) {
      roomFloorArr[yPadT + index][xPadL - 1 - i] = 1;
    }
  });

  yPadT = sidesToExtend[0] ? yPadT - Math.max.apply(Math, _toConsumableArray(floorExtendArr[0])) : yPadT;
  xPadR = sidesToExtend[1] ? xPadR - Math.max.apply(Math, _toConsumableArray(floorExtendArr[1])) : xPadR;
  yPadB = sidesToExtend[2] ? yPadB - Math.max.apply(Math, _toConsumableArray(floorExtendArr[2])) : yPadB;
  xPadL = sidesToExtend[3] ? xPadL - Math.max.apply(Math, _toConsumableArray(floorExtendArr[3])) : xPadL;

  return {
    xPadL: xPadL,
    xPadR: xPadR,
    yPadT: yPadT,
    yPadB: yPadB,
    xMax: xMax,
    yMax: yMax,
    roomFloorArr: roomFloorArr
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

    _this8.createFloors = _this8.createFloors.bind(_this8);
    _this8.stitchRooms = _this8.stitchRooms.bind(_this8);
    _this8.createPaths = _this8.createPaths.bind(_this8);

    _this8.state = {
      boardSize: 120,
      bgArr: []
    };
    return _this8;
  }

  _createClass(BackgroundLayer, [{
    key: 'createFloors',
    value: function createFloors() {
      var rows = 0,
          colsArr = [],
          cols = 0,
          xPadL = 0,
          xPadR = 0,
          yPadT = 0,
          yPadB = 0,
          xMax = 0,
          yMax = 0,
          roomType = 0,
          rooms = [],
          rmsRow = [],
          roomFloorArr = [],
          i = 0,
          j = 0;

      rows = randInt(3, 4) * 2;
      colsArr.length = rows;
      for (; i < rows; i++) {
        colsArr[i] = randInt(2, 4) * 2;
      }

      rooms = colsArr.map(function (el, index) {
        rmsRow = [];

        for (j = 0; j < el; j++) {
          roomType = randInt(1, 10);
          cols = el;

          if (roomType === 1) {
            var _newRoomOne = newRoomOne(rows, cols);

            xPadL = _newRoomOne.xPadL;
            xPadR = _newRoomOne.xPadR;
            yPadT = _newRoomOne.yPadT;
            yPadB = _newRoomOne.yPadB;
            xMax = _newRoomOne.xMax;
            yMax = _newRoomOne.yMax;
            roomFloorArr = _newRoomOne.roomFloorArr;
          } else if (roomType > 1 && roomType < 8) {
            var _newRoomTwo = newRoomTwo(rows, cols);

            xPadL = _newRoomTwo.xPadL;
            xPadR = _newRoomTwo.xPadR;
            yPadT = _newRoomTwo.yPadT;
            yPadB = _newRoomTwo.yPadB;
            xMax = _newRoomTwo.xMax;
            yMax = _newRoomTwo.yMax;
            roomFloorArr = _newRoomTwo.roomFloorArr;
          } else {
            var _newRoomThree = newRoomThree(rows, cols);

            xPadL = _newRoomThree.xPadL;
            xPadR = _newRoomThree.xPadR;
            yPadT = _newRoomThree.yPadT;
            yPadB = _newRoomThree.yPadB;
            xMax = _newRoomThree.xMax;
            yMax = _newRoomThree.yMax;
            roomFloorArr = _newRoomThree.roomFloorArr;
          }

          rmsRow[j] = {
            rows: rows,
            cols: cols,
            xPadL: xPadL,
            xPadR: xPadR,
            yPadT: yPadT,
            yPadB: yPadB,
            xMax: xMax,
            yMax: yMax,
            roomFloorArr: roomFloorArr,
            connections: [0, 0, 0, 0]
          };
        }

        return rmsRow;
      });
      //console.log(JSON.stringify(rooms));
      return rooms;
    }
  }, {
    key: 'stitchRooms',
    value: function stitchRooms(rooms) {
      var bgArr = [],
          boardSize = this.state.boardSize;

      var c = 0,
          i = 0,
          j = 0,
          k = 0,
          r = 0;

      bgArr.length = boardSize;
      while (r < boardSize) {
        while (c < boardSize) {
          //console.log('TEST2');
          //console.log(bgArr[r]);
          bgArr[r] = c === 0 ? rooms[k][i].roomFloorArr[j] : [].concat(_toConsumableArray(bgArr[r]), _toConsumableArray(rooms[k][i].roomFloorArr[j]));
          c += rooms[k][i].xMax;
          i++;
        }
        if (j === rooms[k][i - 1].yMax - 1) j = 0, k++;else j++;
        c = 0, i = 0;
        r++;
      }
      console.log(JSON.stringify(bgArr));
      return bgArr;
    }
  }, {
    key: 'createPaths',
    value: function createPaths(rooms, bgArr) {}
  }, {
    key: 'render',
    value: function render() {
      var rooms = this.createFloors();
      var bgArr = this.stitchRooms(rooms);
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