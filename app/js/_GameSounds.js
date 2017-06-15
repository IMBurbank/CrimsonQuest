'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: gameOver, gameLevel, levels , levelUpCount, interactItem, useStatPoint,
//exchangeAttacks, enemyDead, overlayMode

var GameSounds = function (_React$Component) {
  _inherits(GameSounds, _React$Component);

  function GameSounds(props) {
    _classCallCheck(this, GameSounds);

    var _this = _possibleConstructorReturn(this, (GameSounds.__proto__ || Object.getPrototypeOf(GameSounds)).call(this, props));

    _this.getSounds = _this.getSounds.bind(_this);

    _this.soundKeys = {
      path: 'sounds/',
      effectKeys: {
        activatePortal: 'activate-portal',
        attackRound: 'attack-round',
        buySellItem: 'buy-sell-item',
        changeEquipment: 'change-eqipment',
        chooseNewGame: 'choose-new-game',
        closeOverlay: 'close-overlay',
        enemyDead: 'enemy-dead',
        heroDead: 'hero-dead',
        heroSelection: 'hero-selection',
        levelUp: 'level-up',
        notEnoughGold: 'not-enough-gold',
        openOverlay: 'open-overlay',
        pickupGold: 'pickup-gold',
        pickupItem: 'pickup-item',
        teleportThroughPortal: 'teleport-through-portal',
        usePotion: 'use-potion',
        useStatPoint: 'use-stat-point',
        useTome: 'use-tome'
      },
      effectPre: 'effect-',
      effectPost: '.wav',
      effectType: 'audio/wav',
      musicKeys: {
        'intro': '00-intro',
        'level': '-level',
        'gameOver': '11-game-over',
        'gameWin': '12-game-win'
      },
      musicPre: 'music-',
      musicPost: '.mp3',
      musicType: 'audio/mp3'
    };

    _this.state = {
      music: {},
      effects: {}
    };
    return _this;
  }

  _createClass(GameSounds, [{
    key: 'getSounds',
    value: function getSounds() {
      var levels = this.props.levels,
          _soundKeys = this.soundKeys,
          path = _soundKeys.path,
          effectKeys = _soundKeys.effectKeys,
          effectPre = _soundKeys.effectPre,
          effectPost = _soundKeys.effectPost,
          effectType = _soundKeys.effectType,
          _soundKeys2 = this.soundKeys,
          musicKeys = _soundKeys2.musicKeys,
          musicPre = _soundKeys2.musicPre,
          musicPost = _soundKeys2.musicPost,
          musicType = _soundKeys2.musicType,
          that = this;


      var effects = {},
          music = {},
          el = '',
          key = '',
          len = 0,
          i = 0,
          j = 0;

      console.log('Starting getSounds: ');
      console.log('effectKeys, musicKeys: ', effectKeys, musicKeys);

      var handleLoad = function handleSoundLoad(e) {
        i++;
        if (i === len) {
          that.setState({ effects: effects, music: music });
          console.log('MUSIC LOADED');
        }
      };

      for (el in musicKeys) {
        if (el === 'level') {
          for (j = 1; j <= levels; j++) {
            key = el + j;
            music[key] = new Audio();
            music[key].src = path + musicPre + ('0' + len).slice(-2) + musicKeys[el] + musicPost;
            music[key].type = musicType;
            music[key].loop = true;
            music[key].addEventListener('loadstart', handleLoad);
            len++;
          }
        } else {
          music[el] = new Audio();
          music[el].src = path + musicPre + musicKeys[el] + musicPost;
          music[el].type = musicType;
          music[el].loop = true;
          music[el].addEventListener('loadstart', handleLoad);
          len++;
        }
        if (el === 'intro') music[el].play();
      }

      for (el in effectKeys) {
        effects[el] = new Audio();
        effects[el].src = path + effectPre + effectKeys[el] + effectPost;
        effects[el].type = effectType;
        effects[el].addEventListener('loadstart', handleLoad);
        len++;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getSounds();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.overlayMode === 'hero-selection-overlay' && this.props.overlayMode !== nextProps.overlayMode) {

        console.log('stop intro song');
        this.state.music.intro.pause();
        this.state.music.level1.play();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var content = null;

      return React.createElement('div', null);
    }
  }]);

  return GameSounds;
}(React.Component);