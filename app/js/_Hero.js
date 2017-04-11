'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mage = {
  heroName: 'Forsyth',
  health: 56,
  attack: 11,
  defense: 10,
  vitality: 12,
  durability: 10,
  strength: 11,
  agility: 10,
  onLevelUp: {
    health: 6,
    attack: 2,
    defense: 1,
    vitality: 2,
    durability: 0,
    strength: 1,
    agility: 1
  }
};

var Paladin = {
  heroName: 'Oliver',
  health: 53,
  attack: 10,
  defense: 12,
  vitality: 11,
  durability: 11,
  strength: 11,
  agility: 11,
  onLevelUp: {
    health: 6,
    attack: 1,
    defense: 2,
    vitality: 1,
    durability: 2,
    strength: 1,
    agility: 0
  }
};

var Rogue = {
  heroName: 'Hanzo',
  health: 50,
  attack: 13,
  defense: 10,
  vitality: 10,
  durability: 10,
  strength: 12,
  agility: 12,
  onLevelUp: {
    health: 6,
    attack: 2,
    defense: 1,
    vitality: 0,
    durability: 0,
    strength: 2,
    agility: 2
  }
};

var Hero = function (_React$Component) {
  _inherits(Hero, _React$Component);

  function Hero(props) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

    _this.setState({
      heroName: "",
      health: 0,
      experience: 0,
      charLevel: 0,
      attack: 0,
      defense: 0,
      vitality: 0,
      durability: 0,
      strength: 0,
      agility: 0,
      onLevelUp: {},
      head: null,
      weapon: null,
      amulet: null,
      armor: null,
      shield: null,
      glove: null,
      ring: null,
      foot: null
    });
    return _this;
  }

  _createClass(Hero, [{
    key: 'initHero',
    value: function initHero() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('a', null);
    }
  }]);

  return Hero;
}(React.Component);