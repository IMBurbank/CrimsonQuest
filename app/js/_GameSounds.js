'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: gameOver, gameLevel, gameMuted, levels, levelUpCount, interactItem, useStatPoint,
//exchangeAttacks, enemyDead, overlayMode

var GameSounds = function (_React$Component) {
  _inherits(GameSounds, _React$Component);

  function GameSounds(props) {
    _classCallCheck(this, GameSounds);

    var _this = _possibleConstructorReturn(this, (GameSounds.__proto__ || Object.getPrototypeOf(GameSounds)).call(this, props));

    _this.loadEffects = _this.loadEffects.bind(_this);
    _this.playBackgroundSong = _this.playBackgroundSong.bind(_this);
    _this.toggleMute = _this.toggleMute.bind(_this);
    _this.playEffect = _this.playEffect.bind(_this);
    _this.handleInteractItem = _this.handleInteractItem.bind(_this);
    _this.handleOverlayToggle = _this.handleOverlayToggle.bind(_this);
    _this.handleEnemyDead = _this.handleEnemyDead.bind(_this);

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

    _this.musicOverlays = {
      'hero-selection-overlay': { overlay: 'hero-selection-overlay', pointerKey: 'intro' },
      'game-over-overlay': { overlay: 'game-over-overlay', pointerKey: 'gameOver' },
      'game-win-overlay': { overlay: 'game-win-overlay', pointerKey: 'gameWin' }
    };

    _this.effectOverlays = {
      'inv-overlay': { overlay: 'inv-overlay' },
      'help-overlay': { overlay: 'help-overlay' },
      'merchant-overlay': { overlay: 'merchant-overlay' }
    };

    _this.state = {
      song: null,
      effects: {}
    };
    return _this;
  }

  _createClass(GameSounds, [{
    key: 'loadEffects',
    value: function loadEffects() {
      var _soundKeys = this.soundKeys,
          path = _soundKeys.path,
          effectKeys = _soundKeys.effectKeys,
          effectPre = _soundKeys.effectPre,
          effectPost = _soundKeys.effectPost,
          effectType = _soundKeys.effectType;


      var effects = {},
          el = '';

      for (el in effectKeys) {
        effects[el] = new Audio();
        effects[el].src = path + effectPre + effectKeys[el] + effectPost;
        effects[el].type = effectType;
      }

      this.setState({ effects: effects });
    }
  }, {
    key: 'playBackgroundSong',
    value: function playBackgroundSong(gameLevel, overlayMode) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;
      var _soundKeys2 = this.soundKeys,
          path = _soundKeys2.path,
          musicKeys = _soundKeys2.musicKeys,
          musicPre = _soundKeys2.musicPre,
          musicPost = _soundKeys2.musicPost,
          musicType = _soundKeys2.musicType,
          musicOverlays = this.musicOverlays;


      var song = null,
          key = '',
          el = '';

      var playSong = function handlePlaySong() {
        console.log('playing song: ', song.src);
        song.play();
        if (props.gameMuted) song.muted = true;
      };

      for (el in musicOverlays) {
        if (musicOverlays[el].overlay === overlayMode) {
          key = musicKeys[musicOverlays[el].pointerKey];
        }
      }

      if (!key) key = ('0' + gameLevel).slice(-2) + musicKeys.level;

      song = new Audio();
      song.src = path + musicPre + key + musicPost;
      song.type = musicType;
      song.loop = true;
      song.addEventListener('loadeddata', playSong);

      this.setState({ song: song });
    }
  }, {
    key: 'playEffect',
    value: function playEffect(key) {
      this.state.effects[key].play();
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute(gameMuted) {
      this.state.song.muted = gameMuted;
    }
  }, {
    key: 'handleInteractItem',
    value: function handleInteractItem() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var _props$interactItem = props.interactItem,
          type = _props$interactItem.type,
          item = _props$interactItem.item;


      var key = '';

      if (type === 'buyFail') key = 'notEnoughGold';else if (['buySuccess', 'sell'].includes(type)) key = 'buySellItem';else if (['equip', 'unequip'].includes(type)) key = 'changeEquipment';else if (type === 'pickup') key = item.type === 'gold' ? 'pickupGold' : 'pickupItem';else if (type === 'use') key = item.name.slice(-6) === 'Potion' ? 'usePotion' : 'useTome';else console.log('GAMESOUND HANDLEINTERACTITEM ERROR');

      this.playEffect(key);
    }
  }, {
    key: 'handleEnemyDead',
    value: function handleEnemyDead() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var source = props.enemyDead.source,
          portalSoundDelay = 200;


      this.playEffect('enemyDead');

      if (source.boss) setTimeout(function () {
        _this2.playEffect('activatePortal');
      }, portalSoundDelay);
    }
  }, {
    key: 'handleOverlayToggle',
    value: function handleOverlayToggle(nextOverlay) {
      var key = this.effectOverlays[nextOverlay] ? 'openOverlay' : 'closeOverlay';

      this.playEffect(key);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadEffects();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.playBackgroundSong(this.props.gameLevel, this.props.overlayMode);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.gameLevel !== nextProps.gameLevel || (this.musicOverlays[this.props.overlayMode] || this.musicOverlays[nextProps.overlayMode]) && this.props.overlayMode !== nextProps.overlayMode) {

        if (nextProps.gameLevel === 1 && nextProps.overlayMode === 'off') {
          this.playEffect('heroSelection');
          console.log('Ca-Ching!');
        }

        console.log('Change Background Song');
        this.state.song.pause();
        this.playBackgroundSong(nextProps.gameLevel, nextProps.overlayMode, nextProps);
      }
      if ((this.effectOverlays[this.props.overlayMode] || this.effectOverlays[nextProps.overlayMode]) && this.props.overlayMode !== nextProps.overlayMode) {

        this.handleOverlayToggle(nextProps.overlayMode);
      }
      if (this.props.gameMuted !== nextProps.gameMuted) {
        this.toggleMute(nextProps.gameMuted);
      }
      if (this.props.levelUpCount !== nextProps.levelUpCount) {
        this.playEffect('levelUp');
      }
      if (this.props.interactItem.count !== nextProps.interactItem.count) {
        this.handleInteractItem(nextProps);
      }
      if (this.props.useStatPoint.count !== nextProps.useStatPoint.count) {
        this.playEffect('useStatPoint');
      }
      if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count) {
        this.playEffect('attackRound');
      }
      if (this.props.enemyDead.count !== nextProps.enemyDead.count) {
        this.handleEnemyDead(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement('div', null);
    }
  }]);

  return GameSounds;
}(React.Component);