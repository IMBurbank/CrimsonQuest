'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//gameLevel, bgArr, floorCoords, playerArr, enemyArr, enemyAttack, exchangeAttacks, portalObjective
//moveCount, updateGameClassState, tileSize, floor, enemyPalettes, enemyDead, itemLevelProcessed
var EnemyManager = function (_React$Component) {
  _inherits(EnemyManager, _React$Component);

  function EnemyManager(props) {
    _classCallCheck(this, EnemyManager);

    var _this = _possibleConstructorReturn(this, (EnemyManager.__proto__ || Object.getPrototypeOf(EnemyManager)).call(this, props));

    _this.getManagerImages = _this.getManagerImages.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.resetMerchantInventories = _this.resetMerchantInventories.bind(_this);
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
    //{name: '', type: '', icon: <memCanvas>, level: 0, curHealth: 0, maxHealth: 0, position: [], source: {}}
    _this.enemyDisplay = {};

    _this.bossDead = false;

    _this.srcTileSize = 16;
    _this.renderSmoothing = false;
    _this.imgArrowCropDimensions = {
      srcX: 2,
      srcY: 41,
      firstRowTiles: 5,
      tileCount: 8,
      arrowOrder: [2, 6, 4, 0, 1, 7, 3, 5]
    };

    _this.state = {
      roundCount: 0,
      levelProcessed: 0,
      enemiesRemaining: 0,
      currentIndex: 0,
      displayUpdateCount: 0,
      levelEnemies: [],
      roundEnemyArr: [],
      nextKey: 0,
      interfaceImage: null,
      arrowCanvases: []
    };
    return _this;
  }

  _createClass(EnemyManager, [{
    key: 'getManagerImages',
    value: function getManagerImages() {
      var that = this;

      var interfaceImage = new Image();

      var handleManagerLoad = function handleManagerImageLoad() {
        that.setState({ interfaceImage: interfaceImage });
        that.setPalettes(interfaceImage);
      };

      interfaceImage.src = 'img/gui/ToenTileSet.png';
      interfaceImage.addEventListener('load', handleManagerLoad);
    }
  }, {
    key: 'resetMerchantInventories',
    value: function resetMerchantInventories() {
      for (var merchant in merchantInventories) {
        enemyHumanoid[merchant].inventory = Object.assign({}, merchantInventories[merchant]);
      }
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(img) {
      var tileSize = this.props.tileSize,
          srcTs = this.srcTileSize,
          renderSmoothing = this.renderSmoothing;
      var arrowCanvases = this.state.arrowCanvases,
          _imgArrowCropDimensio = this.imgArrowCropDimensions,
          srcX = _imgArrowCropDimensio.srcX,
          srcY = _imgArrowCropDimensio.srcY,
          firstRowTiles = _imgArrowCropDimensio.firstRowTiles,
          tileCount = _imgArrowCropDimensio.tileCount,
          arrowOrder = _imgArrowCropDimensio.arrowOrder,
          canv = null,
          ctx = null,
          i = 0;


      if (arrowCanvases.length < tileCount) arrowCanvases.length = tileCount;

      for (; i < tileCount; i++) {
        canv = document.createElement('canvas');
        canv.width = tileSize;
        canv.height = tileSize;

        ctx = canv.getContext('2d');
        ctx.imageSmoothingEnabled = renderSmoothing;

        if (i === firstRowTiles) srcY++, srcX = 0;

        ctx.drawImage(img, srcTs * srcX, srcTs * srcY, srcTs, srcTs, 0, 0, tileSize, tileSize);

        arrowCanvases[arrowOrder[i]] = canv;
        srcX++;
      }

      this.setState({ arrowCanvases: arrowCanvases });
    }
  }, {
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
      var setDisplay = false;

      if (enemy.curHealth !== enemy.maxHealth && this.enemyDisplayArr[index] && this.enemyDisplayArr[index].curHealth !== enemy.curHealth) {
        setDisplay = true;
      }

      this.enemyDisplayArr[index] = enemy;

      if (setDisplay) {
        //console.log('re-set display');
        this.setEnemyDisplay();
      }
    }
  }, {
    key: 'setLevelEnemies',
    value: function setLevelEnemies() {
      var _props = this.props,
          gameLevel = _props.gameLevel,
          itemLevelProcessed = _props.itemLevelProcessed,
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

      this.bossDead = false;
      this.props.updateGameClassState({ floorCoords: floorCoords, enemyArr: enemyArr });

      this.setState({
        levelEnemies: levelEnemies,
        enemiesRemaining: enemiesRemaining,
        nextKey: nextKey,
        levelProcessed: itemLevelProcessed,
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
          coord = enemyDead.coord;
      var enemyArr = nextProps.enemyArr,
          roundEnemyArr = this.state.roundEnemyArr;


      roundEnemyArr[coord[0]][coord[1]] = 0;
      enemyArr = [].concat(_toConsumableArray(roundEnemyArr));
      this.enemyDeadCount = enemyDead.count;

      if (enemyDead.source.boss) this.bossDead = true;

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

      ctx.clearRect(0, 0, ts, ts);

      if (icon) ctx.drawImage(icon, 0, 0);
    }
  }, {
    key: 'setEnemyDisplay',
    value: function setEnemyDisplay() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var playerArr = props.playerArr,
          portalObjective = props.portalObjective,
          arrowCanvases = this.state.arrowCanvases,
          coord = portalObjective.coord,
          discovered = portalObjective.discovered,
          enemyDisplayArr = this.enemyDisplayArr,
          pi = Math.PI,
          radOffset = pi / 8;


      var displayRange = 5,
          displayChoice = {},
          source = {},
          position = [],
          icon = null,
          updateDisplayChoice = false,
          distance = 0,
          healthLost = 0,
          maxHealth = 0,
          curHealth = 0,
          index = 0,
          dY = 0,
          dX = 0,
          angle = 0;

      enemyDisplayArr.forEach(function (el, i) {
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
            source = el.source;

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
              displayChoice = { position: position, distance: distance, index: index, maxHealth: maxHealth, curHealth: curHealth, healthLost: healthLost, source: source };
            }
          }
        }
      });

      if (!(displayChoice.index && enemyDisplayArr[displayChoice.index].curHealth === this.enemyDisplay.curHealth && enemyDisplayArr[displayChoice.index].name === this.enemyDisplay.name && enemyDisplayArr[displayChoice.index].level === this.enemyDisplay.level)) {

        this.enemyDisplay = displayChoice.curHealth ? enemyDisplayArr[displayChoice.index] : {};
        icon = this.enemyDisplay.icon ? this.enemyDisplay.icon : false;

        //console.log('if this.enemyDisplay: ', this.enemyDisplay);

        this.drawEnemyIcon(icon);

        this.setState({ displayUpdateCount: this.state.displayUpdateCount + 1 });
      }

      if (!Object.keys(this.enemyDisplay).length && this.bossDead && discovered) {
        dY = playerArr[0] - coord[0];
        dX = playerArr[1] - coord[1];
        angle = dX >= 0 && dY >= 0 ? Math.atan(dX / dY) : dX >= 0 && dY < 0 ? pi / 2 + Math.atan(dY / dX * -1) : dX < 0 && dY < 0 ? pi + Math.atan(dX / dY) : 3 * pi / 2 + Math.atan(dY / dX * -1);

        index = ~~((angle + radOffset) / (pi / 4)) % arrowCanvases.length;

        this.drawEnemyIcon(arrowCanvases[index]);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getManagerImages();
      this.resetMerchantInventories();
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
      if (this.props.moveCount !== nextProps.moveCount) {

        this.setEnemyDisplay(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.levelProcessed !== this.props.itemLevelProcessed && Object.keys(this.props.enemyPalettes).length) {

        this.setLevelEnemies();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var levelEnemies = this.state.levelEnemies,
          portalObjective = this.props.portalObjective,
          ts = this.props.tileSize,
          enemyDisplay = this.enemyDisplay,
          healthMaxWidth = 10;


      var enemies = [],
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
          enemyDisplayArr: _this2.enemyDisplayArr,
          updateEnemyTurn: _this2.updateEnemyTurn,
          updateEnemyDisplayArr: _this2.updateEnemyDisplayArr,
          exchangeAttacks: _this2.props.exchangeAttacks,
          updateEnemyManager: _this2.updateEnemyManager,
          updateGameClassState: _this2.props.updateGameClassState }));
      });

      if (enemyDisplay.name) {
        containerHeader = enemyDisplay.type === 'merchant' ? 'Merchant' : 'Enemy';
        displayName = enemyDisplay.name;
        displayType = enemyDisplay.type[0].toUpperCase() + enemyDisplay.type.slice(1);
        displayLevel = enemyDisplay.level;
        displayHealth = enemyDisplay.curHealth + '/' + enemyDisplay.maxHealth;
        healthTitleWidth = '6em';
        healthMaxWidthStyle = healthMaxWidth + 'em';
        healthBorder = '1px solid rgb(0, 0, 0)';
        healthPercent = ~~(enemyDisplay.curHealth / enemyDisplay.maxHealth * 100);
        healthWidth = healthPercent + '%';
        healthColor = healthPercent > 70 ? 'rgba(0,255,0,.8)' : healthPercent > 30 ? 'rgba(255,255,0,.8)' : 'rgba(255,0,0,.7)';
      } else if (this.bossDead && portalObjective.discovered) {
        containerHeader = 'To Portal';
      }

      return React.createElement(
        'div',
        { className: enemyDisplay.name && enemyDisplay.source.boss ? 'enemy-manager enemy-manager-boss' : 'enemy-manager' },
        React.createElement(
          'p',
          { className: 'enemy-manager-title' },
          containerHeader
        ),
        React.createElement('canvas', { id: 'enemy-icon', className: 'enemy-icon', width: ts, height: ts }),
        React.createElement(
          'div',
          { className: 'stat-col' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              displayName ? 'Name: ' : null
            ),
            React.createElement(
              'span',
              null,
              displayName
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              displayType ? 'Type: ' : null
            ),
            React.createElement(
              'span',
              null,
              displayType
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              displayLevel ? 'Level: ' : null
            ),
            React.createElement(
              'span',
              null,
              displayLevel
            )
          ),
          React.createElement(
            'p',
            { className: 'enemy-health-row' },
            React.createElement(
              'span',
              {
                className: 'enemy-health-row-title',
                style: { width: healthTitleWidth }
              },
              React.createElement(
                'span',
                { className: 'health-text' },
                displayHealth ? 'Health: ' : null
              )
            ),
            React.createElement(
              'span',
              {
                id: 'enemy-health',
                className: 'enemy-health',
                style: { width: healthMaxWidthStyle, border: healthBorder }
              },
              React.createElement(
                'span',
                { className: 'enemy-health-number' },
                displayHealth
              ),
              React.createElement('span', {
                id: 'enemy-health-gauge',
                className: 'enemy-health-gauge',
                style: { width: healthWidth, background: healthColor }
              })
            )
          )
        ),
        enemies
      );
    }
  }]);

  return EnemyManager;
}(React.Component);