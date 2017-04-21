'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: tileSize, hero, heroIcon, inventory, itemPalettes, interactItem, updateGameClassState
var Hero = function (_React$Component) {
  _inherits(Hero, _React$Component);

  function Hero(props) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

    _this.initHero = _this.initHero.bind(_this);
    _this.changeStats = _this.changeStats.bind(_this);
    _this.handleLevelUp = _this.handleLevelUp.bind(_this);
    _this.paintHeroIcon = _this.paintHeroIcon.bind(_this);
    _this.handleInteractItem = _this.handleInteractItem.bind(_this);
    _this.updateEquipCanvas = _this.updateEquipCanvas.bind(_this);

    _this.state = {
      heroName: "",
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
      expLevelMult: 1.75,
      interactItemCount: 0
    };
    return _this;
  }

  _createClass(Hero, [{
    key: 'initHero',
    value: function initHero(hero) {
      var char = Object.assign({}, heroTypeStats[hero]),
          bHp = char.health,
          bVit = char.vitality,
          bDur = char.durability,
          conv = statConversion;

      this.setState({
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
    key: 'paintHeroIcon',
    value: function paintHeroIcon(icon) {
      var ctx = document.getElementById('hero-icon').getContext('2d');

      ctx.drawImage(icon, 0, 0);
    }
  }, {
    key: 'changeStats',
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
    key: 'handleLevelUp',
    value: function handleLevelUp(lvl) {
      var onLvl = this.state.onLevelUp,
          bHealth = this.state.bHealth + onLvl.health,
          bVitality = this.state.bVitality + onLvl.vitality,
          bDurability = this.state.bDurability + onLvl.durability,
          iHealth = this.state.iHealth,
          iVitality = this.state.iVitality,
          iDurability = this.state.durability,
          conv = statConversion,
          maxHealth = bHealth + iHealth + conv.vitToHp * (bVitality + iVitality) + conv.durToHp * (bDurability + iDurability),
          lvlUpPoints = 2;

      this.setState(function (prevState, props) {
        return {
          expToLevel: prevState.expLevelMult * prevState.expToLevel,
          bHealth: prevState.bHealth + onLvl.health,
          bAttack: prevState.bAttack + onLvl.attack,
          bDefense: prevState.bDefense + onLvl.defense,
          bVitality: prevState.bVitality + onLvl.vitality,
          bDurability: prevState.bDurability + onLvl.durability,
          bStrength: prevState.bStrength + onLvl.strength,
          bAgility: prevState.bAgility + onLvl.agility,
          statPoints: prevState.statPoints + lvlUpPoints,
          curHealth: maxHealth
        };
      });
    }
  }, {
    key: 'handleInteractItem',
    value: function handleInteractItem(nextProps) {
      var inventory = Object.assign({}, nextProps.inventory),
          item = inventory[nextProps.interactItem.item.name],
          updateInventory = false,
          updateCanvas = false,
          curItem = null,
          nState = {},
          maxHp = 0,
          hp = 0,
          vit = 0,
          dur = 0;

      var action = nextProps.interactItem.type,
          conv = statConversion,
          stats = item.stats,
          iType = item.type;

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
      }

      hp = nState.bHealth + nState.iHealth;
      vit = nState.iVitality + nState.bVitality;
      dur = nState.iDurability + nState.bDurability;
      maxHp = hp + conv.vitToHp * vit + conv.durToHp * dur;

      if (nState.curHealth > maxHp) nState.curHealth = maxHp;
      if (updateCanvas) this.updateEquipCanvas(item);
      if (updateInventory) this.props.updateGameClassState({ inventory: inventory });

      this.setState(nState);
    }
  }, {
    key: 'updateEquipCanvas',
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.heroName === "" && nextProps.hero) {
        this.initHero(nextProps.hero);
      }
      if (this.props.interactItem.count !== nextProps.interactItem.count && nextProps.interactItem.count) {

        console.log('interactItem');
        console.log(nextProps.interactItem.type, nextProps.interactItem.item.name);

        this.handleInteractItem(nextProps);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.heroIcon !== nextProps.heroIcon && nextProps.heroIcon) {
        this.paintHeroIcon(nextProps.heroIcon);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var ts = this.props.tileSize,
          none = 'None',
          conv = statConversion,
          lvl = this.state.charLevel,
          curHp = this.state.curHealth,
          gold = this.state.gold,
          exp = this.state.experience,
          expToLvl = this.state.expToLevel,
          vit = this.state.bVitality + this.state.iVitality,
          dur = this.state.bDurability + this.state.iDurability,
          str = this.state.bStrength + this.state.iStrength,
          agi = this.state.bAgility + this.state.iAgility,
          atk = this.state.bAttack + this.state.iAttack + conv.strToAtk * str,
          def = this.state.bDefense + this.state.iDefense + conv.durToDef * dur + conv.strToDef * str,
          maxHp = this.state.bHealth + this.state.iHealth + conv.vitToHp * vit + conv.durToHp * dur,
          hed = this.state.head ? this.state.head.name : none,
          wep = this.state.weapon ? this.state.weapon.name : none,
          amu = this.state.amulet ? this.state.amulet.name : none,
          bod = this.state.armor ? this.state.armor.name : none,
          shd = this.state.shield ? this.state.shield.name : none,
          glv = this.state.glove ? this.state.glove.name : none,
          rng = this.state.ring ? this.state.ring.name : none,
          ft = this.state.foot ? this.state.foot.name : none;

      return React.createElement(
        'div',
        { className: 'hero' },
        React.createElement(
          'p',
          { className: 'hero-heading' },
          'Character Info'
        ),
        React.createElement(
          'div',
          { className: 'hero-type' },
          React.createElement('canvas', { id: 'hero-icon', className: 'hero-icon', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Name: ',
              this.state.heroName
            ),
            React.createElement(
              'p',
              null,
              'Type: ',
              this.props.hero
            )
          )
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Level: ',
          lvl
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Health: ',
          curHp,
          '/',
          maxHp
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Gold: ',
          gold
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Exp: ',
          exp,
          '/',
          expToLvl
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Atk: ',
          atk
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Def: ',
          def
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Vit: ',
          vit
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Dur: ',
          dur
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Str: ',
          str
        ),
        React.createElement(
          'p',
          { className: 'stat-row' },
          'Agi: ',
          agi
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'head-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Head'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              hed
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'weapon-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Weapon'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              wep
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'amulet-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Amulet'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              amu
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'armor-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Armor'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              bod
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'shield-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Shield'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              shd
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'glove-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Glove'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              glv
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'ring-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Ring'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              rng
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'equip-row' },
          React.createElement('canvas', { id: 'foot-canvas', className: 'equip-canv', width: ts, height: ts }),
          React.createElement(
            'div',
            { className: 'stat-col' },
            React.createElement(
              'p',
              null,
              'Foot'
            ),
            React.createElement(
              'p',
              { className: 'equip-name' },
              ft
            )
          )
        )
      );
    }
  }]);

  return Hero;
}(React.Component);