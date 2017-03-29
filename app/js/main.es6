const roomSize = {
  '2': { min: 15, max: 29 },
  '3': { min: 12, max: 18 },
  '4': { min: 9, max: 13 }
};

/**
  * Helper Functions
  */

const randInt = function randomIntFromRange(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const newRoomOne = function createNewRoomOne (rows, cols) {
  //Subtract two to leave room for permimeter walls
  const xMin = roomSize[cols].min - 2,
    xMax = roomSize[cols].max - 2,
    yMin = roomSize[rows].min - 2,
    yMax = roomSize[rows].max - 2,
    w = randInt(xMin, xMax),
    h = randInt(yMin, yMax),
    xOffset = randInt(0, xMax - w),
    yOffset = randInt(0, yMax - h),
    roomFloorArr = [];

  let i = 0,
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
    xOffset,
    yOffset,
    roomFloorArr,
    areaWidth: xMax,
    areaHeight: yMax,
    floorWidth: w,
    floorHeight: h
  };

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

class BackgroundLayer extends React.Component {
  constructor(props) {
    super(props);
    this.createRooms = this.createRooms.bind(this);
  }

  createRooms() {
    let rows = 0,
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

    rooms = cols.map((el, index) => {
      rmsRow = [];

      for (j = 0; j < el; j++) {
        rmsRow[j] = {
          rows,
          columns: el,
          roomType: randInt(1, 3)
        };
      }

      return rmsRow;
    });

    console.log('rooms: ', rooms);



  }

  render() {
    this.createRooms();
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
