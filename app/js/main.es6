const roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
};

/**
  * React Components
  */


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.resetGame = this.resetGame.bind(this);
    this.updateBgArr = this.updateBgArr.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updatePlayerArr = this.updatePlayerArr.bind(this);
    this.updateGameClassState = this.updateGameClassState.bind(this);
    this.pickupItem = this.pickupItem.bind(this);
    this.focus = this.focus.bind(this);
    this.maintainFocus = this.maintainFocus.bind(this);
    this.endFocus = this.endFocus.bind(this);

    this.directionKeys = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowRight: 'right',
      KeyD: 'right',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left'
    };
    this.statIncreaseKeys = {
      KeyV: 'bVitality',
      KeyB: 'bDurability',
      KeyN: 'bStrength',
      KeyM: 'bAgility'
    };
    this.consumeDigits = [
      'Digit1',
      'Digit2',
      'Digit3',
      'Digit4',
      'Digit5',
      'Digit6',
      'Digit7',
      'Digit8',
    ];

    this.state = ({
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 1,
      bgLevelProcessed: 0,
      itemLevelProcessed: 0,
      levels: 10,
      hero: '',
      heroIcon: null,
      heroFacing: '',
      playerPalettes: {},
      moveCount: 0,
      levelUpCount: 1,
      gameOver: false,
      gameMuted: false,
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: {count: 0, type: '', item: {}, source: {}},
      //type: pickup, use, equip, unequip, buy, buySuccess, buyFail, sell
      useStatPoint: {count: 0, type: '', item: {}, source: {}},
      increasedStat: {count: 0, type: '', stat: '', quant: 0},
      quickConsume: {count: 0, num: 0},
      enemyArr: [],
      enemyPalettes: {},
      enemyAttack: {count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {}},
      exchangeAttacks: {count: 0, spawnIndex: 0, attacks: []},
      enemyDead: {
        count: 0,
        spawnIndex: 0,
        coord: [],
        source: {},
        level: 0,
        experience: 0,
        gold: 0
      },
      overlayMode: 'hero-selection-overlay'
      //off, inv-overlay, help-overlay, merchant-overlay, game-over-overlay, game-win-overlay, hero-selection-overlay
    });
  }

  resetGame() {
    this.setState({
      gameLevel: 1,
      bgLevelProcessed: 0,
      hero: '',
      heroIcon: null,
      heroFacing: '',
      playerPalettes: {},
      moveCount: 0,
      levelUpCount: 1,
      gameOver: false,
      inventory: {},
      playerArr: [],
      bgArr: [],
      itemArr: [],
      floorCoords: [],
      itemPalettes: {},
      itemPaletteArrMap: {},
      interactItem: {count: 0, type: '', item: {}, source: {}},
      useStatPoint: {count: 0, type: '', item: {}, source: {}},
      increasedStat: {count: 0, type: '', stat: '', quant: 0},
      quickConsume: {count: 0, num: 0},
      enemyArr: [],
      enemyPalettes: {},
      enemyAttack: {count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {}},
      exchangeAttacks: {count: 0, spawnIndex: 0, attacks: []},
      enemyDead: {
        count: 0,
        spawnIndex: 0,
        coord: [],
        source: {},
        level: 0,
        experience: 0,
        gold: 0
      },
    });
  }

  updateBgArr(bgArr, bgLevelProcessed, floorCoords) {
    this.setState({ bgArr, bgLevelProcessed, floorCoords });
  }

  updatePlayerArr(playerArr) {
    this.setState({ playerArr: [...playerArr] });
  }

  toggleMute() {
    this.setState({ gameMuted: !this.state.gameMuted });
  }

  updateGameClassState(updatedEls = {}) {
    this.setState(updatedEls);
  }

  pickupItem(coord, val, moveCount) {
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
      nState = {itemArr, inventory, interactItem, moveCount};
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
        {boardSize, floor, levels,  playerArr, bgArr, itemArr, itemPaletteArrMap, enemyArr, heroFacing} = this.state;

      let {gameLevel, moveCount} = this.state,
        nState = {},
        direction = '',
        row = 0,
        col = 0;

      if (this.directionKeys[el]) {
        moveCount++;
        direction = this.directionKeys[el];

        row = direction === 'up' ? playerArr[0] - 1 :
          direction === 'down' ? playerArr[0] + 1 :
          playerArr[0];

        col = direction === 'right' ? playerArr[1] + 1 :
          direction === 'left' ? playerArr[1] - 1 :
          playerArr[1];

        if (row >= 0 &&
          row < boardSize &&
          col >= 0 &&
          col < boardSize &&
          bgArr[row][col] > floor &&
          !enemyArr[row][col]) {

          if (itemArr[row][col]) {
            this.pickupItem([row,col], itemArr[row][col], moveCount);
          } else {
            nState.playerArr = [row, col];
            nState.moveCount = moveCount;
            if (heroFacing !== direction) nState.heroFacing = direction;
            this.setState( nState );
          }
        } else if (itemArr[row][col] &&
          itemPaletteArrMap['' + itemArr[row][col]].name === 'Active Portal') {

          if (gameLevel < levels) {
            this.setState({ gameLevel: gameLevel + 1 });
          } else {
            console.log('VICTORY!!!');
            this.setState({ gameOver: true, overlayMode: 'game-win-overlay' });
          }
        } else if (enemyArr[row][col] &&
          enemyArr[row][col].type === 'merchant') {

          this.setState({ overlayMode: 'merchant-overlay' });
        } else {
          nState.moveCount = moveCount;
          if (heroFacing !== direction) nState.heroFacing = direction;
          this.setState( nState );
        }
      } else if (el === 'KeyI' || el === 'KeyE') {
        this.setState({overlayMode: 'inv-overlay'});
      } else if (el === 'KeyH') {
        this.setState({overlayMode: 'help-overlay'});
      } else if (this.consumeDigits.includes(el)) {
        this.setState({quickConsume: {count: this.state.quickConsume.count + 1,num: el.slice(-1)}});
      } else if (this.statIncreaseKeys[el]) {
        this.setState({useStatPoint: {count: this.state.useStatPoint.count + 1, stat: this.statIncreaseKeys[el]}});
      } else if (el === 'KeyQ' || el === 'KeyP') {
        this.toggleMute();
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
    if (this.state.overlayMode === 'off')this.maintainFocus()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.overlayMode !== nextState.overlayMode) {
      if (nextState.overlayMode === 'off') this.maintainFocus();
      else this.endFocus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.gameOver) {
      this.resetGame();
    }
    if (this.state.hero &&
      this.state.heroIcon &&
      this.state.overlayMode === 'hero-selection-overlay') {

      setTimeout(() => {this.setState({ overlayMode: 'off'});}, 1000);
    }
  }

  render() {
    const {gameOver} = this.state;

    return (
      <div className='game' tabIndex='0' onKeyDown={this.handleKeyDown}>
        <div className='col-lft'>
          { gameOver ? null :
          <GameLevel
            gameLevel =  {this.state.gameLevel} />
          }
          { gameOver ? null :
          <Hero
            tileSize = {this.state.tileSize}
            hero = {this.state.hero}
            heroIcon = {this.state.heroIcon}
            inventory = {this.state.inventory}
            itemPalettes = {this.state.itemPalettes}
            interactItem = {this.state.interactItem}
            useStatPoint = {this.state.useStatPoint}
            increasedStat = {this.state.increasedStat}
            enemyAttack = {this.state.enemyAttack}
            exchangeAttacks = {this.state.exchangeAttacks}
            enemyDead = {this.state.enemyDead}
            gameOver = {this.state.gameOver}
            updateGameClassState = {this.updateGameClassState}  />
          }
        </div>
        <div className='col-mid'>
          <div className='title'>CrimsonQuest</div>
          { gameOver ? null :
          <GameStage
            boardSize =  {this.state.boardSize}
            tileSize = {this.state.tileSize}
            floor = {this.state.floor}
            gameLevel =  {this.state.gameLevel}
            bgLevelProcessed = {this.state.bgLevelProcessed}
            levels = {this.state.levels}
            hero = {this.state.hero}
            playerPalettes = {this.state.playerPalettes}
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
            enemyArr = {this.state.enemyArr}
            enemyPalettes = {this.state.enemyPalettes}
            enemyDead = {this.state.enemyDead}
            toggleMute = {this.toggleMute}
            updateGameClassState = {this.updateGameClassState}  />
          }
          { gameOver ? null :
          <ConsumableItems
            tileSize = {this.state.tileSize}
            inventory = {this.state.inventory}
            itemPalettes = {this.state.itemPalettes}
            interactItem = {this.state.interactItem}
            quickConsume = {this.state.quickConsume}
            updateGameClassState = {this.updateGameClassState} />
          }
        </div>
        <div className='col-rgt'>
          { gameOver ? null :
          <CurrentObjective
            gameLevel =  {this.state.gameLevel}
            enemyDead = {this.state.enemyDead}  />
          }
          { gameOver ? null :
          <EnemyManager
            tileSize = {this.state.tileSize}
            floor = {this.state.floor}
            gameLevel =  {this.state.gameLevel}
            itemLevelProcessed = {this.state.itemLevelProcessed}
            playerArr = {this.state.playerArr}
            moveCount = {this.state.moveCount}
            bgArr = {this.state.bgArr}
            floorCoords = {this.state.floorCoords}
            enemyArr = {this.state.enemyArr}
            enemyPalettes = {this.state.enemyPalettes}
            enemyAttack = {this.state.enemyAttack}
            exchangeAttacks = {this.state.exchangeAttacks}
            enemyDead = {this.state.enemyDead}
            updateGameClassState = {this.updateGameClassState}  />
          }
          { gameOver ? null :
          <ActivityLog
            gameLevel =  {this.state.gameLevel}
            levelUpCount = {this.state.levelUpCount}
            interactItem = {this.state.interactItem}
            useStatPoint = {this.state.useStatPoint}
            increasedStat = {this.state.increasedStat}
            exchangeAttacks = {this.state.exchangeAttacks}
            enemyDead = {this.state.enemyDead}  />
          }
          { gameOver ? null :
          <GameSounds
            gameOver = {this.state.gameOver}
            gameLevel =  {this.state.gameLevel}
            gameMuted = {this.state.gameMuted}
            levels = {this.state.levels}
            levelUpCount = {this.state.levelUpCount}
            interactItem = {this.state.interactItem}
            useStatPoint = {this.state.useStatPoint}
            exchangeAttacks = {this.state.exchangeAttacks}
            enemyDead = {this.state.enemyDead}
            overlayMode = {this.state.overlayMode}  />
          }
          { gameOver ? null :
          <GameTips/>
          }
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
  <App/>, document.getElementById('root')
);
