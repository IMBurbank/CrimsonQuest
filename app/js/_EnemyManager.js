'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//gameLevel, bgArr, floorCoords, playerArr, enemyArr, enemyAttack, exchangeAttacks,
//moveCount, updateGameClassState, tileSize, floor, enemyPalettes, enemyDead
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

    _this.pollCount = -1;

    _this.enemyTurn = [];
    //enemyTurn: [{ type: '', source: {}, stats: {}, fromCoord: [], toCoord: [], status: bool },]
    //type: 'move', 'stay', 'attack', 'die'

    _this.state = {
      roundCount: 0,
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
    key: 'setLevelEnemies',
    value: function setLevelEnemies() {
      var gameLevel = this.props.gameLevel,
          len = this.props.bgArr.length,
          enemyList = [enemyAvian /*,
                                  enemyDemon,
                                  enemyElemental,
                                  enemyHumanoid,
                                  enemyReptile,
                                  enemyUndead*/
      ];
      var floorCoords = [].concat(_toConsumableArray(this.props.floorCoords)),
          enemyArr = initZeroArray(len),
          nextKey = this.state.nextKey,
          levelEnemies = [],
          spawnCoord = [],
          source = {},
          el = null,
          enemiesRemaining = 0,
          count = 0,
          i = 0;


      enemyList.forEach(function (obj) {
        for (el in obj) {
          source = obj[el];
          count = source.spawnQuant['' + gameLevel];
          enemiesRemaining += count;

          while (i < count) {
            spawnCoord = floorCoords.splice(randInt(0, floorCoords.length - 1), 1)[0];
            enemyArr[spawnCoord[0]][spawnCoord[1]] = source;
            nextKey++;

            levelEnemies.push({ source: source, spawnCoord: spawnCoord, key: nextKey });
            i++;
          }
        }
      });

      if (this.enemyTurn.length < enemiesRemaining) this.enemyTurn.length = enemiesRemaining;

      this.props.updateGameClassState({ floorCoords: floorCoords, enemyArr: enemyArr });

      this.setState({
        levelEnemies: levelEnemies,
        enemiesRemaining: enemiesRemaining,
        nextKey: nextKey,
        levelProcessed: gameLevel,
        roundEnemyArr: enemyArr
      });
    }
  }, {
    key: 'runEnemyRound',
    value: function runEnemyRound(props) {
      console.log('starting runEnemyRound');
      var exchangeAttacks = props.exchangeAttacks,
          enemyAttack = props.enemyAttack;
      var enemyTurn = [].concat(_toConsumableArray(this.enemyTurn)),
          roundEnemyArr = [].concat(_toConsumableArray(this.state.roundEnemyArr)),
          _state = this.state,
          roundCount = _state.roundCount,
          currentIndex = _state.currentIndex,
          levelEnemies = _state.levelEnemies,
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
          if (exchangeAttacks.spawnIndex === currentIndex) {
            enemyTurn[currentIndex].status = true;
          } else {
            count = enemyAttack.count + 1;
            spawnIndex = currentIndex;

            props.updateGameClassState({ enemyAttack: { count: count, roundCount: roundCount, spawnIndex: spawnIndex, stats: stats, source: source } });
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

      this.enemyTurn = [].concat(enemyTurn);
      this.setState({ roundEnemyArr: roundEnemyArr, currentIndex: currentIndex, roundCount: roundCount });
    }
  }, {
    key: 'handleEnemyDead',
    value: function handleEnemyDead(enemyDead) {
      var coord = enemyDead.coord;
      var roundEnemyArr = this.state.roundEnemyArr;


      roundEnemyArr[coord[0]][coord[1]] = 0;

      this.setState({ roundEnemyArr: roundEnemyArr });
    }
  }, {
    key: 'updateEnemyManager',
    value: function updateEnemyManager() {
      var updatedEls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState(updatedEls);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.pollCount === -1 && this.state.levelEnemies.length && this.props.moveCount !== nextProps.moveCount) {
        console.log('EnemyManager recieveProps - setPollCount 0');
        this.pollCount = 0;
      }
      if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count && this.pollCount > 0) {

        this.runEnemyRound(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.levelProcessed !== this.props.gameLevel && Object.keys(this.props.enemyPalettes).length) {

        this.setLevelEnemies();
      }
      if (prevProps.enemyDead.count !== this.props.enemyDead.count) {
        this.handleEnemyDead(this.props.enemyDead);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var levelEnemies = this.state.levelEnemies;


      var enemies = [],
          spawnCoord = [],
          source = {},
          key = 0;

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
          enemyArr: _this2.props.enemyArr,
          roundEnemyArr: _this2.state.roundEnemyArr,
          enemyPalettes: _this2.props.enemyPalettes,
          enemyDead: _this2.props.enemyDead,
          pollCount: _this2.pollCount,
          incrementPollCount: _this2.incrementPollCount,
          roundCount: _this2.state.roundCount,
          enemyTurn: _this2.enemyTurn,
          updateEnemyTurn: _this2.updateEnemyTurn,
          exchangeAttacks: _this2.props.exchangeAttacks,
          updateEnemyManager: _this2.updateEnemyManager,
          updateGameClassState: _this2.props.updateGameClassState }));
      });

      return React.createElement(
        'div',
        { className: 'enemy-manager' },
        'Enemy Stats',
        enemies
      );
    }
  }]);

  return EnemyManager;
}(React.Component);