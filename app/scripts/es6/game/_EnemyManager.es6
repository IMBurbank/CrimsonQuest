//gameLevel, bgArr, floorCoords, playerArr, enemyArr, enemyAttack, exchangeAttacks,
//moveCount, updateGameClassState, tileSize, floor, enemyPalettes, enemyDead, itemLevelProcessed
class EnemyManager extends React.Component {
  constructor(props) {
    super(props);
    this.setLevelEnemies = this.setLevelEnemies.bind(this);
    this.runEnemyRound = this.runEnemyRound.bind(this);
    this.handleEnemyDead = this.handleEnemyDead.bind(this);
    this.updateEnemyManager = this.updateEnemyManager.bind(this);
    this.incrementPollCount = this.incrementPollCount.bind(this);
    this.updateEnemyTurn = this.updateEnemyTurn.bind(this);
    this.updateEnemyDisplayArr = this.updateEnemyDisplayArr.bind(this);
    this.setEnemyDisplay = this.setEnemyDisplay.bind(this);
    this.drawEnemyIcon = this.drawEnemyIcon.bind(this);

    this.pollCount = -1;
    this.enemyDeadCount = 0;
    this.enemyTurn = [];
    //enemyTurn: [{ type: '', source: {}, stats: {}, fromCoord: [], toCoord: [], status: bool },]
    //type: 'move', 'stay', 'attack', 'die'

    this.enemyDisplayArr = [];
    //{name: '', type: '', icon: <memCanvas>, level: 0, curHealth: 0, maxHealth: 0, position: []}
    this.enemyDisplay = {};

    this.state = ({
      roundCount: 0,
      displayCount: 0,
      levelProcessed: 0,
      enemiesRemaining: 0,
      currentIndex: 0,
      levelEnemies: [],
      roundEnemyArr: [],
      nextKey: 0,

    });
  }

  incrementPollCount() {
    this.pollCount++;

    if (this.pollCount === this.state.levelEnemies.length) {
      this.runEnemyRound(this.props);
    }
  }

  updateEnemyTurn(turn, index) {
    this.enemyTurn[index] = turn;
  }

  updateEnemyDisplayArr(enemy, index) {
    this.enemyDisplayArr[index] = enemy;
  }

  setLevelEnemies() {
    const {gameLevel, itemLevelProcessed, bgArr} = this.props,
      len = bgArr.length,
      enemyList = [
        enemyAvian,
        enemyDemon,
        enemyElemental,
        enemyHumanoid,
        enemyReptile,
        enemyUndead
      ],
      centerFloorSpace = 45;

    let floorCoords = [...this.props.floorCoords],
      enemyArr = initZeroArray(len),
      {nextKey} = this.state,
      levelEnemies = [],
      spawnCoord = [],
      curCoord = [0,0],
      curIndex = 0,
      source = {},
      el = null,
      enemiesRemaining = 0,
      count = 0,
      i = 0;

    enemyList.forEach( obj => {
      for (el in obj) {
        source = obj[el];
        count = source.spawnQuant['' + gameLevel] ? source.spawnQuant['' + gameLevel] : 0;
        enemiesRemaining += count;
        i = 0;

        while (i < count) {
          if (source.type === 'merchant') {
            while (!(bgArr[curCoord[0]][curCoord[1]] === centerFloorSpace &&
              bgArr[curCoord[0] - 1][curCoord[1]] === centerFloorSpace &&
              bgArr[curCoord[0]][curCoord[1] + 1] === centerFloorSpace &&
              bgArr[curCoord[0] + 1][curCoord[1]] === centerFloorSpace &&
              bgArr[curCoord[0]][curCoord[1] - 1] === centerFloorSpace)) {
              curIndex = randInt(0, floorCoords.length - 1)
              curCoord = floorCoords[curIndex];
            }
            spawnCoord = floorCoords.splice(curIndex, 1)[0];
            console.log('Merchant at: ', spawnCoord);
          } else {
            spawnCoord = floorCoords.splice(randInt(0, floorCoords.length - 1), 1)[0];
          }

          enemyArr[spawnCoord[0]][spawnCoord[1]] = source;
          nextKey++;

          levelEnemies.push({source, spawnCoord, key: nextKey});
          i++;

          if (source.boss) console.log('Boss at: ', spawnCoord);
        }
      }
    });

    this.enemyTurn.length = enemiesRemaining;
    this.enemyDisplayArr.length = enemiesRemaining;

    this.props.updateGameClassState({ floorCoords, enemyArr});

    this.setState({
      levelEnemies,
      enemiesRemaining,
      nextKey,
      levelProcessed: itemLevelProcessed,
      roundEnemyArr: enemyArr
    });
  }

  runEnemyRound(props) {
    const {enemyAttack} = props;

    let enemyTurn = [...this.enemyTurn],
      roundEnemyArr = [...this.state.roundEnemyArr],
      {roundCount, currentIndex, levelEnemies} = this.state,
      count = enemyAttack.count,
      type = '',
      source = {},
      stats = {},
      toCoord = [],
      fromCoord = [],
      status = false,
      spawnIndex = 0;

    while (currentIndex < this.pollCount) {
      ({type, source, stats, fromCoord, toCoord, status} = enemyTurn[currentIndex]);

      if (type === 'stay') {
        enemyTurn[currentIndex].status = true;
      } else if (type === 'move') {
        status =  roundEnemyArr[toCoord[0]][toCoord[1]] === 0 ? true : false;

        if (status) {
          roundEnemyArr[fromCoord[0]][fromCoord[1]] = 0;
          roundEnemyArr[toCoord[0]][toCoord[1]] = source;
        }
        enemyTurn[currentIndex].status = status;
      } else if (type === 'attack') {
        count++;
        spawnIndex = currentIndex;
        enemyTurn[currentIndex].status = true;

        props.updateGameClassState({ enemyAttack: {count, roundCount, spawnIndex, stats, source} });
      }
      currentIndex++;
    }

    if (currentIndex === levelEnemies.length) {
      currentIndex = 0;
      this.pollCount = 0;
      roundCount++;

      props.updateGameClassState({ enemyArr: roundEnemyArr });
    }

    this.enemyTurn = [...enemyTurn];
    this.setState({ roundEnemyArr, currentIndex, roundCount });
  }

  handleEnemyDead(nextProps) {
    const {enemyDead} = nextProps,
      {coord, count} = enemyDead;

    let {enemyArr} = nextProps,
      {roundEnemyArr} = this.state;

    roundEnemyArr[coord[0]][coord[1]] = 0;
    enemyArr = [...roundEnemyArr];
    this.enemyDeadCount = count;

    nextProps.updateGameClassState({ enemyArr });
    this.setState({ roundEnemyArr});
  }

  updateEnemyManager(updatedEls = {}) {
    this.setState(updatedEls);
  }

  drawEnemyIcon(icon) {
    const ts = this.props.tileSize;

    let ctx = getById('enemy-icon').getContext('2d');

    ctx.clearRect(0, 0, ts, ts);

    if (icon) ctx.drawImage(icon, 0, 0);
  }

  setEnemyDisplay(nextProps, nextState) {
    const {playerArr} = nextProps,
      enemyDisplayArr = this.enemyDisplayArr;

    let displayRange = 5,
      displayChoice = {},
      position = [],
      icon = null,
      updateDisplayChoice = false,
      distance = 0,
      healthLost = 0,
      maxHealth = 0,
      curHealth = 0,
      index = 0;

    enemyDisplayArr.forEach(
      (el, i) => {
        if (el && el.curHealth) {
          updateDisplayChoice = false;
          position = enemyDisplayArr[i].position;
          distance = Math.abs(playerArr[0] - position[0]) + Math.abs(playerArr[1] - position[1]);

          if (position[0] === playerArr[0] || position[1] === playerArr[1]) {
            displayRange = 4;
          } else {
            displayRange = 5;
          }

          if (distance <= displayRange) {
            index = i;
            maxHealth = el.maxHealth;
            curHealth = el.curHealth;
            healthLost = maxHealth - curHealth;

            if (!displayChoice.maxHealth || distance < displayChoice.distance) {
              updateDisplayChoice = true;
            } else if (distance === displayChoice.distance) {
              if (healthLost > displayChoice.healthLost) {
                updateDisplayChoice = true;
              } else if (healthLost === displayChoice.healthLost) {
                if (maxHealth > displayChoice.maxHealth) updateDisplayChoice = true;
              }
            }

            if (updateDisplayChoice) {
              displayChoice = {position, distance, index, maxHealth, curHealth, healthLost};
            }
          }
        }
      }
    );

    if (!(displayChoice.index &&
      enemyDisplayArr[displayChoice.index].curHealth === this.enemyDisplay.curHealth &&
      enemyDisplayArr[displayChoice.index].name === this.enemyDisplay.name &&
      enemyDisplayArr[displayChoice.index].level === this.enemyDisplay.level)) {

      this.enemyDisplay = displayChoice.curHealth ? enemyDisplayArr[displayChoice.index] : {};
      icon = this.enemyDisplay.icon ? this.enemyDisplay.icon : false;

      this.drawEnemyIcon(icon);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.pollCount === -1 &&
      this.state.levelEnemies.length &&
      this.props.moveCount !== nextProps.moveCount) {
      this.pollCount = 0;
    }
    if (this.enemyDeadCount !== nextProps.enemyDead.count) {
      this.handleEnemyDead(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.moveCount !== nextProps.moveCount ||
      this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count ||
      this.state.roundCount !== nextState.roundCount ||
      this.state.displayCount !== nextState.displayCount ||
      nextState.levelProcessed !== nextProps.itemLevelProcessed) {

      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.moveCount !== nextProps.moveCount ||
      this.state.displayCount !== nextState.displayCount) {
      this.setEnemyDisplay(nextProps, nextState);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.levelProcessed !== this.props.itemLevelProcessed &&
      Object.keys(this.props.enemyPalettes).length) {

      this.setLevelEnemies();
    }
  }

  render() {
    const {levelEnemies} = this.state,
      ts = this.props.tileSize,
      enemyDisplay = this.enemyDisplay,
      healthMaxWidth = 10;

    let enemies = [],
      spawnCoord = [],
      source = {},
      key = 0,
      containerHeader = null,
      displayName = null,
      displayType = null,
      displayLevel = null,
      displayHealth = null,
      healthTitleWidth = '',
      healthBorder = 'none',
      healthMaxWidthStyle = '',
      healthPercent = 0,
      healthWidth = '',
      healthColor = 'none';

    levelEnemies.forEach( obj => {
      ({source, spawnCoord, key} = obj);

      enemies.push(
          <Enemy
            key = {source.name + key}
            source = {source}
            spawnIndex = {enemies.length}
            spawnCoord = {spawnCoord}
            floor = {this.props.floor}
            tileSize = {this.props.tileSize}
            bgArr = {this.props.bgArr}
            playerArr = {this.props.playerArr}
            moveCount = {this.props.moveCount}
            displayCount = {this.state.displayCount}
            enemyArr = {this.props.enemyArr}
            roundEnemyArr = {this.state.roundEnemyArr}
            enemyPalettes = {this.props.enemyPalettes}
            enemyDead = {this.props.enemyDead}
            pollCount = {this.pollCount}
            incrementPollCount = {this.incrementPollCount}
            roundCount = {this.state.roundCount}
            enemyTurn = {this.enemyTurn}
            enemyDisplayArr = {this.enemyDisplayArr}
            updateEnemyTurn = {this.updateEnemyTurn}
            updateEnemyDisplayArr = {this.updateEnemyDisplayArr}
            exchangeAttacks = {this.props.exchangeAttacks}
            updateEnemyManager = {this.updateEnemyManager}
            updateGameClassState = {this.props.updateGameClassState}  />
        );
    });

    if (enemyDisplay.name) {
      containerHeader = enemyDisplay.type === 'merchant' ? 'Merchant' : 'Enemy';
      displayName = enemyDisplay.name;
      displayType = enemyDisplay.type[0].toUpperCase() + enemyDisplay.type.slice(1);
      displayLevel = enemyDisplay.level;
      displayHealth = `${enemyDisplay.curHealth}/${enemyDisplay.maxHealth}`;
      healthTitleWidth = '6em';
      healthMaxWidthStyle = healthMaxWidth + 'em';
      healthBorder = '1px solid rgb(0, 0, 0)'
      healthPercent = ~~(enemyDisplay.curHealth / enemyDisplay.maxHealth * 100);
      healthWidth = healthPercent + `%`;
      healthColor = healthPercent > 70 ? 'rgba(0,255,0,.8)' :
        healthPercent > 30 ? 'rgba(255,255,0,.8)' :
        'rgba(255,0,0,.7)'
    }


    return (
      <div className='enemy-manager'>
        <p className='enemy-manager-title'>
          {containerHeader}
        </p>
        <canvas id='enemy-icon' className='enemy-icon' width={ts} height={ts} />
        <div className='stat-col'>
          <p><span>{displayName ? 'Name: ' : null}</span><span>{displayName}</span></p>
          <p><span>{displayType ? 'Type: ' : null}</span><span>{displayType}</span></p>
          <p><span>{displayLevel ? 'Level: ' : null}</span><span>{displayLevel}</span></p>
          <p className='enemy-health-row'>
            <span
              className='enemy-health-row-title'
              style={{width: healthTitleWidth}}
            >
              <span className='health-text'>{displayHealth ? 'Health: ' : null}</span>
            </span>
            <span
              id='enemy-health'
              className='enemy-health'
              style={{width: healthMaxWidthStyle, border: healthBorder}}
            >
              <span className='enemy-health-number'>{displayHealth}</span>
              <span
                id='enemy-health-gauge'
                className='enemy-health-gauge'
                style={{width: healthWidth, background: healthColor}}
              >

              </span>
            </span>
          </p>
        </div>
        {enemies}
      </div>
    );
  }
}
