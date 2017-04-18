'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: tileSize, hero, heroIcon, inventory, interactItem, updateGameClassState
var Hero = function (_React$Component) {
  _inherits(Hero, _React$Component);

  function Hero(props) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

    _this.initHero = _this.initHero.bind(_this);
    _this.changeStats = _this.changeStats.bind(_this);
    _this.handleLevelUp = _this.handleLevelUp.bind(_this);
    _this.paintHeroIcon = _this.paintHeroIcon.bind(_this);

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
      var attr = Object.assign({}, stats);

      var newState = Object.assign({}, this.state),
          prop = null;

      for (prop in attr) {
        newState[prop] += attr[prop];
      }
      console.log('newState: ', JSON.stringify(newState));
      this.setState(newState);
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.heroName === "" && nextProps.hero) {
        this.initHero(nextProps.hero);
      }
      if (this.state.interactItemCount !== nextProps.interactItem.count && nextProps.interactItem.count) {

        console.log('interactItem');
        console.log(nextProps.interactItem.type);

        if (nextProps.interactItem.type === 'pickup' && nextProps.interactItem.item.type === 'gold') {
          this.changeStats(nextProps.interactItem.item.stats);
        }

        this.setState({ interactItemCount: nextProps.interactItem.count });
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
          curHp = this.state.curHealth,
          lvl = this.state.charLevel,
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
          hed = this.state.head || none,
          wep = this.state.weapon || none,
          amu = this.state.amulet || none,
          bod = this.state.armor || none,
          shd = this.state.shield || none,
          glv = this.state.glove || none,
          rng = this.state.ring || none,
          ft = this.state.foot || none;

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
          React.createElement('canvas', { id: 'hero-hed', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-wep', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-amu', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-bod', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-shd', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-glv', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-rng', className: 'equip-canv', width: ts, height: ts }),
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
          React.createElement('canvas', { id: 'hero-ft', className: 'equip-canv', width: ts, height: ts }),
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