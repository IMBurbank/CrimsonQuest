

//gameLevel, bgArr, floorCoords, playerArr, enemyArr, enemyAttack, exchangeAttacks,
//moveCount, updateGameClassState, tileSize, floor, enemyPalettes, enemyDead
class EnemyManager extends React.Component {
  constructor(props) {
    super(props);
    this.setLevelEnemies = this.setLevelEnemies.bind(this);
    this.runEnemyRound = this.runEnemyRound.bind(this);
    this.handleEnemyDead = this.handleEnemyDead.bind(this);
    this.updateEnemyManager = this.updateEnemyManager.bind(this);
    this.incrementPollCount = this.incrementPollCount.bind(this);
    this.updateEnemyTurn = this.updateEnemyTurn.bind(this);

    this.pollCount = -1;

    this.enemyTurn = [];
    //enemyTurn: [{ type: '', source: {}, stats: {}, fromCoord: [], toCoord: [], status: bool },]
    //type: 'move', 'stay', 'attack', 'die'

    this.state = ({
      roundCount: 0,
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

  setLevelEnemies() {
    const {gameLevel} = this.props,
      len = this.props.bgArr.length,
      enemyList = [
        enemyAvian/*,
        enemyDemon,
        enemyElemental,
        enemyHumanoid,
        enemyReptile,
        enemyUndead*/
      ];

    let floorCoords = [...this.props.floorCoords],
      enemyArr = initZeroArray(len),
      {nextKey} = this.state,
      levelEnemies = [],
      spawnCoord = [],
      source = {},
      el = null,
      enemiesRemaining = 0,
      count = 0,
      i = 0;

    enemyList.forEach( obj => {
      for (el in obj) {
        source = obj[el];
        count = source.spawnQuant['' + gameLevel];
        enemiesRemaining += count;

        while (i < count) {
          spawnCoord = floorCoords.splice(randInt(0, floorCoords.length - 1), 1)[0];
          enemyArr[spawnCoord[0]][spawnCoord[1]] = source;
          nextKey++;

          levelEnemies.push({source, spawnCoord, key: nextKey});
          i++;
        }
      }
    });

    if (this.enemyTurn.length < enemiesRemaining) this.enemyTurn.length = enemiesRemaining;

    this.props.updateGameClassState({ floorCoords, enemyArr});

    this.setState({
      levelEnemies,
      enemiesRemaining,
      nextKey,
      levelProcessed: gameLevel,
      roundEnemyArr: enemyArr
    });
  }

  runEnemyRound(props) {
    console.log('starting runEnemyRound');
    const {exchangeAttacks, enemyAttack} = props;

    let enemyTurn = [...this.enemyTurn],
      roundEnemyArr = [...this.state.roundEnemyArr],
      {roundCount, currentIndex, levelEnemies} = this.state,
      nState = {},
      type = '',
      source = {},
      stats = {},
      toCoord = [],
      fromCoord = [],
      status = false,
      spawnIndex = 0,
      count = 0;

    //console.log('EnemyRound enemyTurn: ', enemyTurn, 'roundCount: ', roundCount, 'currentIndex: ', currentIndex, 'this.pollCount: ', this.pollCount);

    while (currentIndex < this.pollCount) {
      ({type, source, stats, fromCoord, toCoord, status} = enemyTurn[currentIndex]);

      if (type === 'stay') {
        enemyTurn[currentIndex].status = true;
      } else if (type === 'move') {
        status =  roundEnemyArr[toCoord[0]][toCoord[1]] === 0 ? true : false;
        //console.log('start Move - currentIndex, fromCoord, toCoord, status: ', currentIndex, fromCoord, toCoord, status);

        if (status) {
          roundEnemyArr[fromCoord[0]][fromCoord[1]] = 0;
          roundEnemyArr[toCoord[0]][toCoord[1]] = source;
        }
        enemyTurn[currentIndex].status = status;
      } else if (type === 'attack') {
        if (exchangeAttacks.spawnIndex === currentIndex) {
          enemyTurn[currentIndex].status = true;
        } else {
          count = enemyAttack.count + 1;
          spawnIndex = currentIndex;

          props.updateGameClassState({enemyAttack: {count, roundCount, spawnIndex, stats, source}});
          break;
        }
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

  handleEnemyDead(enemyDead) {
    const {coord} = enemyDead;

    let {roundEnemyArr} = this.state;

    roundEnemyArr[coord[0]][coord[1]] = 0;

    this.setState({ roundEnemyArr });
  }

  updateEnemyManager(updatedEls = {}) {
    this.setState(updatedEls);
  }

  componentWillReceiveProps(nextProps) {
    if (this.pollCount === -1 &&
      this.state.levelEnemies.length &&
      this.props.moveCount !== nextProps.moveCount) {
      console.log('EnemyManager recieveProps - setPollCount 0');
      this.pollCount = 0;
    }
    if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count &&
      this.pollCount > 0) {

      this.runEnemyRound(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.levelProcessed !== this.props.gameLevel &&
      Object.keys(this.props.enemyPalettes).length) {

      this.setLevelEnemies();
    }
    if (prevProps.enemyDead.count !== this.props.enemyDead.count) {
      this.handleEnemyDead(this.props.enemyDead);
    }
  }

  render() {
    const {levelEnemies} = this.state;

    let enemies = [],
      spawnCoord = [],
      source = {},
      key = 0;

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
          enemyArr = {this.props.enemyArr}
          roundEnemyArr = {this.state.roundEnemyArr}
          enemyPalettes = {this.props.enemyPalettes}
          enemyDead = {this.props.enemyDead}
          pollCount = {this.pollCount}
          incrementPollCount = {this.incrementPollCount}
          roundCount = {this.state.roundCount}
          enemyTurn = {this.enemyTurn}
          updateEnemyTurn = {this.updateEnemyTurn}
          exchangeAttacks = {this.props.exchangeAttacks}
          updateEnemyManager = {this.updateEnemyManager}
          updateGameClassState = {this.props.updateGameClassState}  />
        );
    });


    return (
      <div className='enemy-manager'>
        Enemy Stats
        {enemies}
      </div>
    );
  }
}
