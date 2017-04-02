const roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
};

/**
  * Helper Functions
  */

const randInt = function randomIntFromRange(min, max) {
  return ~~(min + Math.random() * (max - min + 1));
}

const devError = function createDevError(message = 'Default Error') {
  this.name = 'DevError';
  this.message = message;
  this.stack = (new Error()).stack;
}

//Rectangular
const newRoomOne = function createNewRoomOne (rows, cols) {
  const xMin = roomSize[cols].min,
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

  let i = 0, j = 0;

  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];
    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + w && i + 1 > yPadT && i < yPadT + h) {
        roomFloorArr[i][j] = 40;
      } else {
        roomFloorArr[i][j] = 10;
      }
    }
  }

  return {
    xPadL,
    xPadR,
    yPadT,
    yPadB,
    xMax,
    yMax,
    roomFloorArr
  };
}

//random out on each tile from min rectangle size
const newRoomTwo = function createNewRoomTwo(rows, cols) {
  //Subtract two to leave room for permimeter walls
  const xMin = roomSize[cols].min,
    xMax = roomSize[cols].max,
    yMin = roomSize[rows].min,
    yMax = roomSize[rows].max,
    xFloorMin = xMin - 4,
    yFloorMin = yMin - 4;

  let xPadL = randInt(2, xMax - xFloorMin - 2),
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

    if (i === 0) ext = yPadT - 2, s = xFloorMin;
    else if (i === 1) ext = xPadR - 2, s = yFloorMin;
    else if (i === 2) ext = yPadB - 2, s = xFloorMin;
    else ext = xPadL - 2, s = yFloorMin;

    for (j = 0; j < s; j++) floorExtendArr[i][j] = randInt(0, ext);
  }

  //Set min floor size to 40's in roomFloorArr
  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];

    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + xFloorMin && i + 1 > yPadT && i < yPadT + yFloorMin) {
        roomFloorArr[i][j] = 40;
      } else {
        roomFloorArr[i][j] = 10;
      }
    }
  }

  //Extend top, right, bottom, left floor edges per floorExtendArr
  floorExtendArr[0].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = 40;
  });
  floorExtendArr[1].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + xFloorMin + i] = 40;
  });
  floorExtendArr[2].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + yFloorMin + i][xPadL + index] = 40;
  });
  floorExtendArr[3].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = 40;
  });

  yPadT = yPadT - Math.max(...floorExtendArr[0]);
  xPadR = xPadR - Math.max(...floorExtendArr[1]);
  yPadB = yPadB - Math.max(...floorExtendArr[2]);
  xPadL = xPadL - Math.max(...floorExtendArr[3]);

  return {
    xPadL,
    xPadR,
    yPadT,
    yPadB,
    xMax,
    yMax,
    roomFloorArr
  };
}

const newRoomThree = function createNewRoomThree(rows, cols) {
  const xMin = roomSize[cols].min,
    xMax = roomSize[cols].max,
    yMin = roomSize[rows].min,
    yMax = roomSize[rows].max,
    xFloorMax = xMax - 4,
    xFloorMin = xMin - 4,
    yFloorMax = yMax - 4,
    yFloorMin = yMin - 4,
    w = randInt(xFloorMin, xFloorMax),
    h = randInt(yFloorMin, yFloorMax),
    sidesToExtend = [randInt(0,1), randInt(0,1), randInt(0,1), randInt(0,1)];

  let xPadL = randInt(2, xMax - w - 2),
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

    if (i === 0) ext = yPadT - 2, s = w;
    else if (i === 1) ext = xPadR - 2, s = h;
    else if (i === 2) ext = yPadB - 2, s = w;
    else ext = xPadL - 2, s = h;

    for (j = 0; j < s; j++) floorExtendArr[i][j] = randInt(0, ext);
  }

  //Set min floor size to 1's in roomFloorArr
  roomFloorArr.length = yMax;
  for (i = 0; i < yMax; i++) {
    roomFloorArr[i] = [];

    for (j = 0; j < xMax; j++) {
      if (j + 1 > xPadL && j < xPadL + w && i + 1 > yPadT && i < yPadT + h) {
        roomFloorArr[i][j] = 40;
      } else {
        roomFloorArr[i][j] = 10;
      }
    }
  }

  //Extend top, right, bottom, left floor edges per floorExtendArr
  (sidesToExtend[0] && floorExtendArr[0].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = 40;
  }));
  (sidesToExtend[1] && floorExtendArr[1].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + w + i] = 40;
  }));
  (sidesToExtend[2] && floorExtendArr[2].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + h + i][xPadL + index] = 40;
  }));
  (sidesToExtend[3] && floorExtendArr[3].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = 40;
  }));

  yPadT = sidesToExtend[0] ? yPadT - Math.max(...floorExtendArr[0]) : yPadT;
  xPadR = sidesToExtend[1] ? xPadR - Math.max(...floorExtendArr[1]) : xPadR;
  yPadB = sidesToExtend[2] ? yPadB - Math.max(...floorExtendArr[2]) : yPadB;
  xPadL = sidesToExtend[3] ? xPadL - Math.max(...floorExtendArr[3]) : xPadL;

  return {
    xPadL,
    xPadR,
    yPadT,
    yPadB,
    xMax,
    yMax,
    roomFloorArr
  };

};

/**
  * React Components
  */

class GameLevel extends React.Component {
  render() {
    return (
      <div className='level'>
        Game Level
      </div>
    );
  }
}

class CharacterInfo extends React.Component {
  render() {
    return (
      <div className='char-info'>
        Character Info
      </div>
    );
  }
}

class GameItems extends React.Component {
  render() {
    return (
      <div className='items'>
        Game Items
      </div>
    );
  }
}

class EnemiesRemaining extends React.Component {
  render() {
    return (
      <div className='enemies-remaining'>
        Enemies Remaining
      </div>
    );
  }
}

class EnemyStats extends React.Component {
  render() {
    return (
      <div className='enemy-stats'>
        Enemy Stats
      </div>
    );
  }
}

class ActivityLog extends React.Component {
  render() {
    return (
      <div className='activity-log'>
        Activity Log
      </div>
    );
  }
}

class GameTips extends React.Component {
  render() {
    return (
      <div className='tips'>
        Game Tips
      </div>
    );
  }
}

class BackgroundLayer extends React.Component {
  constructor(props) {
    super(props);
    this.createFloors = this.createFloors.bind(this);
    this.stitchRooms = this.stitchRooms.bind(this);
    this.choosePaths = this.choosePaths.bind(this);
    this.applyPaths = this.applyPaths.bind(this);
    this.createPaths = this.createPaths.bind(this);
    this.randomizeOrientation = this.randomizeOrientation.bind(this);
    this.addWalls = this.addWalls.bind(this);
    this.addFloors = this.addFloors.bind(this);


    this.state = ({
      boardSize: 120,
      bgArr: []
    });
  }

  createFloors() {
    let rows = 0,
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

    rooms = colsArr.map((el, index) => {
      rmsRow = [];

      for (j = 0; j < el; j++) {
        roomType = randInt(1, 10);
        cols = el;

        if (roomType === 1) {
          ({xPadL, xPadR, yPadT, yPadB, xMax, yMax, roomFloorArr} = newRoomOne(rows,cols));
        } else if (roomType > 1 && roomType < 8) {
          ({xPadL, xPadR, yPadT, yPadB, xMax, yMax, roomFloorArr} = newRoomTwo(rows,cols));
        } else {
          ({xPadL, xPadR, yPadT, yPadB, xMax, yMax, roomFloorArr} = newRoomThree(rows,cols));
        }

        rmsRow[j] = {
          rows,
          cols,
          xPadL,
          xPadR,
          yPadT,
          yPadB,
          xMax,
          yMax,
          roomFloorArr,
          cnxns: [0,0,0,0],
          curRow: index,
        };
      }

      return rmsRow;
    });
    return rooms;
  }

  stitchRooms(rooms) {
    const bgArr = [],
      boardSize = this.state.boardSize;

    let c = 0,
      i = 0,
      j = 0,
      k = 0,
      r = 0;

    bgArr.length = boardSize;
    while (r < boardSize) {
      while (c < boardSize) {
        bgArr[r] = c === 0 ? rooms[k][i].roomFloorArr[j] :
          [...bgArr[r], ...rooms[k][i].roomFloorArr[j]];
        c += rooms[k][i].xMax;
        i++;
      }
      if (j === rooms[k][i - 1].yMax - 1) j = 0, k++;
      else j++;
      c = 0, i = 0;
      r++;
    }
    return bgArr;
  }

  choosePaths(rm, stitchArr, rooms, chkRow, chkCol, tieRule, tiedRow) {
    const boardSize = this.state.boardSize,
      xMax = rm.xMax,
      yMax = rm.yMax,
      flr = 40;

    let pathOpts = [],
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

    if (tieRule === 1 || (tieRule === 2 && rm.cnxns[3]) || (tieRule === 4 && rm.cnxns[0])) {
      val = randInt(1,3);
      goRt = (val === 1 || val === 3) ? true : false;
      goDn = (val === 2 || val === 3) ? true : false;
    } else if (tieRule === 2) {
      goRt = randInt(0, 1) ? true : false;
      goDn = true;
    } else if (tieRule === 3) {
      goDn = (!rm.cnxns[3] || !tiedRow || randInt(0,1)) ? true : false;
    } else if (tieRule === 4) {
      goRt = true;
      goDn = randInt(0,1) ? true : false;
    } else if (tieRule === 5) {
      goRt = (!rm.cnxns[0] ||
        !rooms[rm.curRow - 1][~~(chkCol / rooms[rm.curRow - 1][0].xMax)].cnxns[1] ||
        randInt(0,1)) ? true :
        false;
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

            if (j > ~~(yMax / 2) &&
              (j > 1.5 * yMax ||
              chkRow - j < 2 ||
              stitchArr[chkRow - j][k] === flr ||
              stitchArr[chkRow - j - 1][k] === flr ||
              stitchArr[chkRow - j][k + 1] === flr ||
              stitchArr[chkRow - j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * yMax && chkRow - j > 1) pathOpts.push([1, k, chkRow, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        goRt = true;
        try { throw new devError('No pathOpts up. Set right. -> BackgroundLayer.choosePaths'); }
        catch(e) { console.log(e.name, e.message, e.stack); }
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

            if (j > ~~(yMax / 2) &&
              (j > 1.5 * yMax ||
              chkRow + j > boardSize - 3 ||
              stitchArr[chkRow + j][k] === flr ||
              stitchArr[chkRow + j][k + 1] === flr ||
              stitchArr[chkRow + j + 1][k] === flr ||
              stitchArr[chkRow + j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * yMax && chkRow + j < boardSize - 3) pathOpts.push([3, k, chkRow, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        goRt = true;
        try { throw new devError('No pathOpts down. Set right. -> BackgroundLayer.choosePaths'); }
        catch(e) { console.log(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule); }
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

            if (j > ~~(xMax / 2) &&
              (j > 1.5 * xMax ||
              chkCol + j > boardSize - 3 ||
              stitchArr[k][chkCol + j] === flr ||
              stitchArr[k - 1][chkCol + j] === flr ||
              stitchArr[k][chkCol + j + 1] === flr ||
              stitchArr[k + 1][chkCol + j] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * xMax && chkCol + j < boardSize - 3) pathOpts.push([2, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        try { throw new devError('no pathOpts right -> BackgroundLayer.choosePaths'); }
        catch(e) { console.error(e.name, e.message, e.stack); }
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

            if (j > ~~(yMax / 2) &&
              (j > 1.5 * xMax ||
              chkCol - j < 2  ||
              stitchArr[k][chkCol - j] === flr ||
              stitchArr[k - 1][chkCol - j] === flr ||
              stitchArr[k + 1][chkCol - j] === flr ||
              stitchArr[k][chkCol - j - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * xMax && chkCol - j > 1) pathOpts.push([4, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        try { throw new devError('no pathOpts left -> BackgroundLayer.choosePaths'); }
        catch(e) { console.error(e.name, e.message, e.stack); }
      }
    }

    if (paths.length === 1) paths.push([0,0,0,0]);
    else if (paths.length > 2) {
      try { throw new devError('paths.length > 2 -> BackgroundLayer.choosePaths'); }
      catch(e) { console.error(e.name, e.message, e.stack); }
    }

    return {paths, tiedRow};
  }

  applyPaths(rm, stitchArr, rooms, paths) {
    const flr = 40;
    let i = 0;

    paths.forEach( el => {
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
  }

  createPaths(rooms, stitchArr) {
    const boardSize = this.state.boardSize;

    let tiedRow = false,
      paths = [],
      rm, //{} pointer
      chkRow = 0,
      chkCol = 0,
      tieRule = 0,
      r = 0,
      c = 0,
      i = 0,
      j = 0;

    paths.length = ~~(boardSize / 4);

    while (r < boardSize) {
      while (c < boardSize) {
        rm = rooms[j][i];
        chkRow = r + ~~(rm.yMax / 2);
        chkCol = c + ~~(rm.xMax / 2);
        tieRule = (j === 0 && i === 0) ? 1 :
          (j === 0 && i < rooms[j].length - 1) ? 2 :
          (j < rooms.length - 1 && i === rooms[j].length - 1) ? 3 :
          (j < rooms.length - 1 && i < rooms[j].length - 1) ? 4 :
          (j === rooms.length - 1 && i < rooms[j].length - 1) ? 5 : 6;

        ({paths, tiedRow} = this.choosePaths(rm, stitchArr, rooms, chkRow, chkCol, tieRule, tiedRow));
        this.applyPaths(rm, stitchArr, rooms, paths);

        c += rm.xMax
        i++;
      }
      r += rooms[j][i - 1].yMax;
      j++;
      tiedRow = false;
      c = 0;
      i = 0;
    }

    return stitchArr;
  }

  randomizeOrientation(connectedArr) {
    const boardSize = this.state.boardSize,
      orientation = randInt(3,4);

    let orientedArr = [...connectedArr],
      i = 0,
      j = 0;

    //Set orientation to randInt(1,4) when mapings work
    /*
    if (orientation === 2) {
      i = boardSize - 1;
      while (i > -1) {
        j = 0;
        while (j < boardSize) {
          arr[boardSize - i - 1][j] = connectedArr[j][i];
          j++;
        }
        i--;
      }
    } else */if (orientation === 3) {
      i = boardSize - 1;
      while (i > -1) {
        orientedArr[boardSize - i - 1] = connectedArr[i].reverse();
        i--;
      }
    }/* else if (orientation === 4) {
      i = 0;
      while (i < boardSize) {
        j = boardSize - 1;
        while (j > -1) {
          arr[i][boardSize - j - 1] = connectedArr[j][i];
          j--;
        }
        i++;
      }
    }
    */

    return {orientation, orientedArr};
  }

  addWalls(orientedArr) {
    const nArr = [0,0,0,0,0,0,0,0],
      boardSize = this.state.boardSize - 1,
      flr = 40,
      air = 10;

    let i = 1,
      j = 1,
      el = 0;


    while (i < boardSize) {
      j = 1;

      while (j < boardSize) {
        el = 0;

        if (orientedArr[i][j] === air) {
          nArr[0] = orientedArr[i - 1][j - 1];
          nArr[1] = orientedArr[i - 1][j];
          nArr[2] = orientedArr[i - 1][j + 1];
          nArr[3] = orientedArr[i][j - 1];
          nArr[4] = orientedArr[i][j + 1];
          nArr[5] = orientedArr[i + 1][j - 1];
          nArr[6] = orientedArr[i + 1][j];
          nArr[7] = orientedArr[i + 1][j + 1];

          if (nArr.indexOf(flr) === 7 ||
            (nArr[1] === flr && nArr[3] === flr && nArr[4] !== flr && nArr[6] !== flr)) {
            el = 21;
          } else if ((nArr[3] !== flr && nArr[4] !== flr && (nArr[1] === flr || nArr[6] === flr)) ||
            ((nArr[1] === flr && nArr[6] === flr) &&
            ((nArr[3] === flr && nArr[4] !== flr) ||
            (nArr[4] === flr && nArr[3] !== flr)))) {
            el = 22;
          } else if ((nArr.filter( el => el === flr ).length === 1 && nArr[5] === flr) ||
            (nArr[1] === flr && nArr[4] === flr && nArr[3] !== flr && nArr[6] !== flr)) {
            el = 23;
          } else if ((nArr[1] !== flr && nArr[6] !== flr && (nArr[3] === flr || nArr[4] === flr)) ||
            ((nArr[3] === flr && nArr[4] === flr) &&
            ((nArr[1] === flr && nArr[6] !== flr) ||
            (nArr[6] === flr && nArr[1] !== flr)))) {
            el = 24;
          } else if ((nArr.filter( el => el === flr ).length === 1 && nArr[2] === flr) ||
            (nArr[3] === flr && nArr[6] === flr && nArr[1] !== flr && nArr[4] !== flr)) {
            el = 25;
          } else if (nArr.filter( el => el === flr ).length === 8) {
            el = 26;
          } else if ((nArr.filter( el => el === flr ).length === 1 && nArr[0] === flr) ||
            (nArr[6] === flr && nArr[4] === flr && nArr[1] !== flr && nArr[3] !== flr)) {
            el = 27;
          } else if (nArr.filter( el => el === flr ).length === 2 && nArr[5] === flr && nArr[7] === flr) {
            el = 31;
          } else if (nArr.filter( el => el === flr ).length === 2 && nArr[2] === flr && nArr[7] === flr) {
            el = 32;
          } else if (nArr.filter( el => el === flr ).length === 4 &&
            nArr[0] === flr &&
            nArr[2] === flr &&
            nArr[5] === flr &&
            nArr[7] === flr) {
            el = 33;
          } else if (nArr.filter( el => el === flr ).length === 2 && nArr[0] === flr && nArr[5] === flr) {
            el = 34;
          } else if (nArr.filter( el => el === flr ).length === 2 && nArr[0] === flr && nArr[2] === flr) {
            el = 35;
          }

          if (el) orientedArr[i][j] = el;
        }
        j++;
      }
      i++;
    }

    return orientedArr;
  }

  addFloors(walledArr) {
    const nArr = [0,0,0,0,0,0,0,0],
      boardSize = this.state.boardSize - 1,
      flr = 40,
      sFlr = flr - 1;

    let i = 1,
      j = 1,
      el = 0;

    while (i < boardSize) {
      j = 1;

      while (j < boardSize) {
        el = 0;

        if (walledArr[i][j] > flr - 1) {
          nArr[0] = walledArr[i - 1][j - 1];
          nArr[1] = walledArr[i - 1][j];
          nArr[2] = walledArr[i - 1][j + 1];
          nArr[3] = walledArr[i][j - 1];
          nArr[4] = walledArr[i][j + 1];
          nArr[5] = walledArr[i + 1][j - 1];
          nArr[6] = walledArr[i + 1][j];
          nArr[7] = walledArr[i + 1][j + 1];

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

          if (el) walledArr[i][j] = el;
        }
        j++;
      }
      i++;
    }

    return walledArr;
  }

  render() {
    const rooms = this.createFloors();
    const stitchArr = this.stitchRooms(rooms);
    const connectedArr = this.createPaths(rooms, stitchArr);
    //Use to compare random orientations
    //console.log(JSON.stringify(connectedArr));

    const {orientation, orientedArr} = this.randomizeOrientation(connectedArr);
    const walledArr = this.addWalls(orientedArr);
    const bgArr = this.addFloors(walledArr);

    console.log(JSON.stringify(bgArr));

    return (
      <div></div>
    );
  }
}

class GameStage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='stage'>
        <BackgroundLayer/> {/*<AccentLayer	/>*/}
        {/*<ItemLayer	/>*/}
        {/*<EnemyLayer	/>*/}
        {/*<FogLayer	/>*/}
        {/*<PlayerLayer	/>*/}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className='game'>
        <div className='col-lft'>
          <GameLevel/>
          <CharacterInfo/>
        </div>
        <div className='col-mid'>
          <div className='title'>CrimsonQuest</div>
          <GameStage/>
          <GameItems/>
        </div>
        <div className='col-rgt'>
          <EnemiesRemaining/>
          <EnemyStats/>
          <ActivityLog/>
          <GameTips/>
        </div>
      </div>
    );
  }
}

/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/
class PageHeader extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className='pg-header'>
        <h1>CrimsonQuest</h1>
      </div>
    );
  }
}

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/
class PageFooter extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className='pg-footer'>
        <span>© 2017 Isaac Burbank.</span>
        <span>
          Tiles By&nbsp;
          <a href='http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181' target='_blank'>
            DragonDePlatino
          </a>
        </span>
      </div>
    );
  }
}

/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/
class App extends React.Component {
  render() {
    return (
      <div className='pg'>
        <PageHeader/>
        <div className='pg-content'>
          <Game/>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/
ReactDOM.render(
  <App/>, document.getElementById('root'))
