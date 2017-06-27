"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  *		@desc Chosen game hero.
	*		@param {object} props - Component props.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {string} props.hero - Name of chosen hero.
	*		@param {html} props.heroIcon - Image of chosen hero on square tileSize canvas.
	*		@param {boolean} props.gameOver - Boolean gameover state.
	*		@param {object} props.inventory - Current hero item inventory.
	*		@param {object} props.interactItem - Hero/Item interaction details.
	*		@param {object} props.useStatPoint - Game component keydown attmept to use hero stat point.
	*		@param {object} props.increasedStat - Updated when useStatPoint is successfull.
	*		@param {object} props.enemyAttack - Enemy attack details. Prompts exchangeAttacks update.
	*		@param {object} props.exchangeAttacks - Hero/Enemy attack details.
	*		@param {object} props.enemyDead - Most recent dead enemy details.
	*		@param {object} props.itemPalettes - Item sprite sheets on canvas.
	*		@param {function} props.updateGameClassState - Update Game component state.
	*		@property {number} enemyDeadCount - Current count of enemies killed.
	*		@property {boolean} heroDead - Hero death status.
  *		@returns Character Info pane.
  */

var Hero = function (_React$Component) {
  _inherits(Hero, _React$Component);

  function Hero(props) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

    _this.initHero = _this.initHero.bind(_this);
    _this.changeStats = _this.changeStats.bind(_this);
    _this.handleLevelUp = _this.handleLevelUp.bind(_this);
    _this.paintHeroIcon = _this.paintHeroIcon.bind(_this);
    _this.attemptPurchase = _this.attemptPurchase.bind(_this);
    _this.sellItem = _this.sellItem.bind(_this);
    _this.handleInteractItem = _this.handleInteractItem.bind(_this);
    _this.handleEnemyDead = _this.handleEnemyDead.bind(_this);
    _this.handleUseStatPoint = _this.handleUseStatPoint.bind(_this);
    _this.updateEquipCanvas = _this.updateEquipCanvas.bind(_this);
    _this.handleBattleRound = _this.handleBattleRound.bind(_this);
    _this.handleHeroDead = _this.handleHeroDead.bind(_this);

    _this.enemyDeadCount = 0;
    _this.heroDead = false;

    _this.state = {
      heroName: '',
      experience: 0,
      expToLevel: 0,
      charLevel: 0,
      gold: 0,
      curHealth: 0,
      bHealth: 0,
      bAttack: 0,
      bDefense: 0,
      bHit: 0,
      bCrit: 0,
      bDodge: 0,
      bVitality: 0,
      bDurability: 0,
      bStrength: 0,
      bAgility: 0,
      statPoints: 0,
      onLevelUp: {},
      head: null,
      weapon: null,
      amulet: null,
      armor: null,
      shield: null,
      glove: null,
      ring: null,
      foot: null,
      iHealth: 0,
      iAttack: 0,
      iDefense: 0,
      iHit: 0,
      iCrit: 0,
      iDodge: 0,
      iVitality: 0,
      iDurability: 0,
      iStrength: 0,
      iAgility: 0,
      bExpToLevel: 100,
      interactItemCount: 0,
      battleRound: 0,
      statIncMessages: []
    };
    return _this;
  }

  _createClass(Hero, [{
    key: "initHero",
    value: function initHero(hero) {
      var char = Object.assign({}, heroTypeStats[hero]),
          bHp = char.health,
          bVit = char.vitality,
          bDur = char.durability,
          conv = statConversion,
          statIncMessages = ["'V'", "'B'", "'N'", "'M'"];

      this.setState({
        statIncMessages: statIncMessages,
        heroName: char.heroName,
        charLevel: 1,
        expToLevel: this.state.bExpToLevel,
        curHealth: bHp + conv.vitToHp * bVit + conv.durToHp * bDur,
        bHealth: bHp,
        bAttack: char.attack,
        bDefense: char.defense,
        bHit: char.hit,
        bCrit: char.crit,
        bDodge: char.dodge,
        bVitality: bVit,
        bDurability: bDur,
        bStrength: char.strength,
        bAgility: char.agility,
        onLevelUp: char.onLevelUp
      });
    }
  }, {
    key: "paintHeroIcon",
    value: function paintHeroIcon(icon) {
      var ctx = document.getElementById('hero-icon').getContext('2d');

      ctx.drawImage(icon, 0, 0);
    }
  }, {
    key: "changeStats",
    value: function changeStats(stats) {
      var decStats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var attr = Object.assign({}, stats),
          decAttr = Object.assign({}, decStats);

      var newState = Object.assign({}, this.state),
          prop = null;

      for (prop in attr) {
        newState[prop] += attr[prop];
      }for (prop in decAttr) {
        newState[prop] -= decAttr[prop];
      }return newState;
    }
  }, {
    key: "handleLevelUp",
    value: function handleLevelUp(experience, gold) {
      var onLvl = this.state.onLevelUp,
          charLevel = this.state.charLevel + 1,
          bHealth = this.state.bHealth + onLvl.health,
          bVitality = this.state.bVitality + onLvl.vitality,
          bDurability = this.state.bDurability + onLvl.durability,
          bStrength = this.state.bStrength + onLvl.strength,
          bAgility = this.state.bAgility + onLvl.agility,
          bAttack = this.state.bAttack + onLvl.attack,
          bDefense = this.state.bDefense + onLvl.defense,
          iHealth = this.state.iHealth,
          iVitality = this.state.iVitality,
          iDurability = this.state.iDurability,
          conv = statConversion,
          maxHealth = bHealth + iHealth + conv.vitToHp * (bVitality + iVitality) + conv.durToHp * (bDurability + iDurability),
          statPoints = this.state.statPoints + conv.lvlUpSkillPoints;

      var expToLevel = this.state.expToLevel;


      experience -= expToLevel;
      expToLevel = ~~(expToLevel * conv.expLevelMult);

      this.props.updateGameClassState({ levelUpCount: charLevel });

      this.setState({
        gold: gold,
        charLevel: charLevel,
        experience: experience,
        expToLevel: expToLevel,
        bHealth: bHealth,
        bAttack: bAttack,
        bDefense: bDefense,
        bVitality: bVitality,
        bDurability: bDurability,
        bStrength: bStrength,
        bAgility: bAgility,
        statPoints: statPoints,
        curHealth: maxHealth
      });
    }
  }, {
    key: "attemptPurchase",
    value: function attemptPurchase(item, inventory, merchantInventory, interactItem) {
      var buySuccessType = 'buySuccess',
          buyFailType = 'buyFail';

      var gold = this.state.gold,
          nInteractItem = Object.assign({}, interactItem),
          nState = {};


      if (gold >= item.buy) {
        nInteractItem.type = buySuccessType;
        gold -= item.buy;
        merchantInventory[item.name].count -= 1;

        if (inventory[item.name]) {
          inventory[item.name].count += 1;
        } else {
          inventory[item.name] = Object.assign({}, item);
          inventory[item.name].count = 1;
        }
        nState = { inventory: inventory };
        this.setState({ gold: gold });
      } else {
        nInteractItem.type = buyFailType;
      }

      nInteractItem.count += 1;
      nState['interactItem'] = nInteractItem;

      this.props.updateGameClassState(nState);
    }
  }, {
    key: "sellItem",
    value: function sellItem(item, inventory, merchantInventory, interactItem) {
      var gold = this.state.gold,
          nState = { gold: gold + item.sell },
          removeEquipped = false;


      if (item.equipped) {
        inventory[item.name].equipped = false;
        nState[item.type] = null;
        removeEquipped = true;
      }

      inventory[item.name].count -= 1;

      if (merchantInventory[item.name]) {
        merchantInventory[item.name].count += 1;
      } else {
        merchantInventory[item.name] = Object.assign({}, item);
        merchantInventory[item.name].count = 1;
      }

      if (inventory[item.name].count === 0 && inventory[item.name].type !== 'consumable' && removeEquipped) {

        this.updateEquipCanvas(inventory[item.name]);
      }

      this.setState(nState);
      this.props.updateGameClassState({ inventory: inventory });
    }
  }, {
    key: "handleEnemyDead",
    value: function handleEnemyDead(nextProps) {
      var enemyDead = nextProps.enemyDead;
      var _state = this.state,
          experience = _state.experience,
          expToLevel = _state.expToLevel,
          gold = _state.gold;


      experience += enemyDead.experience;
      gold += enemyDead.gold;
      this.enemyDeadCount = enemyDead.count;

      if (experience >= expToLevel) this.handleLevelUp(experience, gold);else this.setState({ experience: experience, gold: gold });
    }
  }, {
    key: "handleInteractItem",
    value: function handleInteractItem(nextProps) {
      var interactItem = nextProps.interactItem,
          action = interactItem.type,
          itemName = interactItem.item.name,
          conv = statConversion;


      var inventory = Object.assign({}, nextProps.inventory),
          merchantInventory = interactItem.source.inventory,
          item = action === 'buy' ? merchantInventory[itemName] : inventory[itemName],
          stats = item.stats,
          iType = item.type,
          updateInventory = false,
          updateCanvas = false,
          curItem = null,
          nState = {},
          maxHp = 0,
          hp = 0,
          vit = 0,
          dur = 0;

      if (action === 'pickup' && item.type === 'gold') nState = this.changeStats(stats);else if (action === 'use') {
        updateInventory = true;
        item.count -= 1;

        nState = this.changeStats(stats);
      } else if (action === 'unequip') {
        updateInventory = true;
        updateCanvas = true;
        curItem = this.state[iType];
        inventory[curItem.name].equipped = false;

        nState = this.changeStats({}, curItem.stats);
        nState[iType] = null;
      } else if (action === 'equip') {
        updateInventory = true;
        updateCanvas = true;
        curItem = this.state[iType];

        if (curItem) {
          inventory[curItem.name].equipped = false;
          nState = this.changeStats(stats, curItem.stats);
        } else nState = this.changeStats(stats);

        item.equipped = true;
        nState[iType] = item;
      } else if (action === 'buy') {
        this.attemptPurchase(item, inventory, merchantInventory, interactItem);
      } else if (action === 'sell') {
        this.sellItem(item, inventory, merchantInventory, interactItem);
      }

      if (Object.keys(nState).length) {
        hp = nState.bHealth + nState.iHealth;
        vit = nState.iVitality + nState.bVitality;
        dur = nState.iDurability + nState.bDurability;
        maxHp = hp + conv.vitToHp * vit + conv.durToHp * dur;

        if (nState.curHealth > maxHp) nState.curHealth = maxHp;
        if (updateCanvas) this.updateEquipCanvas(item);
        if (updateInventory) this.props.updateGameClassState({ inventory: inventory });

        this.setState(nState);
      }
    }
  }, {
    key: "handleUseStatPoint",
    value: function handleUseStatPoint(nextProps) {
      var decStats = { statPoints: 1 };

      var increasedStat = Object.assign({}, nextProps.increasedStat),
          stats = {},
          nState = {};

      if (this.state.statPoints > 0) {
        stats[nextProps.useStatPoint.stat] = 1;
        nState = this.changeStats(stats, decStats);

        increasedStat.count++;
        increasedStat.type = 'Increased';
        increasedStat.stat = nextProps.useStatPoint.stat.slice(1);
        increasedStat.quant = 1;

        this.props.updateGameClassState({ increasedStat: increasedStat });
        this.setState(nState);
      }
    }
  }, {
    key: "updateEquipCanvas",
    value: function updateEquipCanvas(item) {
      var palette = this.props.itemPalettes[item.palette],
          loc = item.iconLoc;

      var dCtx = getById(item.type + '-canvas').getContext('2d');

      dCtx.clearRect(0, 0, loc[2], loc[3]);

      if (item.equipped) {
        dCtx.drawImage(palette, loc[0], loc[1], loc[2], loc[3], 0, 0, loc[2], loc[3]);
      }
    }
  }, {
    key: "handleBattleRound",
    value: function handleBattleRound(nextProps) {
      var enemyAttack = nextProps.enemyAttack,
          eStats = enemyAttack.stats,
          roundCount = enemyAttack.roundCount,
          conv = statConversion,
          hDur = this.state.bDurability + this.state.iDurability,
          hStr = this.state.bStrength + this.state.iStrength,
          hAgi = this.state.bAgility + this.state.iAgility,
          hAtk = this.state.bAttack + this.state.iAttack + conv.strToAtk * hStr,
          hDef = this.state.bDefense + this.state.iDefense + conv.durToDef * hDur + conv.strToDef * hStr,
          hHit = this.state.bHit + this.state.iHit + conv.strToHit * hStr + conv.agiToHit * hAgi,
          hCrit = this.state.bCrit + this.state.iCrit + conv.agiToCrit * hAgi,
          hDodge = this.state.bDodge + this.state.iDodge + conv.durToDodge * hDur + conv.agiToDodge * hAgi,
          eDur = eStats.bDurability,
          eStr = eStats.bStrength,
          eAgi = eStats.bAgility,
          eAtk = eStats.bAttack + conv.strToAtk * eStr,
          eDef = eStats.bDefense + conv.durToDef * eDur + conv.strToDef * eStr,
          eHit = eStats.bHit + conv.strToHit * eStr + conv.agiToHit * eAgi,
          eCrit = eStats.bCrit + conv.agiToCrit * eAgi,
          eDodge = eStats.bDodge + conv.durToDodge * eDur + conv.agiToDodge * eAgi;
      var exchangeAttacks = Object.assign({}, nextProps.exchangeAttacks),
          _state2 = this.state,
          curHealth = _state2.curHealth,
          battleRound = _state2.battleRound,
          spawnIndex = enemyAttack.spawnIndex,
          enemyHealth = eStats.curHealth,
          attacks = [],
          turn = {},
          enemyFirst = false,
          type = '',
          attack = 0,
          defense = 0,
          damage = 0,
          i = 0;


      if (roundCount !== battleRound) {
        if (randInt(0, 100) < hHit - eDodge) {
          for (i = 0; i < hAtk; i++) {
            attack += randInt(conv.atkToHpRange[0], conv.atkToHpRange[1]);
          }for (i = 0; i < eDef; i++) {
            defense += randInt(conv.defToHpRange[0], conv.defToHpRange[1]);
          }damage = attack - defense > 0 ? attack - defense : 0;

          if (randInt(0, 100) < hCrit) type = 'critical hit', damage *= 2;else type = 'hit';

          turn = { type: type, damage: damage, from: 'hero', to: enemyAttack.source.name };
        } else {
          spawnIndex = -1;
          turn = { from: 'hero', to: enemyAttack.source.name, type: 'miss', damage: 0 };
        }
        attacks.push(turn);
      }

      if (!(attacks.length && eAgi <= hAgi && attacks[0].damage >= enemyHealth)) {
        if (randInt(0, 100) < eHit - hDodge) {
          attack = 0, defense = 0;

          for (i = 0; i < eAtk; i++) {
            attack += randInt(conv.atkToHpRange[0], conv.atkToHpRange[1]);
          }for (i = 0; i < hDef; i++) {
            defense += randInt(conv.defToHpRange[0], conv.defToHpRange[1]);
          }damage = attack - defense > 0 ? attack - defense : 0;

          if (randInt(0, 100) < eCrit) type = 'critical hit', damage *= 2;else type = 'hit';

          turn = { type: type, damage: damage, from: enemyAttack.source.name, to: 'hero' };
        } else {
          damage = 0;
          turn = { damage: damage, from: enemyAttack.source.name, to: 'hero', type: 'miss' };
        }
        curHealth -= turn.damage;

        if (eAgi <= hAgi) attacks.push(turn);else enemyFirst = true, attacks.unshift(turn);
      }

      if (enemyFirst && curHealth <= 0 && attacks.length === 2) {
        attacks.length = 1;
        spawnIndex = -1;
      }

      if (battleRound < roundCount) battleRound = roundCount;
      exchangeAttacks.count++;
      exchangeAttacks.spawnIndex = spawnIndex;
      exchangeAttacks.attacks = attacks;

      this.setState({ curHealth: curHealth, battleRound: battleRound });
      nextProps.updateGameClassState({ exchangeAttacks: exchangeAttacks });
    }
  }, {
    key: "handleHeroDead",
    value: function handleHeroDead() {
      this.heroDead = true;
      this.props.updateGameClassState({ gameOver: true, overlayMode: 'game-over-overlay' });
      console.log('GAME OVER');
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.heroName === '' && nextProps.hero) {
        this.initHero(nextProps.hero);
      }
      if (this.props.interactItem.count !== nextProps.interactItem.count && nextProps.interactItem.count) {

        this.handleInteractItem(nextProps);
      }
      if (this.props.enemyAttack.count !== nextProps.enemyAttack.count) {
        this.handleBattleRound(nextProps);
      }
      if (this.enemyDeadCount !== nextProps.enemyDead.count) {
        this.handleEnemyDead(nextProps);
      }
      if (this.props.useStatPoint.count !== nextProps.useStatPoint.count) {
        this.handleUseStatPoint(nextProps);
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.heroIcon !== nextProps.heroIcon && nextProps.heroIcon) {
        this.paintHeroIcon(nextProps.heroIcon);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.curHealth <= 0 && !this.heroDead && this.state.heroName) {
        this.handleHeroDead();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var ts = this.props.tileSize,
          none = 'None',
          statIncMessages = this.state.statIncMessages,
          conv = statConversion,
          lvl = this.state.charLevel,
          curHp = this.state.curHealth,
          gold = this.state.gold,
          stat = this.state.statPoints,
          exp = this.state.experience,
          expToLvl = this.state.expToLevel,
          vit = this.state.bVitality + this.state.iVitality,
          dur = this.state.bDurability + this.state.iDurability,
          str = this.state.bStrength + this.state.iStrength,
          agi = this.state.bAgility + this.state.iAgility,
          atk = this.state.bAttack + this.state.iAttack + conv.strToAtk * str,
          def = this.state.bDefense + this.state.iDefense + conv.durToDef * dur + conv.strToDef * str,
          maxHp = this.state.bHealth + this.state.iHealth + conv.vitToHp * vit + conv.durToHp * dur,
          statIcon = stat ? 'stat-icon icon-plus-squared' : '',
          hed = this.state.head ? this.state.head.name : none,
          wep = this.state.weapon ? this.state.weapon.name : none,
          amu = this.state.amulet ? this.state.amulet.name : none,
          bod = this.state.armor ? this.state.armor.name : none,
          shd = this.state.shield ? this.state.shield.name : none,
          glv = this.state.glove ? this.state.glove.name : none,
          rng = this.state.ring ? this.state.ring.name : none,
          ft = this.state.foot ? this.state.foot.name : none,
          healthMaxWidth = 9,
          expMaxWidth = 11.2;

      var healthMaxWidthStyle = '',
          gaugeBorder = 'none',
          hPercent = 0,
          healthWidthStyle = '',
          healthColor = 'none',
          expMaxWidthStyle = '',
          ePercent = 0,
          expWidthStyle = '',
          expColor = 'none';

      if (maxHp) {
        healthMaxWidthStyle = healthMaxWidth + 'em';
        gaugeBorder = '1px solid #000';
        hPercent = ~~(curHp / maxHp * 100), healthWidthStyle = hPercent + '%';
        healthColor = hPercent > 70 ? 'rgba(0,255,0,.8)' : hPercent > 30 ? 'rgba(255,255,0,.8)' : 'rgba(255,0,0,.7)';
        expMaxWidthStyle = expMaxWidth + 'em';
        ePercent = ~~(exp / expToLvl * 100);
        expWidthStyle = ePercent + '%';
        expColor = 'rgba(0,164,255,.6)';
      }

      return React.createElement(
        "div",
        { className: "hero" },
        React.createElement(
          "p",
          { className: "hero-heading" },
          "Character Info"
        ),
        React.createElement(
          "div",
          { className: "hero-type" },
          React.createElement("canvas", { id: "hero-icon", className: "hero-icon", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Name: ",
              this.state.heroName
            ),
            React.createElement(
              "p",
              null,
              "Type: ",
              this.props.hero
            )
          )
        ),
        React.createElement(
          "div",
          { className: "stat-container" },
          React.createElement(
            "p",
            { className: "stat-row" },
            "Level: ",
            lvl
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Health: ",
            React.createElement(
              "span",
              {
                className: "hero-health",
                style: { width: healthMaxWidthStyle, border: gaugeBorder }
              },
              React.createElement("span", {
                className: "hero-health-gauge",
                style: { width: healthWidthStyle, background: healthColor }
              }),
              React.createElement(
                "span",
                {
                  className: "hero-health-number"
                },
                curHp,
                "/",
                maxHp
              )
            )
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Exp: ",
            React.createElement(
              "span",
              {
                className: "hero-experience",
                style: { width: expMaxWidthStyle, border: gaugeBorder }
              },
              React.createElement("span", {
                className: "hero-experience-gauge",
                style: { width: expWidthStyle, background: expColor }
              }),
              React.createElement(
                "span",
                {
                  className: "hero-experience-number"
                },
                exp,
                "/",
                expToLvl
              )
            )
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Gold: ",
            gold
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Stat: ",
            stat
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Atk: ",
            atk
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Def: ",
            def
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Vit: ",
            React.createElement(
              "span",
              { className: "changeable-stat" },
              vit
            ),
            React.createElement("i", { className: statIcon }),
            React.createElement(
              "span",
              { className: "stat-note" },
              stat ? statIncMessages[0] : null
            )
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Dur: ",
            React.createElement(
              "span",
              { className: "changeable-stat" },
              dur
            ),
            React.createElement("i", { className: statIcon }),
            React.createElement(
              "span",
              { className: "stat-note" },
              stat ? statIncMessages[1] : null
            )
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Str: ",
            React.createElement(
              "span",
              { className: "changeable-stat" },
              str
            ),
            React.createElement("i", { className: statIcon }),
            React.createElement(
              "span",
              { className: "stat-note" },
              stat ? statIncMessages[2] : null
            )
          ),
          React.createElement(
            "p",
            { className: "stat-row" },
            "Agi: ",
            React.createElement(
              "span",
              { className: "changeable-stat" },
              agi
            ),
            React.createElement("i", { className: statIcon }),
            React.createElement(
              "span",
              { className: "stat-note" },
              stat ? statIncMessages[3] : null
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "head-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Head"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              hed
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "weapon-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Weapon"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              wep
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "amulet-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Amulet"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              amu
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "armor-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Armor"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              bod
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "shield-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Shield"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              shd
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "glove-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Glove"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              glv
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "ring-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Ring"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              rng
            )
          )
        ),
        React.createElement(
          "div",
          { className: "equip-row" },
          React.createElement("canvas", { id: "foot-canvas", className: "equip-canv", width: ts, height: ts }),
          React.createElement(
            "div",
            { className: "stat-col" },
            React.createElement(
              "p",
              null,
              "Foot"
            ),
            React.createElement(
              "p",
              { className: "equip-name" },
              ft
            )
          )
        )
      );
    }
  }]);

  return Hero;
}(React.Component);