
//tileSize, floor, source, spawnIndex, spawnCoord, bgArr, playerArr, moveCount, enemyArr, enemyDisplayArr, updateEnemyDisplayArr, updateEnemyManager, displayCount,
//updateGameClassState, pollCount, incrementPollCount, enemyTurn, updateEnemyTurn, enemyDead, enemyPalettes, roundCount, roundEnemyArr, exchangeAttacks
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
      name: source.name,
      type: source.type
    };

    this.props.updateEnemyDisplayArr(enemyDisplay, spawnIndex);
  }

  chooseMove(fromCoord, playerArr, roundEnemyArr, bgArr) {
    const {floor} = this.props,
      h = 1.001,
      blocked = 1000;

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
    //console.log('chooseMove: ', JSON.stringify(toCoord), 'from: ', JSON.stringify(fromCoord));
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

    console.log('enemyDead')

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

    console.log('Damage to enemy: ', damage);

    if (!curHealth) this.die();

    this.updateEnemyDisplay(this.state.position, curHealth);
    this.props.updateEnemyManager({displayCount: this.props.displayCount + 1});
    this.setState({ curHealth });
  }

  startTurn(nextProps) {
    const {position, curHealth} = this.state,
      {playerArr} = nextProps,
      {aggression} = nextProps.source;

    //console.log('Enemy startTurn: ', curHealth, JSON.stringify(position), JSON.stringify(playerArr), aggression);

    if (linearDistance(position, playerArr) > aggression || curHealth < 1) {
      this.stay(nextProps);
    } else if ((playerArr[0] === position[0] && Math.pow(playerArr[1] - position[1],2) === 1) ||
      (playerArr[1] === position[1] && Math.pow(playerArr[0] - position[0],2) === 1)) {
      this.attack(nextProps);
    } else {
      this.attemptMove(nextProps);
    }
  }

  componentWillMount() {
    this.initEnemy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pollCount === 0 &&
      this.props.moveCount !== nextProps.moveCount) {
      //console.log('Enemy receiveProps startTurn');
      this.startTurn(nextProps);
    }
    if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count &&
      nextProps.exchangeAttacks.spawnIndex === nextProps.spawnIndex) {

      this.takeDamage(nextProps.exchangeAttacks.attacks);
    }/*
    if (this.props.roundCount !== nextProps.roundCount &&
      this.props.enemyTurn[this.props.spawnIndex].type === 'move' &&
      this.props.enemyTurn[this.props.spawnIndex].status) {

      console.log('completeMove!: ', nextProps.enemyTurn[nextProps.spawnIndex].toCoord);
      this.completeMove(nextProps.enemyTurn[nextProps.spawnIndex].toCoord);
    }*/
    if (this.props.roundCount !== nextProps.roundCount &&
      nextProps.enemyTurn[this.props.spawnIndex].type === 'move' &&
      nextProps.enemyTurn[this.props.spawnIndex].status) {

      this.completeMove(nextProps.enemyTurn[nextProps.spawnIndex].toCoord);
    }
  }

  render() {
    const {playerArr, roundEnemyArr, source} = this.props,
      {position, level, curHealth, icon} = this.state;

    let positionQue = 0,
      positionsTaken = [0,0,0,0],
      rIcon = null,
      rName = null,
      rLevel = null,
      rCurHealth = null;

    if (roundEnemyArr.length) {
      [
        [playerArr[0] - 1, playerArr[1]],
        [playerArr[0], playerArr[1] + 1],
        [playerArr[0] + 1, playerArr[1]],
        [playerArr[0], playerArr[1] - 1],
      ].forEach(
        (el, i) => {
          if (roundEnemyArr[el[0]][el[1]]) positionsTaken[i] = 1;
          if (el === position) positionQue = i;
        }
      );

      if (positionQue === position.findIndex( el => el === 1 )) {
        rIcon = icon;
        rName = source.name;
        rLevel = `Level: ${level}`;
        rCurHealth = `Current Health: ${curHealth}`;
      }
    }

    return (
      <div>
        <span>{rIcon}</span>
        <span>{rName}</span>
        <div>{rLevel}</div>
        <div>{rCurHealth}</div>
      </div>
    );
  }
}
