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
  return ~~(min + Math.random() * (max - min + 1));
};

var devError = function createDevError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Default Error';

  this.name = 'DevError';
  this.message = message;
  this.stack = new Error().stack;
};

var backgroundArray = function createBackgroundArray(arrSize) {
  var air = 10,
      flr = 40;

  //Random rectangle
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
          roomFloorArr[i][j] = flr;
        } else {
          roomFloorArr[i][j] = air;
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

  //Random out on each tile from min rectangle size
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

    //create arrays to extend min floor area
    floorExtendArr.length = 4;
    for (i = 0; i < 4; i++) {
      floorExtendArr[i] = [];

      if (i === 0) ext = yPadT - 2, s = xFloorMin;else if (i === 1) ext = xPadR - 2, s = yFloorMin;else if (i === 2) ext = yPadB - 2, s = xFloorMin;else ext = xPadL - 2, s = yFloorMin;

      for (j = 0; j < s; j++) {
        floorExtendArr[i][j] = randInt(0, ext);
      }
    }

    //Set min floor area flr val in roomFloorArr
    roomFloorArr.length = yMax;
    for (i = 0; i < yMax; i++) {
      roomFloorArr[i] = [];

      for (j = 0; j < xMax; j++) {
        if (j + 1 > xPadL && j < xPadL + xFloorMin && i + 1 > yPadT && i < yPadT + yFloorMin) {
          roomFloorArr[i][j] = flr;
        } else {
          roomFloorArr[i][j] = air;
        }
      }
    }

    //Extend top, right, bottom, left floor edges per floorExtendArr
    floorExtendArr[0].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT - 1 - i][xPadL + index] = flr;
      }
    });
    floorExtendArr[1].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + index][xPadL + xFloorMin + i] = flr;
      }
    });
    floorExtendArr[2].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + yFloorMin + i][xPadL + index] = flr;
      }
    });
    floorExtendArr[3].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + index][xPadL - 1 - i] = flr;
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

  //Random out from random sides of rectangle
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
          roomFloorArr[i][j] = flr;
        } else {
          roomFloorArr[i][j] = air;
        }
      }
    }

    //Extend top, right, bottom, left floor edges per floorExtendArr
    sidesToExtend[0] && floorExtendArr[0].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT - 1 - i][xPadL + index] = flr;
      }
    });
    sidesToExtend[1] && floorExtendArr[1].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + index][xPadL + w + i] = flr;
      }
    });
    sidesToExtend[2] && floorExtendArr[2].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + h + i][xPadL + index] = flr;
      }
    });
    sidesToExtend[3] && floorExtendArr[3].forEach(function (el, index) {
      for (i = 0; i < el; i++) {
        roomFloorArr[yPadT + index][xPadL - 1 - i] = flr;
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

  var createRooms = function createNewRooms() {
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
          cnxns: [0, 0, 0, 0],
          curRow: index
        };
      }

      return rmsRow;
    });
    return rooms;
  };

  var stitchRooms = function stitchRoomArray(rooms) {
    var stitchArr = [],
        len = arrSize;

    var c = 0,
        i = 0,
        j = 0,
        k = 0,
        r = 0;

    stitchArr.length = len;
    while (r < len) {
      while (c < len) {
        stitchArr[r] = c === 0 ? rooms[k][i].roomFloorArr[j] : [].concat(_toConsumableArray(stitchArr[r]), _toConsumableArray(rooms[k][i].roomFloorArr[j]));
        c += rooms[k][i].xMax;
        i++;
      }
      if (j === rooms[k][i - 1].yMax - 1) j = 0, k++;else j++;
      c = 0, i = 0;
      r++;
    }
    return stitchArr;
  };

  var choosePaths = function newPaths(rm, rooms, stitchArr, chkRow, chkCol, tieRule, tiedRow) {
    var len = stitchArr.length,
        xMax = rm.xMax,
        yMax = rm.yMax;

    var pathOpts = [],
        paths = [],
        goUp = false,
        goRt = false,
        goDn = false,
        goLt = false,
        chk = false,
        val = 0,
        i = 0,
        j = 0,
        k = 0;

    if (tieRule === 1 || tieRule === 2 && rm.cnxns[3] || tieRule === 4 && rm.cnxns[0]) {
      val = randInt(1, 3);
      goRt = val === 1 || val === 3 ? true : false;
      goDn = val === 2 || val === 3 ? true : false;
    } else if (tieRule === 2) {
      goRt = randInt(0, 1) ? true : false;
      goDn = true;
    } else if (tieRule === 3) {
      goDn = !rm.cnxns[3] || !tiedRow || randInt(0, 1) ? true : false;
    } else if (tieRule === 4) {
      goRt = true;
      goDn = randInt(0, 1) ? true : false;
    } else if (tieRule === 5) {
      goRt = !rm.cnxns[0] || !rooms[rm.curRow - 1][~~(chkCol / rooms[rm.curRow - 1][0].xMax)].cnxns[1] || randInt(0, 1) ? true : false;
    } else {
      goUp = !rm.cnxns[0] ? true : false;
      goLt = !rm.cnxns[3] ? true : false;
    }
    tiedRow = goDn ? true : tiedRow;

    if (goUp) {
      i = 0;

      while (i < xMax) {
        if (stitchArr[chkRow][chkCol - ~~(xMax / 2) + i] === flr) {
          k = chkCol - ~~(xMax / 2) + i;
          chk = false;
          j = 0;

          while (!chk) {
            j++;

            if (j > ~~(yMax / 2) && (j > 2 * yMax || chkRow - j < 2 || stitchArr[chkRow - j][k] === flr || stitchArr[chkRow - j - 1][k] === flr || stitchArr[chkRow - j][k + 1] === flr || stitchArr[chkRow - j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * yMax && chkRow - j > 1) pathOpts.push([1, k, chkRow, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);else {
        goRt = true;
        try {
          throw new devError('No pathOpts up. Set right. -> BackgroundLayer.choosePaths');
        } catch (e) {
          console.log(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule);
        }
      }
    }
    if (goDn) {
      pathOpts.length = 0;
      i = 0;

      while (i < xMax) {
        if (stitchArr[chkRow][chkCol - ~~(xMax / 2) + i] === flr) {
          k = chkCol - ~~(xMax / 2) + i;
          chk = false;
          j = 0;

          while (!chk) {
            j++;

            if (j > ~~(yMax / 2) && (j > 2 * yMax || chkRow + j > len - 3 || stitchArr[chkRow + j][k] === flr || stitchArr[chkRow + j][k + 1] === flr || stitchArr[chkRow + j + 1][k] === flr || stitchArr[chkRow + j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * yMax && chkRow + j < len - 3) pathOpts.push([3, k, chkRow, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);else {
        goRt = true;
        try {
          throw new devError('No pathOpts down. Set right. -> BackgroundLayer.choosePaths');
        } catch (e) {
          console.log(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule);
        }
      }
    }
    if (goRt) {
      pathOpts.length = 0;
      i = 0;

      while (i < yMax) {
        if (stitchArr[chkRow - ~~(yMax / 2) + i][chkCol] === flr) {
          k = chkRow - ~~(yMax / 2) + i;
          chk = false;
          j = 0;

          while (!chk) {
            j++;

            if (j > ~~(xMax / 2) && (j > 2 * xMax || chkCol + j > len - 3 || stitchArr[k][chkCol + j] === flr || stitchArr[k - 1][chkCol + j] === flr || stitchArr[k][chkCol + j + 1] === flr || stitchArr[k + 1][chkCol + j] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * xMax && chkCol + j < len - 3) pathOpts.push([2, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);else {
        try {
          throw new devError('no pathOpts right -> BackgroundLayer.choosePaths');
        } catch (e) {
          console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule);
        }
      }
    }
    if (goLt) {
      pathOpts.length = 0;
      i = 0;

      while (i < yMax) {
        if (stitchArr[chkRow - ~~(yMax / 2) + i][chkCol] === flr) {
          k = chkRow - ~~(yMax / 2) + i;
          chk = false;
          j = 0;

          while (!chk) {
            j++;

            if (j > ~~(yMax / 2) && (j > 2 * xMax || chkCol - j < 2 || stitchArr[k][chkCol - j] === flr || stitchArr[k - 1][chkCol - j] === flr || stitchArr[k + 1][chkCol - j] === flr || stitchArr[k][chkCol - j - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * xMax && chkCol - j > 1) pathOpts.push([4, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);else {
        try {
          throw new devError('no pathOpts left -> BackgroundLayer.choosePaths');
        } catch (e) {
          console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule);
        }
      }
    }

    if (paths.length === 1) paths.push([0, 0, 0, 0]);else if (paths.length > 2) {
      try {
        throw new devError('paths.length > 2 -> BackgroundLayer.choosePaths');
      } catch (e) {
        console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule);
      }
    }

    return { paths: paths, tiedRow: tiedRow };
  };

  var applyPaths = function applyNewPaths(rm, rooms, stitchArr, paths) {
    var i = 0;

    paths.forEach(function (el) {
      if (el[0] === 1) {
        i = 0;
        while (i < el[3]) {
          i++;
          stitchArr[el[2] - i][el[1]] = flr;
        }
        rm.cnxns[0] = 1;
        rooms[rm.curRow - 1][~~(el[1] / rooms[rm.curRow - 1][0].xMax)].cnxns[2] = 1;
      } else if (el[0] === 2) {
        i = 0;
        while (i < el[3]) {
          i++;
          stitchArr[el[2]][el[1] + i] = flr;
        }
        rm.cnxns[1] = 1;
        rooms[rm.curRow][~~(el[1] / rooms[rm.curRow][0].xMax) + 1].cnxns[3] = 1;
      } else if (el[0] === 3) {
        i = 0;
        while (i < el[3]) {
          i++;
          stitchArr[el[2] + i][el[1]] = flr;
        }
        rm.cnxns[2] = 1;
        rooms[rm.curRow + 1][~~(el[1] / rooms[rm.curRow + 1][0].xMax)].cnxns[0] = 1;
      } else if (el[0] === 4) {
        i = 0;
        while (i < el[3]) {
          i++;
          stitchArr[el[2]][el[1] - i] = flr;
        }
        rm.cnxns[3] = 1;
        rooms[rm.curRow][~~(el[1] / rooms[rm.curRow][0].xMax) - 1].cnxns[1] = 1;
      }
    });

    return true;
  };

  var createPaths = function createNewPaths(rooms, stitchArr) {
    var len = stitchArr.length;

    var tiedRow = false,
        paths = [],
        rm = void 0,
        //{} pointer
    chkRow = 0,
        chkCol = 0,
        tieRule = 0,
        r = 0,
        c = 0,
        i = 0,
        j = 0;

    paths.length = ~~(len / 4);

    while (r < len) {
      while (c < len) {
        rm = rooms[j][i];
        chkRow = r + ~~(rm.yMax / 2);
        chkCol = c + ~~(rm.xMax / 2);
        tieRule = j === 0 && i === 0 ? 1 : j === 0 && i < rooms[j].length - 1 ? 2 : j < rooms.length - 1 && i === rooms[j].length - 1 ? 3 : j < rooms.length - 1 && i < rooms[j].length - 1 ? 4 : j === rooms.length - 1 && i < rooms[j].length - 1 ? 5 : 6;

        var _choosePaths = choosePaths(rm, rooms, stitchArr, chkRow, chkCol, tieRule, tiedRow);

        paths = _choosePaths.paths;
        tiedRow = _choosePaths.tiedRow;

        applyPaths(rm, rooms, stitchArr, paths);

        c += rm.xMax;
        i++;
      }
      r += rooms[j][i - 1].yMax;
      j++;
      tiedRow = false;
      c = 0;
      i = 0;
    }

    return stitchArr;
  };

  var randomizeOrientation = function randomizeArrOrientation(connectedArr) {
    var len = connectedArr.length,
        orientation = randInt(1, 4);

    var orientedArr = [],
        i = 0,
        j = 0;

    var transposed = function transposeSquareArr(arr) {
      var tArr = [],
          len = arr.length;

      while (i < len) {
        tArr[i] = [];
        j = 0;

        while (j < len) {
          tArr[i][j] = arr[j][i], j++;
        }i++;
      }
      return tArr;
    };

    if (orientation === 1) {
      orientedArr = [].concat(_toConsumableArray(connectedArr));
    }
    if (orientation === 2) {
      //Rotate +90 deg
      orientedArr = transposed(connectedArr);
      orientedArr.forEach(function (el) {
        return el.reverse();
      });
    } else if (orientation === 3) {
      //Rotate 180 deg
      while (i < len) {
        orientedArr[i] = connectedArr[len - 1 - i].reverse();
        i++;
      }
    } else if (orientation === 4) {
      //Rotate -90 deg
      connectedArr.forEach(function (el) {
        return el.reverse();
      });
      orientedArr = transposed(connectedArr);
    }
    return { orientation: orientation, orientedArr: orientedArr };
  };

  var addWalls = function addArrWalls(orientedArr) {
    var walledArr = orientedArr,
        nArr = [0, 0, 0, 0, 0, 0, 0, 0],
        len = walledArr.length - 1;

    var hWallCoords = [],
        vWallCoords = [],
        i = 1,
        j = 1,
        el = 0;

    while (i < len) {
      j = 1;

      while (j < len) {
        el = 0;

        if (orientedArr[i][j] === air) {
          nArr[0] = walledArr[i - 1][j - 1];
          nArr[1] = walledArr[i - 1][j];
          nArr[2] = walledArr[i - 1][j + 1];
          nArr[3] = walledArr[i][j - 1];
          nArr[4] = walledArr[i][j + 1];
          nArr[5] = walledArr[i + 1][j - 1];
          nArr[6] = walledArr[i + 1][j];
          nArr[7] = walledArr[i + 1][j + 1];

          if (nArr.indexOf(flr) > -1) {
            if (nArr[3] > air && nArr[3] < flr && nArr[4] === air && nArr[6] === air && (nArr[1] === air || nArr[1] === flr) && (nArr[5] === flr && nArr[7] === flr || nArr[1] === flr && (nArr[5] === flr || nArr[7] === flr))) {
              el = 31;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[4] === air && nArr[6] === air && (nArr[3] === air || nArr[3] === flr) && (nArr[2] === flr && nArr[7] === flr || nArr[3] === flr && (nArr[2] === flr || nArr[7] === flr))) {
              el = 32;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[3] > air && nArr[3] < flr && nArr[4] === air && nArr[6] === air && nArr[2] === flr && nArr[7] === flr) {
              el = 33;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[3] > air && nArr[3] < flr && nArr[6] === air && (nArr[0] === flr && nArr[5] === flr || (nArr[0] === flr || nArr[5] === flr) && nArr[4] === flr)) {
              el = 34;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[3] > air && nArr[3] < flr && nArr[4] === air && (nArr[0] === flr && nArr[2] === flr || (nArr[0] === flr || nArr[2] === flr) && nArr[6] === flr)) {
              el = 35;
            } else if (nArr[4] === air && nArr[6] === air && (nArr[1] === flr && nArr[3] === flr || nArr[7] === flr)) {
              el = 21;
            } else if (nArr[3] > air && nArr[3] < flr && nArr[6] === air && (nArr[1] === flr && nArr[4] === flr || nArr[5] === flr)) {
              el = 23;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[4] === air && (nArr[3] === flr && nArr[6] === flr || nArr[2] === flr)) {
              el = 25;
            } else if (nArr[1] > air && nArr[1] < flr && nArr[3] > air && nArr[3] < flr && (nArr[0] === flr || nArr[4] === flr && nArr[6] === flr)) {
              el = 27;
            } else if (nArr[3] > air && nArr[3] < flr && (nArr[1] === flr || nArr[6] === flr) || nArr[4] === air && (nArr[1] === flr && nArr[2] === flr || nArr[5] === flr && nArr[6] === flr)) {
              el = 22;
              hWallCoords.push([i, j]);
            } else if (nArr[1] > air && nArr[1] < flr && (nArr[3] === flr || nArr[4] === flr) || nArr[1] === flr && nArr[3] === flr && nArr[4] === flr && nArr[6] === air || nArr[3] === flr && nArr[5] === flr || nArr[4] === flr && nArr[7] === flr) {
              el = 24;
              vWallCoords.push([i, j]);
            } else if (nArr[1] === flr || nArr[3] === flr || nArr[4] === flr || nArr[6] === flr) {
              el = 26;
            }

            if (el) walledArr[i][j] = el;
          }
        }
        j++;
      }
      i++;
    }

    return { walledArr: walledArr, hWallCoords: hWallCoords, vWallCoords: vWallCoords };
  };

  var addFloors = function addArrFloors(walledArr) {
    var bgArr = walledArr,
        nArr = [0, 0, 0, 0, 0, 0, 0, 0],
        len = bgArr.length - 1,
        sFlr = flr - 1;

    var floorCoords = [],
        i = 1,
        j = 1,
        el = 0;

    while (i < len) {
      j = 1;

      while (j < len) {
        el = 0;

        if (walledArr[i][j] > sFlr) {
          nArr[0] = bgArr[i - 1][j - 1];
          nArr[1] = bgArr[i - 1][j];
          nArr[2] = bgArr[i - 1][j + 1];
          nArr[3] = bgArr[i][j - 1];
          nArr[4] = bgArr[i][j + 1];
          nArr[5] = bgArr[i + 1][j - 1];
          nArr[6] = bgArr[i + 1][j];
          nArr[7] = bgArr[i + 1][j + 1];
          floorCoords.push([i, j]);

          if (nArr[1] < flr && nArr[3] < flr && nArr[4] > sFlr && nArr[6] > sFlr) {
            el = 41;
          } else if (nArr[1] < flr && nArr[3] > sFlr && nArr[4] > sFlr && nArr[6] > sFlr) {
            el = 42;
          } else if (nArr[1] < flr && nArr[3] > sFlr && nArr[4] < flr && nArr[6] > sFlr) {
            el = 43;
          } else if (nArr[1] > sFlr && nArr[3] < flr && nArr[4] > sFlr && nArr[6] > sFlr) {
            el = 44;
          } else if (nArr[1] > sFlr && nArr[3] > sFlr && nArr[4] > sFlr && nArr[6] > sFlr) {
            el = 45;
          } else if (nArr[1] > sFlr && nArr[3] > sFlr && nArr[4] < flr && nArr[6] > sFlr) {
            el = 46;
          } else if (nArr[1] > sFlr && nArr[3] < flr && nArr[4] > sFlr && nArr[6] < flr) {
            el = 47;
          } else if (nArr[1] > sFlr && nArr[3] > sFlr && nArr[4] > sFlr && nArr[6] < flr) {
            el = 48;
          } else if (nArr[1] > sFlr && nArr[3] > sFlr && nArr[4] < flr && nArr[6] < flr) {
            el = 49;
          } else if (nArr[1] < flr && nArr[3] < flr && nArr[4] < flr && nArr[6] > sFlr) {
            el = 51;
          } else if (nArr[1] > sFlr && nArr[3] < flr && nArr[4] < flr && nArr[6] > sFlr) {
            el = 52;
          } else if (nArr[1] > sFlr && nArr[3] < flr && nArr[4] < flr && nArr[6] < flr) {
            el = 53;
          } else if (nArr[1] < flr && nArr[3] < flr && nArr[4] > sFlr && nArr[6] < flr) {
            el = 54;
          } else if (nArr[1] < flr && nArr[3] > sFlr && nArr[4] > sFlr && nArr[6] < flr) {
            el = 55;
          } else if (nArr[1] < flr && nArr[3] > sFlr && nArr[4] < flr && nArr[6] < flr) {
            el = 56;
          } else if (nArr[1] < flr && nArr[3] < flr && nArr[4] < flr && nArr[6] < flr) {
            el = 57;
          }

          if (el) bgArr[i][j] = el;
        }
        j++;
      }
      i++;
    }
    return { bgArr: bgArr, floorCoords: floorCoords };
  };

  var rooms = createRooms();
  var stitchArr = stitchRooms(rooms);
  var connectedArr = createPaths(rooms, stitchArr);

  var _randomizeOrientation = randomizeOrientation(connectedArr),
      orientation = _randomizeOrientation.orientation,
      orientedArr = _randomizeOrientation.orientedArr;

  var _addWalls = addWalls(orientedArr),
      walledArr = _addWalls.walledArr,
      hWallCoords = _addWalls.hWallCoords,
      vWallCoords = _addWalls.vWallCoords;

  var _addFloors = addFloors(walledArr),
      bgArr = _addFloors.bgArr,
      floorCoords = _addFloors.floorCoords;

  console.log(orientation);
  console.log(JSON.stringify(bgArr));
  // console.log('BgArr floorCoords: ', JSON.stringify(floorCoords));
  return { bgArr: bgArr, floorCoords: floorCoords, hWallCoords: hWallCoords, vWallCoords: vWallCoords };
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

//props: stageSize, boardSize, tileSize, gameLevel, bgArr, updateBgArr, playerArr


var BackgroundLayer = function (_React$Component8) {
  _inherits(BackgroundLayer, _React$Component8);

  function BackgroundLayer(props) {
    _classCallCheck(this, BackgroundLayer);

    var _this8 = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, props));

    _this8.initTempCanvas = _this8.initTempCanvas.bind(_this8);
    _this8.getBgImages = _this8.getBgImages.bind(_this8);
    _this8.initPaletteMaps = _this8.initPaletteMaps.bind(_this8);
    _this8.setPalettes = _this8.setPalettes.bind(_this8);
    _this8.drawBackground = _this8.drawBackground.bind(_this8);

    _this8.state = {
      srcTileSize: 16,
      floorImg: null,
      wallImg: null,
      floorPalette: {},
      wallPalette: {},
      floorPaletteMap: {},
      wallPaletteMap: {},
      tempCanv: {},
      playerLoc: []
    };
    return _this8;
  }

  _createClass(BackgroundLayer, [{
    key: 'getBgImages',
    value: function getBgImages() {
      var floorImg = new Image(),
          wallImg = new Image(),
          that = this;

      var i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 2) {
          that.setState({ floorImg: floorImg, wallImg: wallImg });

          //Delete after start screen created
          that.setPalettes(floorImg, wallImg, that.props.gameLevel);
        }
      };

      floorImg.src = 'img/terrain/Floor.png';
      wallImg.src = 'img/terrain/Wall.png';
      floorImg.addEventListener('load', handleLoad);
      wallImg.addEventListener('load', handleLoad);
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          size = this.props.stageSize;

      canvas.width = size;
      canvas.height = size;
      ctx.imageSmoothingEnabled = false;

      this.setState({ tempCanv: { canvas: canvas, ctx: ctx } });
    }
  }, {
    key: 'initPaletteMaps',
    value: function initPaletteMaps() {
      var ts = this.props.tileSize;

      var floorPaletteMap = {
        '41': [0, 0],
        '42': [ts, 0],
        '43': [2 * ts, 0],
        '44': [0, ts],
        '45': [ts, ts],
        '46': [2 * ts, ts],
        '47': [0, 2 * ts],
        '48': [ts, 2 * ts],
        '49': [2 * ts, 2 * ts],
        '51': [3 * ts, 0],
        '52': [3 * ts, ts],
        '53': [3 * ts, 2 * ts],
        '54': [4 * ts, ts],
        '55': [5 * ts, ts],
        '56': [6 * ts, ts],
        '57': [5 * ts, 0]
      };

      var wallPaletteMap = {
        '21': [0, 0],
        '22': [ts, 0],
        '23': [2 * ts, 0],
        '24': [0, ts],
        '25': [0, 2 * ts],
        '26': [ts, ts],
        '27': [2 * ts, 2 * ts],
        '31': [4 * ts, 0],
        '32': [3 * ts, ts],
        '33': [4 * ts, ts],
        '34': [5 * ts, ts],
        '35': [4 * ts, 2 * ts],
        '36': [3 * ts, 0]
      };

      this.setState({ floorPaletteMap: floorPaletteMap, wallPaletteMap: wallPaletteMap });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(floorImg, wallImg, gameLevel) {
      var lvl = gameLevel,
          gmTileSize = this.props.tileSize,
          srcTileSize = this.state.srcTileSize,
          scale = gmTileSize / srcTileSize,
          h = 3 * gmTileSize,
          fw = 7 * gmTileSize,
          ww = 6 * gmTileSize;

      var fCanvas = document.createElement('canvas'),
          fCtx = fCanvas.getContext('2d'),
          wCanvas = document.createElement('canvas'),
          wCtx = wCanvas.getContext('2d'),
          srcY = 3 * srcTileSize;

      srcY *= lvl === 1 ? 5 : lvl === 2 ? 6 : lvl === 3 ? 7 : lvl === 4 ? 8 : lvl === 5 ? 1 : lvl < 8 ? 2 : lvl < 10 ? 3 : lvl === 10 ? 4 : 1;

      fCanvas.width = fw;
      fCanvas.height = h;
      fCtx.imageSmoothingEnabled = false;
      fCtx.drawImage(floorImg, 0, srcY, fw / scale, h / scale, 0, 0, fw, h);

      wCanvas.width = ww;
      wCanvas.height = h;
      wCtx.imageSmoothingEnabled = false;
      wCtx.drawImage(wallImg, 0, srcY, ww / scale, h / scale, 0, 0, ww, h);

      this.setState({
        floorPalette: { canvas: fCanvas, ctx: fCtx },
        wallPalette: { canvas: wCanvas, ctx: wCtx }
      });

      //Delete after start screen created
      this.props.playerArr !== [0, 0] && this.drawBackground(this.props, this.state);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(nextProps, nextState) {
      var flrImg = nextState.floorPalette.canvas,
          wallImg = nextState.wallPalette.canvas,
          flrImgMap = nextState.floorPaletteMap,
          wallImgMap = nextState.wallPaletteMap,
          bgArr = nextProps.bgArr,
          playerArr = nextProps.playerArr,
          ts = nextProps.tileSize,
          px = nextProps.stageSize,
          bgLen = bgArr.length,
          rLen = px / ts,
          air = 10,
          flr = 40;

      var dCtx = document.getElementById('bg-layer').getContext('2d'),
          tempCanv = nextState.tempCanv.canvas,
          tempCtx = nextState.tempCanv.ctx,
          renderArr = [],
          sr = 0,
          sc = 0,
          pr = 0,
          pc = 0,
          sx = 0,
          sy = 0,
          img = null,
          map = {},
          el = 0,
          srcX = 0,
          srcY = 0,
          i = 0,
          j = 0;

      if (playerArr[0] - ~~(rLen / 2) < 0) {
        sr = 0;
        pr = -1 * (playerArr[0] - ~~(rLen / 2));
      } else if (playerArr[0] + ~~(rLen / 2) + 1 > bgLen) {
        pr = playerArr[0] + ~~(rLen / 2) + 1 - bgLen;
        sr = bgLen - rLen + pr;
      } else {
        sr = playerArr[0] - ~~(rLen / 2);
        pr = 0;
      }
      if (playerArr[1] - ~~(rLen / 2) < 0) {
        sc = 0;
        pc = -1 * (playerArr[1] - ~~(rLen / 2));
      } else if (playerArr[1] + ~~(rLen / 2) + 1 > bgLen) {
        pc = playerArr[1] + ~~(rLen / 2) + 1 - bgLen;
        sc = bgLen - rLen + pc;
      } else {
        sc = playerArr[1] - ~~(rLen / 2);
        pc = 0;
      }

      renderArr.length = rLen - pr;
      while (i < rLen - pr) {
        renderArr[i] = [];
        renderArr[i].length = rLen - pc;
        while (j < rLen - pc) {
          renderArr[i][j] = bgArr[sr + i][sc + j], j++;
        }j = 0, i++;
      }

      sx = !sc && pc ? pc * ts : 0;
      sy = !sr && pr ? pr * ts : 0;

      tempCtx.fillRect(0, 0, px, px);
      for (i = 0; i < renderArr.length; i++) {
        for (j = 0; j < renderArr[i].length; j++) {
          el = renderArr[i][j];
          if (el > air) {
            img = el < flr ? wallImg : flrImg;
            map = el < flr ? wallImgMap : flrImgMap;
            srcX = map['' + el][0];
            srcY = map['' + el][1];
            tempCtx.drawImage(img, srcX, srcY, ts, ts, sx + j * ts, sy + i * ts, ts, ts);
          }
        }
      }

      dCtx.drawImage(tempCanv, 0, 0);
      this.setState({ playerLoc: [].concat(_toConsumableArray(playerArr)) });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getBgImages();
      this.initTempCanvas();
      this.initPaletteMaps();

      var _backgroundArray = backgroundArray(this.props.boardSize),
          bgArr = _backgroundArray.bgArr,
          floorCoords = _backgroundArray.floorCoords,
          hWallCoords = _backgroundArray.hWallCoords,
          vWallCoords = _backgroundArray.vWallCoords;

      this.props.updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.gameLevel !== nextProps.gameLevel && nextProps.gameLevel !== 0) {
        var _backgroundArray2 = backgroundArray(this.props.boardSize),
            bgArr = _backgroundArray2.bgArr,
            floorCoords = _backgroundArray2.floorCoords,
            hWallCoords = _backgroundArray2.hWallCoords,
            vWallCoords = _backgroundArray2.vWallCoords;

        this.props.updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords);

        if (this.state.floorImg) {
          this.setPalettes(this.state.floorImg, this.state.wallImg, nextProps.gameLevel);
        }
      }

      if (nextProps.playerArr !== this.state.playerLoc && nextProps.playerArr !== [0, 0] && this.state.floorPalette.canvas) {
        this.drawBackground(nextProps, this.state);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'bg-layer',
        className: 'bg-layer',
        width: size,
        height: size });
    }
  }]);

  return BackgroundLayer;
}(React.Component);

//props: stageSize, tileSize, hero, gameLevel, bgArr, playerArr, updatePlayerArr, floorCoords


var PlayerLayer = function (_React$Component9) {
  _inherits(PlayerLayer, _React$Component9);

  function PlayerLayer(props) {
    _classCallCheck(this, PlayerLayer);

    var _this9 = _possibleConstructorReturn(this, (PlayerLayer.__proto__ || Object.getPrototypeOf(PlayerLayer)).call(this, props));

    _this9.getPlayerImages = _this9.getPlayerImages.bind(_this9);
    _this9.initPaletteMap = _this9.initPaletteMap.bind(_this9);
    _this9.setPalette = _this9.setPalette.bind(_this9);
    _this9.pickPlayerStart = _this9.pickPlayerStart.bind(_this9);
    _this9.drawPlayer = _this9.drawPlayer.bind(_this9);

    _this9.state = {
      srcTileSize: 16,
      mageImg: null,
      rogueImg: null,
      paladinImg: null,
      warriorImg: null,
      playerPalette: null,
      playerPaletteMap: {}
    };
    return _this9;
  }

  _createClass(PlayerLayer, [{
    key: 'getPlayerImages',
    value: function getPlayerImages() {
      var mageImg = new Image(),
          rogueImg = new Image(),
          paladinImg = new Image(),
          warriorImg = new Image(),
          that = this;

      var i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 4) {
          that.setState({ mageImg: mageImg, rogueImg: rogueImg, paladinImg: paladinImg, warriorImg: warriorImg });

          //temporary palette assignment until start screen is created
          that.setPalette(that.props);
        }
      };

      mageImg.src = 'img/heroes/Mage.png';
      rogueImg.src = 'img/heroes/Rogue.png';
      paladinImg.src = 'img/heroes/Paladin.png';
      warriorImg.src = 'img/heroes/Warrior.png';
      mageImg.addEventListener('load', handleLoad);
      rogueImg.addEventListener('load', handleLoad);
      paladinImg.addEventListener('load', handleLoad);
      warriorImg.addEventListener('load', handleLoad);
    }
  }, {
    key: 'initPaletteMap',
    value: function initPaletteMap() {
      var ts = this.props.tileSize,
          w = 4;

      var playerPaletteMap = {},
          j = 0;

      ['down', 'left', 'right', 'up'].forEach(function (el, i) {
        for (j = 0; j < w; j++) {
          playerPaletteMap[el + (j + 1)] = [i * ts, j * ts];
        }
      });

      this.setState({ playerPaletteMap: playerPaletteMap });
    }
  }, {
    key: 'setPalette',
    value: function setPalette(nextProps) {
      var hero = nextProps.hero.toLowerCase(),
          srcImg = this.state[hero + 'Img'],
          srcTileSize = this.state.srcTileSize,
          gmTileSize = nextProps.tileSize,
          scale = gmTileSize / srcTileSize,
          w = 4 * gmTileSize,
          h = 4 * gmTileSize;

      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(srcImg, 0, 0, w / scale, h / scale, 0, 0, w, h);

      this.setState({ playerPalette: { canvas: canvas, ctx: ctx } });
    }
  }, {
    key: 'pickPlayerStart',
    value: function pickPlayerStart(nextProps) {
      var playerArr = nextProps.floorCoords[randInt(0, nextProps.floorCoords.length - 1)];
      nextProps.updatePlayerArr(playerArr);
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer(nextProps, nextState) {
      var img = nextState.playerPalette.canvas,
          imgD = nextProps.tileSize,
          stageD = nextProps.stageSize,
          sCoord = [0, 0],
          //temp static
      dx = (stageD - imgD) / 2,
          dy = dx;

      var canvas = document.getElementById('player-layer'),
          ctx = canvas.getContext('2d');

      ctx.drawImage(img, sCoord[0], sCoord[1], imgD, imgD, dx, dy, imgD, imgD);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getPlayerImages();
      this.initPaletteMap();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.bgArr !== nextProps.bgArr) {
        this.pickPlayerStart(nextProps);
      }
      /*
      if (!this.state.playerPalette && nextProps.hero && this.state.mageImg) {
        this.setPalette(nextProps);
      }
      */
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      //stub rule
      if (this.state.playerPalette !== nextState.playerPalette) {
        this.drawPlayer(nextProps, nextState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'player-layer',
        className: 'player-layer',
        width: size,
        height: size });
    }
  }]);

  return PlayerLayer;
}(React.Component);

//props: boardSize, gameLevel, hero, playerArr, updatePlayerArr


var GameStage = function (_React$Component10) {
  _inherits(GameStage, _React$Component10);

  function GameStage(props) {
    _classCallCheck(this, GameStage);

    var _this10 = _possibleConstructorReturn(this, (GameStage.__proto__ || Object.getPrototypeOf(GameStage)).call(this, props));

    _this10.updateBgArr = _this10.updateBgArr.bind(_this10);
    _this10.handleKeyDown = _this10.handleKeyDown.bind(_this10);

    _this10.state = {
      stageSize: 480,
      tileSize: 32,
      bgArr: [],
      floorCoords: [],
      hWallCoords: [],
      vWallCoords: []
    };
    return _this10;
  }

  _createClass(GameStage, [{
    key: 'updateBgArr',
    value: function updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords) {
      this.setState({ bgArr: bgArr, floorCoords: floorCoords, hWallCoords: hWallCoords, vWallCoords: vWallCoords });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var el = e.nativeEvent.code,
          arr = this.props.playerArr,
          func = this.props.updatePlayerArr,
          len = this.props.boardSize - 1;

      if ((el === 'ArrowUp' || el === 'KeyW') && arr[0] > 0) arr[0]--, func(arr);else if ((el === 'ArrowRight' || el === 'KeyD') && arr[1] < len) arr[1]++, func(arr);else if ((el === 'ArrowDown' || el === 'KeyS') && arr[0] < len) arr[0]++, func(arr);else if ((el === 'ArrowLeft' || el === 'KeyA') && arr[1] > 0) arr[1]--, func(arr);
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

var Game = function (_React$Component11) {
  _inherits(Game, _React$Component11);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this11 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this11.updatePlayerArr = _this11.updatePlayerArr.bind(_this11);

    _this11.state = {
      boardSize: 120,
      gameLevel: 1,
      hero: 'Rogue',
      playerArr: []
    };
    return _this11;
  }

  _createClass(Game, [{
    key: 'updatePlayerArr',
    value: function updatePlayerArr(playerArr) {
      this.setState({ playerArr: playerArr });
    }
  }, {
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
          React.createElement(GameStage, {
            boardSize: this.state.boardSize,
            gameLevel: this.state.gameLevel,
            hero: this.state.hero,
            playerArr: this.state.playerArr,
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


var PageHeader = function (_React$Component12) {
  _inherits(PageHeader, _React$Component12);

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


var PageFooter = function (_React$Component13) {
  _inherits(PageFooter, _React$Component13);

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


var App = function (_React$Component14) {
  _inherits(App, _React$Component14);

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