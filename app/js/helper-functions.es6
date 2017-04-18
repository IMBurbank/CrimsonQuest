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

const initZeroArray = function initZeroFilledArray(len) {
  let arr = [], i = 0, j = 0;

  arr.length = len;
  while (i < len) {
    arr[i] = [];
    arr[i].length = len;
    while (j < len) arr[i][j] = 0, j++;
    j = 0, i++;
  }
  return arr;
}

const initMemCanvas = function initCanvasToPointer(w, h, smoothing) {
  let tempCanv = document.createElement('canvas'),
    ctx = tempCanv.getContext('2d');

  tempCanv.width = w;
  tempCanv.height = h;
  ctx.imageSmoothingEnabled = smoothing;

  return tempCanv;
}

const calcRenderPadding = function calcCanvasRenderPadding(playerArr, aLen, rLen) {
  let sr = 0,
    pr = 0,
    sc = 0,
    pc = 0;

  if (playerArr[0] - ~~(rLen / 2) < 0) {
    sr = 0;
    pr = -1 * (playerArr[0] - ~~(rLen / 2));
  } else if (playerArr[0] + ~~(rLen / 2) + 1 > aLen) {
    pr =  playerArr[0] + ~~(rLen / 2) + 1 - aLen;
    sr = aLen - rLen + pr;
  } else {
    sr = playerArr[0] - ~~(rLen / 2);
    pr = 0;
  }
  if (playerArr[1] - ~~(rLen / 2) < 0) {
    sc = 0;
    pc = -1 * (playerArr[1] - ~~(rLen / 2));
  } else if (playerArr[1] + ~~(rLen / 2) + 1 > aLen ) {
    pc =  playerArr[1] + ~~(rLen / 2) + 1 - aLen;
    sc = aLen - rLen + pc;
  } else {
    sc = playerArr[1] - ~~(rLen / 2);
    pc = 0;
  }

  return { sr, sc, pr, pc };
}

const setRenderArr = function setCanvasRenderArr(arr, rLen, padding) {
  let renderArr = [],
    sr = padding.sr,
    sc = padding.sc,
    i = 0,
    j = 0,
    m = 0,
    n = 0;

  m = rLen - padding.pr;
  n = rLen - padding.pc;
  renderArr.length = m;

  for (; i < m; i++) {
    renderArr[i] = [];
    renderArr[i].length

    for (j = 0, n; j < n; j++) renderArr[i][j] = arr[sr + i][sc + j];
  }

  return renderArr;
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
              (j > 2 * yMax ||
              chkRow - j < 2 ||
              stitchArr[chkRow - j][k] === flr ||
              stitchArr[chkRow - j - 1][k] === flr ||
              stitchArr[chkRow - j][k + 1] === flr ||
              stitchArr[chkRow - j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * yMax && chkRow - j > 1) pathOpts.push([1, k, chkRow, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        goRt = true;
        try { throw new devError('No pathOpts up. Set right. -> BackgroundLayer.choosePaths'); }
        catch(e) { console.log(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule); }
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
              (j > 2 * yMax ||
              chkRow + j > len - 3 ||
              stitchArr[chkRow + j][k] === flr ||
              stitchArr[chkRow + j][k + 1] === flr ||
              stitchArr[chkRow + j + 1][k] === flr ||
              stitchArr[chkRow + j][k - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * yMax && chkRow + j < len - 3) pathOpts.push([3, k, chkRow, j]);
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
              (j > 2 * xMax ||
              chkCol + j > len - 3 ||
              stitchArr[k][chkCol + j] === flr ||
              stitchArr[k - 1][chkCol + j] === flr ||
              stitchArr[k][chkCol + j + 1] === flr ||
              stitchArr[k + 1][chkCol + j] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * xMax && chkCol + j < len - 3) pathOpts.push([2, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        try { throw new devError('no pathOpts right -> BackgroundLayer.choosePaths'); }
        catch(e) { console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule); }
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
              (j > 2 * xMax ||
              chkCol - j < 2  ||
              stitchArr[k][chkCol - j] === flr ||
              stitchArr[k - 1][chkCol - j] === flr ||
              stitchArr[k + 1][chkCol - j] === flr ||
              stitchArr[k][chkCol - j - 1] === flr)) {
              chk = true;
            }
          }
          if (j < 2 * xMax && chkCol - j > 1) pathOpts.push([4, chkCol, k, j]);
        }
        i++;
      }
      if (pathOpts.length > 0) paths.push(pathOpts[randInt(0, pathOpts.length - 1)]);
      else {
        try { throw new devError('no pathOpts left -> BackgroundLayer.choosePaths'); }
        catch(e) { console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule); }
      }
    }

    if (paths.length === 1) paths.push([0,0,0,0]);
    else if (paths.length > 2) {
      try { throw new devError('paths.length > 2 -> BackgroundLayer.choosePaths'); }
      catch(e) { console.error(e.name, e.message, e.stack, chkRow, chkCol, rm.curRow, tieRule); }
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

    let i = 1,
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
            if (nArr[3] > air && nArr[3] < flr &&
              nArr[4] === air &&
              nArr[6] === air &&
              (nArr[1] === air || nArr[1] === flr) &&
              ((nArr[5] === flr && nArr[7] === flr) ||
              (nArr[1] === flr &&
              (nArr[5] === flr || nArr[7] === flr)))) {
              el = 31;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[4] === air &&
              nArr[6] === air &&
              ((nArr[2] === flr && nArr[7] === flr) ||
              (nArr[3] === flr &&
              (nArr[2] === flr || nArr[7] === flr)))) {
              el = 32;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[3] > air && nArr[3] < flr &&
              nArr[4] === air &&
              nArr[6] === air &&
              nArr[2] === flr &&
              nArr[7] === flr) {
              el = 33;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[3] > air && nArr[3] < flr &&
              nArr[6] === air &&
              ((nArr[0] === flr && nArr[5] === flr) ||
              ((nArr[0] === flr || nArr[5] === flr) &&
              nArr[4] === flr))) {
              el = 34;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[3] > air && nArr[3] < flr &&
              nArr[4] === air &&
              ((nArr[0] === flr && nArr[2] === flr) ||
              (nArr[0] === flr || nArr[2] === flr) && nArr[6] === flr)) {
              el = 35;
            } else if (nArr[4] === air && nArr[6] === air &&
              ((nArr[1] === flr && nArr[3] === flr) || nArr[7] === flr)) {
              el = 21;
            } else if (nArr[3] > air && nArr[3] < flr &&
              nArr[6] === air &&
              ((nArr[1] === flr && nArr[4] === flr) || nArr[5] === flr)) {
              el = 23;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[4] === air &&
              ((nArr[3] === flr && nArr[6] === flr) || nArr[2] === flr)) {
              el = 25;
            } else if (nArr[1] > air && nArr[1] < flr &&
              nArr[3] > air && nArr[3] < flr &&
              (nArr[0] === flr || (nArr[4] === flr && nArr[6] === flr))) {
              el = 27;
            } else if ((nArr[3] > air && nArr[3] < flr && (nArr[1] === flr || nArr[6] === flr)) ||
              (nArr[4] === air &&
              ((nArr[1] === flr && nArr[2] === flr) || (nArr[5] === flr && nArr[6] === flr)))) {
              el = 22;
            } else if ((nArr[1] > air && nArr[1] < flr) ||
              (nArr[6] === air && (nArr[3] === flr || nArr[4] === flr))) {
              el = 24;
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

    return walledArr;
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

        if (walledArr[i][j] > sFlr) {
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
  const walledArr = addWalls(orientedArr);
  const {bgArr, floorCoords} = addFloors(walledArr);

  return { bgArr, floorCoords };
}
