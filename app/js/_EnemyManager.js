'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//gameLevel, bgArr, floorCoords, playerArr, enemyArr, enemyAttack, exchangeAttacks,
//moveCount, updateGameClassState, tileSize, floor, enemyPalettes, enemyDead, bgLevelProcessed
var EnemyManager = function (_React$Component) {
  _inherits(EnemyManager, _React$Component);

  function EnemyManager(props) {
    _classCallCheck(this, EnemyManager);

    var _this = _possibleConstructorReturn(this, (EnemyManager.__proto__ || Object.getPrototypeOf(EnemyManager)).call(this, props));

    _this.setLevelEnemies = _this.setLevelEnemies.bind(_this);
    _this.runEnemyRound = _this.runEnemyRound.bind(_this);
    _this.handleEnemyDead = _this.handleEnemyDead.bind(_this);
    _this.updateEnemyManager = _this.updateEnemyManager.bind(_this);
    _this.incrementPollCount = _this.incrementPollCount.bind(_this);
    _this.updateEnemyTurn = _this.updateEnemyTurn.bind(_this);
    _this.updateEnemyDisplayArr = _this.updateEnemyDisplayArr.bind(_this);
    _this.setEnemyDisplay = _this.setEnemyDisplay.bind(_this);
    _this.drawEnemyIcon = _this.drawEnemyIcon.bind(_this);

    _this.pollCount = -1;
    _this.enemyDeadCount = 0;
    _this.enemyTurn = [];
    //enemyTurn: [{ type: '', source: {}, stats: {}, fromCoord: [], toCoord: [], status: bool },]
    //type: 'move', 'stay', 'attack', 'die'

    _this.enemyDisplayArr = [];
    //{name: '', type: '', icon: <memCanvas>, level: 0, curHealth: 0, maxHealth: 0, position: []}
    _this.enemyDisplay = {};

    _this.state = {
      roundCount: 0,
      displayCount: 0,
      levelProcessed: 0,
      enemiesRemaining: 0,
      currentIndex: 0,
      levelEnemies: [],
      roundEnemyArr: [],
      nextKey: 0

    };
    return _this;
  }

  _createClass(EnemyManager, [{
    key: 'incrementPollCount',
    value: function incrementPollCount() {
      this.pollCount++;

      if (this.pollCount === this.state.levelEnemies.length) {
        this.runEnemyRound(this.props);
      }
    }
  }, {
    key: 'updateEnemyTurn',
    value: function updateEnemyTurn(turn, index) {
      this.enemyTurn[index] = turn;
    }
  }, {
    key: 'updateEnemyDisplayArr',
    value: function updateEnemyDisplayArr(enemy, index) {
      this.enemyDisplayArr[index] = enemy;
    }
  }, {
    key: 'setLevelEnemies',
    value: function setLevelEnemies() {
      var _props = this.props,
          gameLevel = _props.gameLevel,
          bgLevelProcessed = _props.bgLevelProcessed,
          bgArr = _props.bgArr,
          len = bgArr.length,
          enemyList = [enemyAvian, enemyDemon, enemyElemental, enemyHumanoid, enemyReptile, enemyUndead],
          centerFloorSpace = 45;
      var floorCoords = [].concat(_toConsumableArray(this.props.floorCoords)),
          enemyArr = initZeroArray(len),
          nextKey = this.state.nextKey,
          levelEnemies = [],
          spawnCoord = [],
          curCoord = [0, 0],
          curIndex = 0,
          source = {},
          el = null,
          enemiesRemaining = 0,
          count = 0,
          i = 0;


      enemyList.forEach(function (obj) {
        for (el in obj) {
          source = obj[el];
          count = source.spawnQuant['' + gameLevel] ? source.spawnQuant['' + gameLevel] : 0;
          enemiesRemaining += count;
          i = 0;

          while (i < count) {
            if (source.type === 'merchant') {
              while (!(bgArr[curCoord[0]][curCoord[1]] === centerFloorSpace && bgArr[curCoord[0] - 1][curCoord[1]] === centerFloorSpace && bgArr[curCoord[0]][curCoord[1] + 1] === centerFloorSpace && bgArr[curCoord[0] + 1][curCoord[1]] === centerFloorSpace && bgArr[curCoord[0]][curCoord[1] - 1] === centerFloorSpace)) {
                curIndex = randInt(0, floorCoords.length - 1);
                curCoord = floorCoords[curIndex];
              }
              spawnCoord = floorCoords.splice(curIndex, 1)[0];
              console.log('Merchant at: ', spawnCoord);
            } else {
              spawnCoord = floorCoords.splice(randInt(0, floorCoords.length - 1), 1)[0];
            }

            enemyArr[spawnCoord[0]][spawnCoord[1]] = source;
            nextKey++;

            levelEnemies.push({ source: source, spawnCoord: spawnCoord, key: nextKey });
            i++;

            if (source.boss) console.log('Boss at: ', spawnCoord);
          }
        }
      });

      this.enemyTurn.length = enemiesRemaining;
      this.enemyDisplayArr.length = enemiesRemaining;

      this.props.updateGameClassState({ floorCoords: floorCoords, enemyArr: enemyArr });

      this.setState({
        levelEnemies: levelEnemies,
        enemiesRemaining: enemiesRemaining,
        nextKey: nextKey,
        levelProcessed: bgLevelProcessed,
        roundEnemyArr: enemyArr
      });
    }
  }, {
    key: 'runEnemyRound',
    value: function runEnemyRound(props) {
      var enemyAttack = props.enemyAttack;
      var enemyTurn = [].concat(_toConsumableArray(this.enemyTurn)),
          roundEnemyArr = [].concat(_toConsumableArray(this.state.roundEnemyArr)),
          _state = this.state,
          roundCount = _state.roundCount,
          currentIndex = _state.currentIndex,
          levelEnemies = _state.levelEnemies,
          count = enemyAttack.count,
          type = '',
          source = {},
          stats = {},
          toCoord = [],
          fromCoord = [],
          status = false,
          spawnIndex = 0;

      //console.log('EnemyRound enemyTurn: ', enemyTurn, 'roundCount: ', roundCount, 'currentIndex: ', currentIndex, 'this.pollCount: ', this.pollCount);

      while (currentIndex < this.pollCount) {
        var _enemyTurn$currentInd = enemyTurn[currentIndex];
        type = _enemyTurn$currentInd.type;
        source = _enemyTurn$currentInd.source;
        stats = _enemyTurn$currentInd.stats;
        fromCoord = _enemyTurn$currentInd.fromCoord;
        toCoord = _enemyTurn$currentInd.toCoord;
        status = _enemyTurn$currentInd.status;


        if (type === 'stay') {
          enemyTurn[currentIndex].status = true;
        } else if (type === 'move') {
          status = roundEnemyArr[toCoord[0]][toCoord[1]] === 0 ? true : false;
          //console.log('start Move - currentIndex, fromCoord, toCoord, status: ', currentIndex, fromCoord, toCoord, status);

          if (status) {
            roundEnemyArr[fromCoord[0]][fromCoord[1]] = 0;
            roundEnemyArr[toCoord[0]][toCoord[1]] = source;
          }
          enemyTurn[currentIndex].status = status;
        } else if (type === 'attack') {
          count++;
          spawnIndex = currentIndex;
          enemyTurn[currentIndex].status = true;

          props.updateGameClassState({ enemyAttack: { count: count, roundCount: roundCount, spawnIndex: spawnIndex, stats: stats, source: source } });
        }
        currentIndex++;
      }

      if (currentIndex === levelEnemies.length) {
        currentIndex = 0;
        this.pollCount = 0;
        roundCount++;

        props.updateGameClassState({ enemyArr: roundEnemyArr });
      }

      this.enemyTurn = [].concat(enemyTurn);
      this.setState({ roundEnemyArr: roundEnemyArr, currentIndex: currentIndex, roundCount: roundCount });
    }
  }, {
    key: 'handleEnemyDead',
    value: function handleEnemyDead(nextProps) {
      var enemyDead = nextProps.enemyDead,
          coord = enemyDead.coord,
          count = enemyDead.count;
      var enemyArr = nextProps.enemyArr,
          roundEnemyArr = this.state.roundEnemyArr;


      roundEnemyArr[coord[0]][coord[1]] = 0;
      enemyArr = [].concat(_toConsumableArray(roundEnemyArr));
      this.enemyDeadCount = count;

      nextProps.updateGameClassState({ enemyArr: enemyArr });
      this.setState({ roundEnemyArr: roundEnemyArr });
    }
  }, {
    key: 'updateEnemyManager',
    value: function updateEnemyManager() {
      var updatedEls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState(updatedEls);
    }
  }, {
    key: 'drawEnemyIcon',
    value: function drawEnemyIcon(icon) {
      var ts = this.props.tileSize;

      var ctx = getById('enemy-icon').getContext('2d');

      if (icon) ctx.drawImage(icon, 0, 0);else ctx.clearRect(0, 0, ts, ts);
    }
  }, {
    key: 'setEnemyDisplay',
    value: function setEnemyDisplay(nextProps, nextState) {
      var playerArr = nextProps.playerArr,
          enemyDisplayArr = this.enemyDisplayArr,
          displayRange = 3;


      var displayChoice = {},
          position = [],
          icon = null,
          updateDisplayChoice = false,
          distance = 0,
          healthLost = 0,
          maxHealth = 0,
          curHealth = 0,
          index = 0;

      enemyDisplayArr.forEach(function (el, i) {
        if (el && el.curHealth) {
          updateDisplayChoice = false;
          position = enemyDisplayArr[i].position;
          distance = Math.abs(playerArr[0] - position[0]) + Math.abs(playerArr[1] - position[1]);

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
              displayChoice = { position: position, distance: distance, index: index, maxHealth: maxHealth, curHealth: curHealth, healthLost: healthLost };
            }
          }
        }
      });

      if (!(displayChoice.index && enemyDisplayArr[displayChoice.index].curHealth === this.enemyDisplay.curHealth && enemyDisplayArr[displayChoice.index].name === this.enemyDisplay.name && enemyDisplayArr[displayChoice.index].level === this.enemyDisplay.level)) {

        this.enemyDisplay = displayChoice.curHealth ? enemyDisplayArr[displayChoice.index] : {};
        icon = this.enemyDisplay.icon ? this.enemyDisplay.icon : false;

        this.drawEnemyIcon(icon);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.pollCount === -1 && this.state.levelEnemies.length && this.props.moveCount !== nextProps.moveCount) {
        this.pollCount = 0;
      }
      if (this.enemyDeadCount !== nextProps.enemyDead.count) {
        this.handleEnemyDead(nextProps);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.moveCount !== nextProps.moveCount || this.state.displayCount !== nextState.displayCount) {
        this.setEnemyDisplay(nextProps, nextState);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.levelProcessed !== this.props.bgLevelProcessed && Object.keys(this.props.enemyPalettes).length) {

        this.setLevelEnemies();
        console.log('New Level Enemies');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var levelEnemies = this.state.levelEnemies,
          ts = this.props.tileSize,
          enemyDisplay = this.enemyDisplay;


      var enemies = [],
          spawnCoord = [],
          source = {},
          key = 0,
          displayName = null,
          displayType = null,
          displayLevel = null,
          displayHealth = null;

      levelEnemies.forEach(function (obj) {
        source = obj.source;
        spawnCoord = obj.spawnCoord;
        key = obj.key;


        enemies.push(React.createElement(Enemy, {
          key: source.name + key,
          source: source,
          spawnIndex: enemies.length,
          spawnCoord: spawnCoord,
          floor: _this2.props.floor,
          tileSize: _this2.props.tileSize,
          bgArr: _this2.props.bgArr,
          playerArr: _this2.props.playerArr,
          moveCount: _this2.props.moveCount,
          displayCount: _this2.state.displayCount,
          enemyArr: _this2.props.enemyArr,
          roundEnemyArr: _this2.state.roundEnemyArr,
          enemyPalettes: _this2.props.enemyPalettes,
          enemyDead: _this2.props.enemyDead,
          pollCount: _this2.pollCount,
          incrementPollCount: _this2.incrementPollCount,
          roundCount: _this2.state.roundCount,
          enemyTurn: _this2.enemyTurn,
          enemyDisplayArr: _this2.enemyDisplayArr,
          updateEnemyTurn: _this2.updateEnemyTurn,
          updateEnemyDisplayArr: _this2.updateEnemyDisplayArr,
          exchangeAttacks: _this2.props.exchangeAttacks,
          updateEnemyManager: _this2.updateEnemyManager,
          updateGameClassState: _this2.props.updateGameClassState }));
      });

      if (enemyDisplay.name) {
        displayName = 'Name: ' + enemyDisplay.name;
        displayType = 'Type: ' + enemyDisplay.type;
        displayLevel = 'Level: ' + enemyDisplay.level;
        displayHealth = 'Health: ' + enemyDisplay.curHealth + '/' + enemyDisplay.maxHealth;
      }

      return React.createElement(
        'div',
        { className: 'enemy-manager' },
        React.createElement(
          'p',
          { className: 'enemy-manager-title' },
          enemyDisplay.type === 'merchant' ? 'Merchant' : 'Enemy'
        ),
        React.createElement('canvas', { id: 'enemy-icon', className: 'enemy-icon', width: ts, height: ts }),
        React.createElement(
          'div',
          { className: 'stat-col' },
          React.createElement(
            'p',
            null,
            displayName
          ),
          React.createElement(
            'p',
            null,
            displayType
          ),
          React.createElement(
            'p',
            null,
            displayLevel
          ),
          React.createElement(
            'p',
            null,
            displayHealth
          )
        ),
        enemies
      );
    }
  }]);

  return EnemyManager;
}(React.Component);