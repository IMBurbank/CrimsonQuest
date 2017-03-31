const roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
};

/**
  * Helper Functions
  */

const randInt = function randomIntFromRange(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
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
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
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
  floorExtendArr[0].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = 1;
  });
  floorExtendArr[1].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + xFloorMin + i] = 1;
  });
  floorExtendArr[2].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + yFloorMin + i][xPadL + index] = 1;
  });
  floorExtendArr[3].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = 1;
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
        roomFloorArr[i][j] = 1;
      } else {
        roomFloorArr[i][j] = 0;
      }
    }
  }

  //Extend top, right, bottom, left floor edges per floorExtendArr
  (sidesToExtend[0] && floorExtendArr[0].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT - 1 - i][xPadL + index] = 1;
  }));
  (sidesToExtend[1] && floorExtendArr[1].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL + w + i] = 1;
  }));
  (sidesToExtend[2] && floorExtendArr[2].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + h + i][xPadL + index] = 1;
  }));
  (sidesToExtend[3] && floorExtendArr[3].forEach( (el, index) => {
    for (i = 0; i < el; i++) roomFloorArr[yPadT + index][xPadL - 1 - i] = 1;
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
    this.createPaths = this.createPaths.bind(this);

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
          connections: [0,0,0,0]
        };
      }

      return rmsRow;
    });
    //console.log(JSON.stringify(rooms));
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
        //console.log('TEST2');
        //console.log(bgArr[r]);
        bgArr[r] = c === 0 ? rooms[k][i].roomFloorArr[j] : [...bgArr[r], ...rooms[k][i].roomFloorArr[j]];
        c += rooms[k][i].xMax;
        i++;
      }
      if (j === rooms[k][i - 1].yMax - 1) j = 0, k++;
      else j++;
      c = 0, i = 0;
      r++;
    }
    console.log(JSON.stringify(bgArr));
    return bgArr;
  }

  createPaths(rooms, bgArr) {

  }

  render() {
    const rooms = this.createFloors();
    const bgArr = this.stitchRooms(rooms);
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
