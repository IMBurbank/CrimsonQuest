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
    this.updateGameClassState = this.updateGameClassState.bind(this);
    this.pickupItem = this.pickupItem.bind(this);
    this.focus = this.focus.bind(this);
    this.maintainFocus = this.maintainFocus.bind(this);
    this.endFocus = this.endFocus.bind(this);

    this.state = ({
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 8,
      levels: 10,
      hero: 'Mage',
      heroIcon: null,
      heroFacing: '',
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: {count: 0, type: '', item: {}},
      quickConsume: {count: 0, num: 0},
      //type: pickup, use, equip, unequip, buy, sell
      enemyArr: [],
      enemyPalegges: {},
      enemyPaletteArrMap: {},
      initAttack: {count: 0, stats: {}, coords: {}},
      attackRound: {count: 0, attacks: []},
      enemyDead: {count: 0, enemy: {}},
      playerDead: false,
      overlayMode: 'off'
      //inv-overlay, inGameOptions, startOptions
    });
  }

  updateBgArr(bgArr, floorCoords) {
    this.setState({ bgArr, floorCoords });
  }

  updatePlayerArr(playerArr) {
    this.setState({ playerArr: [...playerArr] });
  }

  updateGameClassState(updatedEls = {}) {
    this.setState(updatedEls);
  }

  pickupItem(coord, val) {
    const item = Object.assign({}, this.state.itemPaletteArrMap[`${val}`]),
      inventory = Object.assign({}, this.state.inventory),
      itemArr = [...this.state.itemArr],
      pArr = this.state.playerArr;

    let nState = {},
      interactItem = Object.assign({}, this.state.interactItem),
      dir = '';

    if (item.type !== 'openChest') {
      if (inventory[item.name]) inventory[item.name].count += 1;
      else item.count = 1, item.equipped = false, inventory[item.name] = item;

      if (['consumable', 'gold'].includes(item.type)) itemArr[coord[0]][coord[1]] = 0;
      else itemArr[coord[0]][coord[1]] = chestConsumables.openChest.itemArrVal;

      interactItem.count += 1;
      interactItem.type = 'pickup';
      interactItem.item = item;
      nState = {itemArr, inventory, interactItem};

      console.log('Picked up', item.name);
    }

    dir = coord[0] < pArr[0] ? 'up' :
      coord[0] > pArr[0] ? 'down' :
      coord[1] < pArr[1] ? 'left' :
      'right';

    if (this.state.heroFacing !== dir) nState.heroFacing = dir;

    nState.playerArr = coord;
    this.setState( nState );
  }

  handleKeyDown(e) {
    if (this.state.overlayMode === 'off') {

      const el = e.nativeEvent.code,
        arr = [...this.state.playerArr],
        bg = this.state.bgArr,
        itm = this.state.itemArr,
        flr = this.state.floor,
        dir = this.state.heroFacing,
        len = this.state.boardSize - 1,
        consumeDigits = [
          'Digit1',
          'Digit2',
          'Digit3',
          'Digit4',
          'Digit5',
          'Digit6',
          'Digit7',
          'Digit8',
        ];

      let r = arr[0],
        c = arr[1],
        nState = {};

      if (el === 'ArrowUp' || el === 'KeyW') {
        if (r > 0 && bg[r-1][c] > flr) {
          r--;
          if (itm[r][c]) this.pickupItem([r,c], itm[r][c]);
          else {
            nState.playerArr = [r, c];
            if (dir !== 'up') nState.heroFacing = 'up';
            this.setState( nState );
          }
        } else if (dir !== 'up') {
          this.setState({ heroFacing: 'up' });
        }
      } else if (el === 'ArrowRight' || el === 'KeyD') {
        if (c < len && bg[r][c+1] > flr) {
          c++;
          if (itm[r][c]) this.pickupItem([r,c], itm[r][c]);
          else {
            nState.playerArr = [r, c];
            if (dir !== 'right') nState.heroFacing = 'right';
            this.setState( nState );
          }
        } else if (dir !== 'right') {
          this.setState({ heroFacing: 'right' });
        }
      } else if (el === 'ArrowDown' || el === 'KeyS') {
        if (r < len && bg[r+1][c] > flr) {
          r++;
          if (itm[r][c]) this.pickupItem([r,c], itm[r][c]);
          else {
            nState.playerArr = [r, c];
            if (dir !== 'down') nState.heroFacing = 'down';
            this.setState( nState );
          }
        } else if (dir !== 'down') {
          this.setState({ heroFacing: 'down' });
        }
      } else if (el === 'ArrowLeft' || el === 'KeyA') {
        if (c > 0 && bg[r][c-1] > flr) {
          c--;
          if (itm[r][c]) this.pickupItem([r,c], itm[r][c]);
          else {
            nState.playerArr = [r, c];
            if (dir !== 'left') nState.heroFacing = 'left';
            this.setState( nState );
          }
        } else if (dir !== 'left') {
          this.setState({ heroFacing: 'left' });
        }
      } else if (el === 'KeyI' || el === 'KeyE') {
        this.setState({overlayMode: 'inv-overlay'});
      } else if (consumeDigits.includes(el)) {
        this.setState({quickConsume: {count: this.state.quickConsume.count + 1,num: el.slice(-1)}});
      }
    }
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  maintainFocus() {
    this.focus();
    this.focusID = setInterval( () => this.focus(), 250 );
  }

  endFocus() {
    clearInterval(this.focusID);
  }

  componentDidMount() {
    this.maintainFocus()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.overlayMode !== nextState.overlayMode) {
      if (nextState.overlayMode === 'off') this.maintainFocus();
      else this.endFocus();
    }
  }

  render() {
    return (
      <div className='game' tabIndex='0' onKeyDown={this.handleKeyDown}>
        <div className='col-lft'>
          <GameLevel />
          <Hero
            tileSize = {this.state.tileSize}
            hero = {this.state.hero}
            heroIcon = {this.state.heroIcon}
            inventory = {this.state.inventory}
            itemPalettes = {this.state.itemPalettes}
            interactItem = {this.state.interactItem}
            updateGameClassState = {this.updateGameClassState}  />
        </div>
        <div className='col-mid'>
          <div className='title'>CrimsonQuest</div>
          <GameStage
            boardSize =  {this.state.boardSize}
            tileSize = {this.state.tileSize}
            floor = {this.state.floor}
            gameLevel =  {this.state.gameLevel}
            levels = {this.state.levels}
            hero = {this.state.hero}
            playerArr = {this.state.playerArr}
            heroFacing = {this.state.heroFacing}
            updatePlayerArr = {this.updatePlayerArr}
            bgArr = {this.state.bgArr}
            updateBgArr = {this.updateBgArr}
            floorCoords = {this.state.floorCoords}
            itemArr = {this.state.itemArr}
            itemPalettes = {this.state.itemPalettes}
            itemPaletteArrMap = {this.state.itemPaletteArrMap}
            inventory = {this.state.inventory}
            interactItem = {this.state.interactItem}
            overlayMode = {this.state.overlayMode}
            updateGameClassState = {this.updateGameClassState}  />
          <ConsumableItems
            tileSize = {this.state.tileSize}
            inventory = {this.state.inventory}
            itemPalettes = {this.state.itemPalettes}
            interactItem = {this.state.interactItem}
            quickConsume = {this.state.quickConsume}
            updateGameClassState = {this.updateGameClassState} />
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
