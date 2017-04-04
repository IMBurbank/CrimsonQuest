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

const backgroundArray = function createBackgroundArray(arrSize) {
  const air = 10,
    flr = 40;

  //Random rectangle
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
          roomFloorArr[i][j] = flr;
        } else {
          roomFloorArr[i][j] = air;
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

  //Random out on each tile from min rectangle size
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

    //create arrays to extend min floor area
    floorExtendArr.length = 4;
    for (i = 0; i < 4; i++) {
      floorExtendArr[i] = [];

      if (i === 0) ext = yPadT - 2, s = xFloorMin;
      else if (i === 1) ext = xPadR - 2, s = yFloorMin;
      else if (i === 2) ext = yPadB - 2, s = xFloorMin;
      else ext = xPadL - 2, s = yFloorMin;

      for (j = 0; j < s; j++) floorExtendArr[i][j] = randInt(0, ext);
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
    floorExtendArr[0].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = flr;
    });
    floorExtendArr[1].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + xFloorMin + i] = flr;
    });
    floorExtendArr[2].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + yFloorMin + i][xPadL + index] = flr;
    });
    floorExtendArr[3].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = flr;
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

  //Random out from random sides of rectangle
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
          roomFloorArr[i][j] = flr;
        } else {
          roomFloorArr[i][j] = air;
        }
      }
    }

    //Extend top, right, bottom, left floor edges per floorExtendArr
    (sidesToExtend[0] && floorExtendArr[0].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = flr;
    }));
    (sidesToExtend[1] && floorExtendArr[1].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + w + i] = flr;
    }));
    (sidesToExtend[2] && floorExtendArr[2].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + h + i][xPadL + index] = flr;
    }));
    (sidesToExtend[3] && floorExtendArr[3].forEach( (el, index) => {
      for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = flr;
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

  const createRooms = function createNewRooms() {
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

  const stitchRooms = function stitchRoomArray(rooms) {
    const stitchArr = [],
      len = arrSize;

    let c = 0,
      i = 0,
      j = 0,
      k = 0,
      r = 0;

    stitchArr.length = len;
    while (r < len) {
      while (c < len) {
        stitchArr[r] = c === 0 ? rooms[k][i].roomFloorArr[j] :
          [...stitchArr[r], ...rooms[k][i].roomFloorArr[j]];
        c += rooms[k][i].xMax;
        i++;
      }
      if (j === rooms[k][i - 1].yMax - 1) j = 0, k++;
      else j++;
      c = 0, i = 0;
      r++;
    }
    return stitchArr;
  }

  const choosePaths = function newPaths(rm, rooms, stitchArr, chkRow, chkCol, tieRule, tiedRow) {
    const len = stitchArr.length,
      xMax = rm.xMax,
      yMax = rm.yMax;

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
              chkRow + j > len - 3 ||
              stitchArr[chkRow + j][k] === flr ||
              stitchArr[chkRow + j][k + 1] === flr ||
              stitchArr[chkRow + j + 1][k] === flr ||
              stitchArr[chkRow + j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * yMax && chkRow + j < len - 3) pathOpts.push([3, k, chkRow, j]);
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
              chkCol + j > len - 3 ||
              stitchArr[k][chkCol + j] === flr ||
              stitchArr[k - 1][chkCol + j] === flr ||
              stitchArr[k][chkCol + j + 1] === flr ||
              stitchArr[k + 1][chkCol + j] === flr)) {
              chk = true;
            }
          }
          if (j < 1.5 * xMax && chkCol + j < len - 3) pathOpts.push([2, chkCol, k, j]);
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

  const applyPaths = function applyNewPaths(rm, rooms, stitchArr, paths) {
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

  const createPaths = function createNewPaths(rooms, stitchArr) {
    const len = stitchArr.length;

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

    paths.length = ~~(len / 4);

    while (r < len) {
      while (c < len) {
        rm = rooms[j][i];
        chkRow = r + ~~(rm.yMax / 2);
        chkCol = c + ~~(rm.xMax / 2);
        tieRule = (j === 0 && i === 0) ? 1 :
          (j === 0 && i < rooms[j].length - 1) ? 2 :
          (j < rooms.length - 1 && i === rooms[j].length - 1) ? 3 :
          (j < rooms.length - 1 && i < rooms[j].length - 1) ? 4 :
          (j === rooms.length - 1 && i < rooms[j].length - 1) ? 5 : 6;

        ({paths, tiedRow} = choosePaths(rm, rooms, stitchArr, chkRow, chkCol, tieRule, tiedRow));
        applyPaths(rm, rooms, stitchArr, paths);

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

  const randomizeOrientation = function randomizeArrOrientation(connectedArr) {
    const len = connectedArr.length,
      orientation = randInt(1,4);

    let orientedArr = [],
      i = 0,
      j = 0;

    const transposed = function transposeSquareArr(arr) {
      const tArr = [],
        len = arr.length;

      while (i < len) {
        tArr[i] = [];
        j = 0;

        while (j < len) tArr[i][j] = arr[j][i], j++;
        i++;
      }
      return tArr;
    }

    if (orientation === 1 ) {
      orientedArr = [...connectedArr];
    }
    if (orientation === 2) { //Rotate +90 deg
      orientedArr = transposed(connectedArr);
      orientedArr.forEach( el => el.reverse() );
    } else if (orientation === 3) { //Rotate 180 deg
      while (i < len) {
        orientedArr[i] = connectedArr[len - 1 - i].reverse();
        i++;
      }
    } else if (orientation === 4) { //Rotate -90 deg
      connectedArr.forEach( el => el.reverse() );
      orientedArr = transposed(connectedArr);
    }
    return {orientation, orientedArr};
  }

  const addWalls = function addArrWalls(orientedArr) {
    const walledArr = orientedArr,
      nArr = [0,0,0,0,0,0,0,0],
      len = walledArr.length - 1;

    let hWallCoords = [],
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

          if (nArr.indexOf(flr) === 7 ||
            (nArr[1] === flr && nArr[3] === flr && nArr[4] !== flr && nArr[6] !== flr)) {
            el = 21;
          } else if ((nArr[3] !== flr && nArr[4] !== flr && (nArr[1] === flr || nArr[6] === flr)) ||
            ((nArr[1] === flr && nArr[6] === flr) &&
            ((nArr[3] === flr && nArr[4] !== flr) ||
            (nArr[4] === flr && nArr[3] !== flr)))) {
            el = 22;
            hWallCoords.push([i,j]);
          } else if ((nArr.filter( el => el === flr ).length === 1 && nArr[5] === flr) ||
            (nArr[1] === flr && nArr[4] === flr && nArr[3] !== flr && nArr[6] !== flr)) {
            el = 23;
          } else if ((nArr[1] !== flr && nArr[6] !== flr && (nArr[3] === flr || nArr[4] === flr)) ||
            ((nArr[3] === flr && nArr[4] === flr) &&
            ((nArr[1] === flr && nArr[6] !== flr) ||
            (nArr[6] === flr && nArr[1] !== flr)))) {
            el = 24;
            vWallCoords.push([i,j]);
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

          if (el) walledArr[i][j] = el;
        }
        j++;
      }
      i++;
    }

    return {walledArr, hWallCoords, vWallCoords};
  }

  const addFloors = function addArrFloors(walledArr) {
    const bgArr = walledArr,
      nArr = [0,0,0,0,0,0,0,0],
      len = bgArr.length - 1,
      sFlr = flr - 1;

    let floorCoords = [],
      i = 1,
      j = 1,
      el = 0;

    while (i < len) {
      j = 1;

      while (j < len) {
        el = 0;

        if (walledArr[i][j] > flr - 1) {
          nArr[0] = bgArr[i - 1][j - 1];
          nArr[1] = bgArr[i - 1][j];
          nArr[2] = bgArr[i - 1][j + 1];
          nArr[3] = bgArr[i][j - 1];
          nArr[4] = bgArr[i][j + 1];
          nArr[5] = bgArr[i + 1][j - 1];
          nArr[6] = bgArr[i + 1][j];
          nArr[7] = bgArr[i + 1][j + 1];
          floorCoords.push([i,j]);

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

    return {bgArr, floorCoords};
  }

  const rooms = createRooms();
  const stitchArr = stitchRooms(rooms);
  const connectedArr = createPaths(rooms, stitchArr);
  const {orientation, orientedArr} = randomizeOrientation(connectedArr);
  const {walledArr, hWallCoords, vWallCoords} = addWalls(orientedArr);
  const {bgArr, floorCoords} = addFloors(walledArr);

  console.log(orientation);
  console.log(JSON.stringify(bgArr));
  return {bgArr, floorCoords, hWallCoords, vWallCoords};
}

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

//props: stageSize, boardSize, tileSize, gameLevel, bgArr, updateBgArr
class BackgroundLayer extends React.Component {
  constructor(props) {
    super(props);
    this.getBgImages = this.getBgImages.bind(this);
    this.initPaletteMaps = this.initPaletteMaps.bind(this);
    this.setPalettes = this.setPalettes.bind(this);

    this.state = ({
      srcTileSize: 16,
      floorImage: null,
      wallImage: null,
      floorPalette: {},
      wallPalette: {},
      floorPaletteMap: {},
      wallPaletteMap: {},
    });
  }

  getBgImages() {
    const floorImage = new Image(),
      wallImage = new Image(),
      that = this;

    let i = 0;

    const handleLoad = function handleImageLoad() {
      i++;
      if (i === 2) {
        that.setState({ floorImage, wallImage });
      }
    }

    floorImage.src = 'img/terrain/Floor.png';
    wallImage.src = 'img/terrain/Wall.png';
    floorImage.addEventListener('load', handleLoad);
    wallImage.addEventListener('load', handleLoad);
  }

  initPaletteMaps() {
    const ts = this.props.tileSize;

    const floorPaletteMap = {
      '41': [0,0],
      '42': [ts, 0],
      '43': [2*ts, 0],
      '44': [0, ts],
      '45': [ts, ts],
      '46': [2*ts, ts],
      '47': [0, 2*ts],
      '48': [ts, 2*ts],
      '49': [2*ts, 2*ts],
      '51': [3*ts, 0],
      '52': [3*ts, ts],
      '53': [3*ts, 2*ts],
      '54': [4*ts, ts],
      '55': [5*ts, ts],
      '56': [6*ts, ts],
      '57': [5*ts, 0],
    };

    const wallPaletteMap = {
      '21': [0,0],
      '22': [ts, 0],
      '23': [2*ts, 0],
      '24': [0, ts],
      '25': [0, 2*ts],
      '26': [ts, ts],
      '27': [2*ts, 2*ts],
      '31': [4*ts, 0],
      '32': [3*ts, ts],
      '33': [4*ts, ts],
      '34': [5*ts, ts],
      '35': [4*ts, 2*ts],
      '36': [3*ts, 0],
    };

    this.setState({ floorPaletteMap, wallPaletteMap });
  }

  setPalettes() {
    const fSrcImg = this.state.floorImage,
      wSrcImg = this.state.wallImage,
      gmTileSize = this.props.tileSize,
      srcTileSize = this.state.srcTileSize,
      scale = gmTileSize / srcTileSize,
      h = 3 * gmTileSize,
      fw = 7 * gmTileSize,
      ww = 6 * gmTileSize;

    let fCanvas = document.createElement('canvas'),
      fCtx = fCanvas.getContext('2d'),
      wCanvas = document.createElement('canvas'),
      wCtx = fCanvas.getContext('2d'),
      srcY = 3 * srcTileSize;

    srcY *= lvl === 1 ? 5 :
      lvl === 2 ? 6 :
      lvl === 3 ? 7 :
      lvl === 4 ? 8 :
      lvl === 5 ? 1 :
      lvl < 8 ? 2 :
      lvl < 10 ? 3 :
      lvl === 10 ? 4 : 1;

    fCanvas.width = fw;
    fCanvas.height = h;
    fCtx.drawImage(fSrcImg, 0, srcY, fw/scale, h/scale, 0, 0, w, h);

    wCanvas.width = ww;
    wCanvas.height = h;
    wCtx.drawImage(wSrcImg, 0, srcY, ww/scale, h/scale, 0, 0, w, h);

    this.setState({
      floorPalette: { canvas: fCanvas, ctx: fCtx },
      wallPalette: { canvas: wCanvas, ctx: wCtx }
    });
    this.updatePaletteMaps()
  }

  componentWillMount() {
    this.getBgImages();
    this.initPaletteMaps();
    this.props.updateBgArr(backgroundArray(this.props.boardSize));
  }

  componentWillRecieveProps(nextProps) {
    if (this.props.gameLevel !== nextProps.gameLevel && nextProps.gameLevel !== 0) {
      this.props.updateBgArr(backgroundArray(this.props.boardSize));
      this.setPalettes();
    }
  }

  render() {
    return (
      <div className = 'backgroundLayer'>

      </div>
    );
  }
}

//props: stageSize, boardSize, tileSize, gameLevel, bgArr, updateBgArr, floorCoords
class PlayerLayer extends React.Component {
  constructor(props) {
    super(props);
    //this.initPlayerArr = this.initPlayerArr.bind(this);

  }

  render() {
    return (
      <div className = 'player-layer'>

      </div>
    );
  }
}

//props: boardSize, gameLevel
class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.updateBgArr = this.updateBgArr.bind(this);

    this.state = ({
      stageSize: 480,
      tileSize: 32,
      bgArr: [],
      floorCoords: [],
      hWallCoords: [],
      vWallCoords: []
    });
  }

  updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords) {
    this.setState({ bgArr, floorCoords, hWallCoords, vWallCoords });
  }

  render() {
    return (
      <div className='stage'>
        <BackgroundLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.state.bgArr}
          updateBgArr = {this.updateBgArr}  />
        {/*<AccentLayer	/>*/}
        {/*<ItemLayer	/>*/}
        {/*<EnemyLayer	/>*/}
        {/*<FogLayer	/>*/}
        <PlayerLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.state.bgArr}
          updateBgArr = {this.updateBgArr}
          floorCoords = {this.state.floorCoords}  />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      boardSize: 120,
      gameLevel: 0
    });
  }

  render() {
    return (
      <div className='game'>
        <div className='col-lft'>
          <GameLevel />
          <CharacterInfo/>
        </div>
        <div className='col-mid'>
          <div className='title'>CrimsonQuest</div>
          <GameStage
            boardSize =  {this.state.boardSize}
            gameLevel =  {this.state.gameLevel} />
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
