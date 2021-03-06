'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Enemy = function (_React$Component) {
  _inherits(Enemy, _React$Component);

  function Enemy(props) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, props));

    _this.initEnemy = _this.initEnemy.bind(_this);
    _this.chooseMove = _this.chooseMove.bind(_this);
    _this.attemptMove = _this.attemptMove.bind(_this);
    _this.completeMove = _this.completeMove.bind(_this);
    _this.stay = _this.stay.bind(_this);
    _this.attack = _this.attack.bind(_this);
    _this.die = _this.die.bind(_this);
    _this.takeDamage = _this.takeDamage.bind(_this);
    _this.startTurn = _this.startTurn.bind(_this);
    _this.updateEnemyDisplay = _this.updateEnemyDisplay.bind(_this);

    _this.state = {
      level: 0,
      maxHealth: 0,
      curHealth: 0,
      baseStats: {},
      position: [],
      icon: null
    };
    return _this;
  }

  _createClass(Enemy, [{
    key: 'initEnemy',
    value: function initEnemy() {
      var _props = this.props,
          source = _props.source,
          tileSize = _props.tileSize,
          enemyPalettes = _props.enemyPalettes,
          level = randInt(source.levelRange[0], source.levelRange[1]),
          bStats = source.baseStats,
          onLvl = source.onLevelUp,
          position = this.props.spawnCoord,
          convert = statConversion,
          smoothingEnabled = false;


      var icon = document.createElement('canvas'),
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

      ctx.drawImage(enemyPalettes[source.palette[0]], source.iconLoc[0], source.iconLoc[1], tileSize, tileSize, 0, 0, tileSize, tileSize);

      for (el in bStats) {
        stat = bStats[el];
        if (onLvl[el]) stat += level * onLvl[el];
        baseStats[el] = stat;
      }

      maxHealth = baseStats.bHealth + convert.vitToHp * baseStats.bVitality + convert.durToHp * baseStats.bDurability;
      curHealth = maxHealth;

      this.updateEnemyDisplay(position, curHealth, maxHealth, level, icon);
      this.setState({ level: level, maxHealth: maxHealth, curHealth: curHealth, baseStats: baseStats, position: position, icon: icon });
    }
  }, {
    key: 'updateEnemyDisplay',
    value: function updateEnemyDisplay() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.position;
      var curHealth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.curHealth;
      var maxHealth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.maxHealth;
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.state.level;
      var icon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.state.icon;
      var _props2 = this.props,
          source = _props2.source,
          spawnIndex = _props2.spawnIndex;


      var enemyDisplay = {
        position: position,
        curHealth: curHealth,
        maxHealth: maxHealth,
        level: level,
        icon: icon,
        source: source,
        name: source.name,
        type: source.type
      };

      this.props.updateEnemyDisplayArr(enemyDisplay, spawnIndex);
    }
  }, {
    key: 'chooseMove',
    value: function chooseMove(fromCoord, playerArr, roundEnemyArr, bgArr) {
      var floor = this.props.floor,
          h = 1.001,
          blocked = 1000,
          countMax = 100;


      var openStack = [],
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

      costToGoal = h * (Math.abs(fromCoord[0] - playerArr[0]) + Math.abs(fromCoord[1] - playerArr[1]));
      fCost = costToGoal;
      explored['' + fromCoord] = { costToSpace: costToSpace, costToGoal: costToGoal, fCost: fCost, coord: fromCoord, parent: {} };
      openSet['' + fromCoord] = explored['' + fromCoord];
      openStack.push(openSet['' + fromCoord]);

      while (!(openStack[0].coord[0] === playerArr[0] && openStack[0].coord[1] === playerArr[1])) {
        current = openStack.shift();
        row = current.coord[0];
        col = current.coord[1];
        count++;

        delete openSet['' + current.coord];

        [[row - 1, col], [row + 1, col], [row, col + 1], [row, col - 1]].forEach(function (neighbor) {
          if (bgArr[neighbor[0]][neighbor[1]] > floor && !roundEnemyArr[neighbor[0]][neighbor[1]]) {
            nextStep = 1;
          } else {
            nextStep = blocked;
          }
          costToSpace = current.costToSpace + nextStep;

          if (openSet['' + neighbor] && costToSpace < openSet['' + neighbor].costToSpace) {
            index = openStack.findIndex(function (el) {
              return el[0] === neighbor[0] && el[1] === neighbor[1];
            });
            openStack.splice(index, 1);
            delete openSet['' + neighbor];
          }
          if (closedSet['' + neighbor] && costToSpace < closedSet['' + neighbor].costToSpace) {
            delete closedSet['' + neighbor];
          }
          if (!openSet['' + neighbor] && !closedSet['' + neighbor]) {
            costToGoal = h * (Math.abs(neighbor[0] - playerArr[0]) + Math.abs(neighbor[1] - playerArr[1]));
            fCost = costToSpace + costToGoal;
            parent = explored['' + current.coord];
            explored['' + neighbor] = { costToSpace: costToSpace, costToGoal: costToGoal, fCost: fCost, parent: parent, coord: neighbor };
            openSet['' + neighbor] = explored['' + neighbor];
            index = openStack.findIndex(function (el) {
              return fCost < el.fCost;
            });
            if (index > -1) openStack.splice(index, 0, openSet['' + neighbor]);else openStack.push(openSet['' + neighbor]);
          }
        });
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
  }, {
    key: 'attemptMove',
    value: function attemptMove(nextProps) {
      var bgArr = nextProps.bgArr,
          roundEnemyArr = nextProps.roundEnemyArr,
          playerArr = nextProps.playerArr,
          source = nextProps.source,
          stats = this.state.baseStats,
          fromCoord = this.state.position,
          toCoord = [],
          turn = {};


      toCoord = this.chooseMove(fromCoord, playerArr, roundEnemyArr, bgArr);
      stats.curHealth = this.state.curHealth;
      turn = {
        stats: stats,
        source: source,
        fromCoord: fromCoord,
        toCoord: toCoord,
        type: 'move',
        status: false
      };

      this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
      this.props.incrementPollCount();
    }
  }, {
    key: 'completeMove',
    value: function completeMove(position) {
      this.updateEnemyDisplay(position);
      this.setState({ position: [].concat(_toConsumableArray(position)) });
    }
  }, {
    key: 'stay',
    value: function stay(nextProps) {
      var stats = this.state.baseStats,
          coord = this.state.position,
          turn = {};

      stats.curHealth = this.state.curHealth;
      turn = {
        stats: stats,
        type: 'stay',
        source: nextProps.source,
        fromCoord: coord,
        toCoord: coord,
        status: false
      };

      this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
      this.props.incrementPollCount();
    }
  }, {
    key: 'attack',
    value: function attack(nextProps) {
      var playerArr = nextProps.playerArr,
          source = nextProps.source,
          stats = this.state.baseStats,
          fromCoord = this.state.position,
          turn = {};


      stats.curHealth = this.state.curHealth;
      turn = {
        stats: stats,
        source: source,
        fromCoord: fromCoord,
        type: 'attack',
        toCoord: playerArr,
        status: false
      };

      this.props.updateEnemyTurn(turn, nextProps.spawnIndex);
      this.props.incrementPollCount();
    }
  }, {
    key: 'die',
    value: function die() {
      var _state = this.state,
          position = _state.position,
          level = _state.level,
          _props3 = this.props,
          spawnIndex = _props3.spawnIndex,
          source = _props3.source,
          enemyDead = Object.assign(this.props.enemyDead),
          conv = statConversion;


      var experience = 0,
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
      enemyDead.source = source, enemyDead.level = level;
      enemyDead.experience = ~~experience;
      enemyDead.gold = ~~gold;

      this.props.updateGameClassState({ enemyDead: enemyDead });
    }
  }, {
    key: 'takeDamage',
    value: function takeDamage(attacks) {
      var curHealth = this.state.curHealth,
          damage = 0;


      attacks.forEach(function (el) {
        if (el.from === 'hero') damage = el.damage;
      });

      curHealth = curHealth - damage > 0 ? curHealth - damage : 0;

      //console.log('Hit health - damage: ', curHealth, damage);

      if (!curHealth) this.die();

      this.updateEnemyDisplay(this.state.position, curHealth);
      this.setState({ curHealth: curHealth });
    }
  }, {
    key: 'startTurn',
    value: function startTurn(nextProps) {
      var _state2 = this.state,
          position = _state2.position,
          curHealth = _state2.curHealth,
          playerArr = nextProps.playerArr,
          aggression = nextProps.source.aggression;


      if (curHealth < 1 || linearDistance(position, playerArr) > aggression) {
        this.stay(nextProps);
      } else if (playerArr[0] === position[0] && Math.pow(playerArr[1] - position[1], 2) === 1 || playerArr[1] === position[1] && Math.pow(playerArr[0] - position[0], 2) === 1) {
        this.attack(nextProps);
      } else if (aggression + 94 > randInt(1, 100)) {
        this.attemptMove(nextProps);
      } else {
        this.stay(nextProps);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initEnemy();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.pollCount === 0 && this.props.moveCount !== nextProps.moveCount) {

        this.startTurn(nextProps);
      }
      if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count && nextProps.exchangeAttacks.spawnIndex === nextProps.spawnIndex) {

        this.takeDamage(nextProps.exchangeAttacks.attacks);
      }
      if (this.props.roundCount !== nextProps.roundCount && nextProps.enemyTurn[this.props.spawnIndex].type === 'move' && nextProps.enemyTurn[this.props.spawnIndex].status) {

        this.completeMove(nextProps.enemyTurn[nextProps.spawnIndex].toCoord);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement('div', null);
    }
  }]);

  return Enemy;
}(React.Component);