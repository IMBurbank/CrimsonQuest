const roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.updateBgArr = this.updateBgArr.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updatePlayerArr = this.updatePlayerArr.bind(this);

    this.state = ({
      boardSize: 120,
      floor: 40,
      gameLevel: 1,
      hero: 'Paladin',
      playerArr: [],
      bgArr: [],
      floorCoords: [],
      interactItem: {count: 0, type: '', item: {}},
      //type: pickup, use, equip, unequip, buy, sell
      initAttack: {count: 0, stats: {}, coords: {}},
      attackRound: {count: 0, attacks: []},
      enemyDead: {count: 0, enemy: {}},
      playerDead: false,
    });
  }

  updateBgArr(bgArr, floorCoords) {
    this.setState({ bgArr, floorCoords });
  }

  updatePlayerArr(playerArr) {
    this.setState({ playerArr: [...playerArr] });
  }

  handleKeyDown(e) {
    const el = e.nativeEvent.code,
      arr = this.state.playerArr,
      bg = this.state.bgArr,
      flr = this.state.floor,
      len = this.state.boardSize - 1;

    let r = arr[0],
      c = arr[1];

    if ((el === 'ArrowUp' || el === 'KeyW') && r > 0 && bg[r-1][c] > flr) {
      r--;
      this.setState({playerArr: [r,c]});
    } else if ((el === 'ArrowRight' || el === 'KeyD') && c < len && bg[r][c+1] > flr) {
      c++;
      this.setState({playerArr: [r,c]});
    } else if ((el === 'ArrowDown' || el === 'KeyS') && r < len && bg[r+1][c] > flr) {
      r++;
      this.setState({playerArr: [r,c]});
    } else if ((el === 'ArrowLeft' || el === 'KeyA') && c > 0 && bg[r][c-1] > flr) {
      c--;
      this.setState({playerArr: [r,c]});
    }
  }

  render() {
    return (
      <div className='game' tabIndex='0' onKeyDown={this.handleKeyDown}>
        <div className='col-lft'>
          <GameLevel />
          <CharacterInfo/>
        </div>
        <div className='col-mid'>
          <div className='title'>CrimsonQuest</div>
          <GameStage
            boardSize =  {this.state.boardSize}
            floor = {this.state.floor}
            gameLevel =  {this.state.gameLevel}
            hero = {this.state.hero}
            playerArr = {this.state.playerArr}
            bgArr = {this.state.bgArr}
            updateBgArr = {this.updateBgArr}
            floorCoords = {this.state.floorCoords}
            updatePlayerArr = {this.updatePlayerArr}  />
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
