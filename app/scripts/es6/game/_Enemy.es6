/**
  *		@desc EnemyManager subcomponents holds state for a individual enemy or merchant.
	*		@param {object} props - Component props.
	*		@param {string} props.key - React render property.
	*		@param {object} props.source - Pointer to default enemy object details.
	*		@param {array} props.spawnCoord - Location of Enemy spawn.
	*		@param {number} props.pollCount - Current number of Enemy components to send their round move.
	*		@param {number} props.roundCount - Number of move rounds initiated this game.
	*		@param {array} props.enemyTurn - Updated by Enemy subcomponents. Holds full round of enemy moves.
	*		@param {array} props.roundEnemyArr - Array of all Enemy components rendered on current level.
	*		@param {array} props.enemyDisplayArr - Display details for all enemies/merchants on level.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {number} props.floor - First integer of floor value range in bgArr.
	*		@param {number} props.moveCount - Hero move counter.
	*		@param {array} props.playerArr - Hero's coordinates on the game board.
	*		@param {array} props.bgArr - Square array holds level background layer state.
	*		@param {array} props.enemyArr - Square array holds level enemy layer state.
	*		@param {object} props.exchangeAttacks - Hero/Enemy attack details.
	*		@param {object} props.enemyDead - Most recent dead enemy details.
	*		@param {object} props.enemyPalettes - Enemy sprite sheets on canvas.
	*		@param {function} props.incrementPollCount - Increment parent component pollCount.
	*		@param {function} props.updateEnemyTurn - Update parent enemyTurn array with chosen move.
	*		@param {function} props.updateEnemydisplayArr - Send details to parent enemyDisplayArr.
	*		@param {function} props.updateEnemyManager - Update selected EnemyManager state properties.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *   @returns NA - Each instance represents an enemy or merchant.
  */

class Enemy extends React.Component {
  constructor(props) {
    super(props);
    this.initEnemy = this.initEnemy.bind(this);
    this.chooseMove = this.chooseMove.bind(this);
    this.attemptMove = this.attemptMove.bind(this);
    this.completeMove = this.completeMove.bind(this);
    this.stay = this.stay.bind(this);
    this.attack = this.attack.bind(this);
    this.die = this.die.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
    this.startTurn = this.startTurn.bind(this);
    this.updateEnemyDisplay = this.updateEnemyDisplay.bind(this);

    this.state = ({
      level: 0,
      maxHealth: 0,
      curHealth: 0,
      baseStats: {},
      position: [],
      icon: null
    });
  }

  initEnemy() {
    const {source, tileSize, enemyPalettes} = this.props,
      level = randInt(source.levelRange[0], source.levelRange[1]),
      bStats = source.baseStats,
      onLvl = source.onLevelUp,
      position = this.props.spawnCoord,
      convert = statConversion,
      smoothingEnabled = false;

    let icon = document.createElement('canvas'),
      baseStats = {},
      maxHealth = 0,
      curHealth = 0,
      stat = 0,
      el = null,
      ctx = null;

    icon.width = tileSize;
    icon.height = tileSize;
    ctx = icon.getContext('2d');
    ctx.imageSmoothingEnabled = smoothingEnabled;

    ctx.drawImage(
      enemyPalettes[source.palette[0]],
      source.iconLoc[0],
      source.iconLoc[1],
      tileSize,
      tileSize,
      0,
      0,
      tileSize,
      tileSize
    );

    for (el in bStats) {
      stat = bStats[el];
      if (onLvl[el]) stat += level * onLvl[el];
      baseStats[el] = stat;
    }

    maxHealth = (
      baseStats.bHealth +
      convert.vitToHp * baseStats.bVitality +
      convert.durToHp * baseStats.bDurability
    );
    curHealth = maxHealth;

    this.updateEnemyDisplay(position, curHealth, maxHealth, level, icon);
    this.setState({ level, maxHealth, curHealth, baseStats, position, icon });
  }

  updateEnemyDisplay(position = this.state.position, curHealth = this.state.curHealth, maxHealth = this.state.maxHealth, level = this.state.level, icon = this.state.icon) {
    const {source, spawnIndex} = this.props;

    let enemyDisplay = {
      position,
      curHealth,
      maxHealth,
      level,
      icon,
      source,
      name: source.name,
      type: source.type
    };

    this.props.updateEnemyDisplayArr(enemyDisplay, spawnIndex);
  }

  chooseMove(fromCoord, playerArr, roundEnemyArr, bgArr) {
    const {floor} = this.props,
      h = 1.001,
      blocked = 1000,
      countMax = 100;

    let openStack = [],
      coord = [],
      path = [],
      openSet = {},
      closedSet = {},
      explored = {},
      parent = {},
      current = {},
      costToSpace = 0,
      costToGoal = 0,
      nextStep = 0,
      fCost = 0,
      index = 0,
      count = 0,
      row = 0,
      col = 0;

    //set structure: {'12,43': {coord: [], parent: {}, costToSpace, costToGoal, fCost}}

    costToGoal = h*(Math.abs(fromCoord[0] - playerArr[0]) + Math.abs(fromCoord[1] - playerArr[1]));
    fCost = costToGoal;
    explored['' + fromCoord] = {costToSpace, costToGoal, fCost, coord: fromCoord, parent: {}};
    openSet['' + fromCoord] = explored['' + fromCoord];
    openStack.push(openSet['' + fromCoord]);

    while (!(openStack[0].coord[0] === playerArr[0] && openStack[0].coord[1] === playerArr[1])) {
      current = openStack.shift();
      row = current.coord[0];
      col = current.coord[1];
      count++;

      delete openSet['' + current.coord];

      [
        [row - 1, col],
        [row + 1, col],
        [row, col + 1],
        [row, col - 1]
      ].forEach(
        neighbor => {
          if (bgArr[neighbor[0]][neighbor[1]] > floor && !roundEnemyArr[neighbor[0]][neighbor[1]]) {
            nextStep = 1;
          } else {
            nextStep = blocked;
          }
          costToSpace = current.costToSpace + nextStep;

          if (openSet['' + neighbor] && costToSpace < openSet['' + neighbor].costToSpace) {
            index = openStack.findIndex( el => (el[0] === neighbor[0] && el[1] === neighbor[1]) );
            openStack.splice(index, 1);
            delete openSet['' + neighbor];
          }
          if (closedSet['' + neighbor] && costToSpace < closedSet['' + neighbor].costToSpace) {
            delete closedSet['' + neighbor];
          }
          if (!openSet['' + neighbor] && !closedSet['' + neighbor]) {
            costToGoal =
              h * (Math.abs(neighbor[0] - playerArr[0]) + Math.abs(neighbor[1] - playerArr[1]));
            fCost = costToSpace + costToGoal;
            parent = explored['' + current.coord];
            explored['' + neighbor] = {costToSpace, costToGoal, fCost, parent, coord: neighbor};
            openSet['' + neighbor] = explored['' + neighbor];
            index = openStack.findIndex( el => fCost < el.fCost);
            if (index > -1) openStack.splice(index, 0, openSet['' + neighbor]);
            else openStack.push(openSet['' + neighbor]);
          }
        }
      );
      if (count > countMax) {
        console.log('MOVE LIMIT EXCEEDED');
        break;
      }
    }

    current = openStack[0];
    coord = current.coord;
    while (coord.length && !(coord[0] === fromCoord[0] && coord[1] === fromCoord[1])) {
      path.unshift(coord);
      current = current.parent;
      coord = current.coord;
    }

    return path[0];
  }

  attemptMove(nextProps) {
    let {bgArr, roundEnemyArr, playerArr, source} = nextProps,
      stats = this.state.baseStats,
      fromCoord = this.state.position,
      toCoord = [],
      turn = {};

    toCoord = this.chooseMove(fromCoord, playerArr, roundEnemyArr, bgArr);
    stats.curHealth = this.state.curHealth;
    turn = {
      stats,
      source,
      fromCoord,
      toCoord,
      type: 'move',
      status: false,
    };

    this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
    this.props.incrementPollCount();
  }

  completeMove(position) {
    this.updateEnemyDisplay(position);
    this.setState({ position: [...position] });
  }

  stay(nextProps) {
    let stats = this.state.baseStats,
      coord = this.state.position,
      turn = {};

    stats.curHealth = this.state.curHealth;
    turn = {
      stats,
      type: 'stay',
      source: nextProps.source,
      fromCoord: coord,
      toCoord: coord,
      status: false,
    };

    this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
    this.props.incrementPollCount();
  }

  attack(nextProps) {
    let {playerArr, source} = nextProps,
      stats = this.state.baseStats,
      fromCoord = this.state.position,
      turn = {};

    stats.curHealth = this.state.curHealth;
    turn = {
      stats,
      source,
      fromCoord,
      type: 'attack',
      toCoord: playerArr,
      status: false,
    };

    this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
    this.props.incrementPollCount();
  }

  die() {
    const {position, level} = this.state,
      {spawnIndex, source} = this.props,
      enemyDead = Object.assign(this.props.enemyDead),
      conv = statConversion;

    let experience = 0,
      gold = 0,
      i = 0;

    for (; i < level; i++) {
      experience += randInt(conv.lvlToExpRange[0], conv.lvlToExpRange[1]);
      gold += randInt(conv.lvlToGoldRange[0], conv.lvlToGoldRange[1]);
    }

    if (this.props.source.boss) experience *= conv.bossMultiplier, gold *= conv.bossMultiplier;

    enemyDead.count++;
    enemyDead.spawnIndex = spawnIndex;
    enemyDead.coord = position;
    enemyDead.source = source,
    enemyDead.level = level;
    enemyDead.experience = ~~experience;
    enemyDead.gold = ~~gold;

    this.props.updateGameClassState({ enemyDead });
  }

  takeDamage(attacks) {
    let {curHealth} = this.state,
      damage = 0;

    attacks.forEach( el => {if (el.from === 'hero') damage = el.damage} );

    curHealth = curHealth - damage > 0 ? curHealth - damage : 0;

    //console.log('Hit health - damage: ', curHealth, damage);

    if (!curHealth) this.die();

    this.updateEnemyDisplay(this.state.position, curHealth);
    this.setState({ curHealth });
  }

  startTurn(nextProps) {
    const {position, curHealth} = this.state,
      {playerArr} = nextProps,
      {aggression} = nextProps.source;

    if (curHealth < 1 || linearDistance(position, playerArr) > aggression) {
      this.stay(nextProps);
    } else if ((playerArr[0] === position[0] && Math.pow(playerArr[1] - position[1],2) === 1) ||
      (playerArr[1] === position[1] && Math.pow(playerArr[0] - position[0],2) === 1)) {
      this.attack(nextProps);
    } else if (aggression + 94 > randInt(1, 100)) {
      this.attemptMove(nextProps);
    } else {
      this.stay(nextProps);
    }
  }

  componentWillMount() {
    this.initEnemy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pollCount === 0 &&
      this.props.moveCount !== nextProps.moveCount) {

      this.startTurn(nextProps);
    }
    if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count &&
      nextProps.exchangeAttacks.spawnIndex === nextProps.spawnIndex) {

      this.takeDamage(nextProps.exchangeAttacks.attacks);
    }
    if (this.props.roundCount !== nextProps.roundCount &&
      nextProps.enemyTurn[this.props.spawnIndex].type === 'move' &&
      nextProps.enemyTurn[this.props.spawnIndex].status) {

      this.completeMove(nextProps.enemyTurn[nextProps.spawnIndex].toCoord);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {

    return (
      <div>
      </div>
    );
  }
}
