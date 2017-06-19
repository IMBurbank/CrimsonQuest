//props: gameOver, gameLevel, gameMuted, levels, levelUpCount, interactItem, useStatPoint,
//exchangeAttacks, enemyDead, overlayMode

class GameSounds extends React.Component {
  constructor(props) {
    super(props);
    this.loadEffects = this.loadEffects.bind(this);
    this.playBackgroundSong = this.playBackgroundSong.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.playEffect = this.playEffect.bind(this);
    this.handleInteractItem = this.handleInteractItem.bind(this);
    this.handleOverlayToggle = this.handleOverlayToggle.bind(this);
    this.handleEnemyDead = this.handleEnemyDead.bind(this);

    this.soundKeys = {
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
        'gameWin': '12-game-win',
      },
      musicPre: 'music-',
      musicPost: '.mp3',
      musicType: 'audio/mp3'
    };

    this.musicOverlays = {
      'hero-selection-overlay': {overlay: 'hero-selection-overlay', pointerKey: 'intro'},
      'game-over-overlay': {overlay: 'game-over-overlay', pointerKey: 'gameOver'},
      'game-win-overlay': {overlay: 'game-win-overlay', pointerKey: 'gameWin'}
    };

    this.effectOverlays = {
      'inv-overlay': {overlay: 'inv-overlay'},
      'help-overlay': {overlay: 'help-overlay'},
      'merchant-overlay': {overlay: 'merchant-overlay'},
    };

    this.state = ({
      song: null,
      effects: {},
    });
  }

  loadEffects() {
    const {path, effectKeys, effectPre, effectPost, effectType} = this.soundKeys;

    let effects = {},
      el = '';

    for (el in effectKeys) {
      effects[el] = new Audio();
      effects[el].src = path + effectPre + effectKeys[el] + effectPost;
      effects[el].type = effectType;
    }

    this.setState({ effects });
  }

  playBackgroundSong(gameLevel, overlayMode, props = this.props) {
    const {path, musicKeys, musicPre, musicPost, musicType} = this.soundKeys,
      musicOverlays = this.musicOverlays

    let song = null,
      key = '',
      el = '';

    const playSong = function handlePlaySong() {
      console.log('playing song: ', song.src);
      song.play();
      if (props.gameMuted) song.muted = true;
    }

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

    this.setState({ song });
  }

  playEffect(key) {
    this.state.effects[key].play();
  }

  toggleMute(gameMuted) {
    this.state.song.muted = gameMuted;
  }

  handleInteractItem(props = this.props) {
    const {type, item} = props.interactItem;

    let key = '';

    if (type === 'buyFail') key = 'notEnoughGold'
    else if (['buySuccess', 'sell'].includes(type)) key = 'buySellItem'
    else if (['equip', 'unequip'].includes(type)) key = 'changeEquipment';
    else if (type === 'pickup') key = item.type === 'gold' ? 'pickupGold' : 'pickupItem';
    else if (type === 'use') key = item.name.slice(-6) === 'Potion' ? 'usePotion': 'useTome';
    else console.log('GAMESOUND HANDLEINTERACTITEM ERROR');

    this.playEffect(key);
  }

  handleEnemyDead(props = this.props) {
    const {source} = props.enemyDead,
      portalSoundDelay = 200;

    this.playEffect('enemyDead');

    if (source.boss) setTimeout(() => {this.playEffect('activatePortal');}, portalSoundDelay);
  }

  handleOverlayToggle(nextOverlay) {
    let key = this.effectOverlays[nextOverlay] ? 'openOverlay' : 'closeOverlay';

    this.playEffect(key);
  }

  componentWillMount() {
    this.loadEffects();
  }

  componentDidMount() {
    this.playBackgroundSong(this.props.gameLevel, this.props.overlayMode);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameLevel !== nextProps.gameLevel ||
      ((this.musicOverlays[this.props.overlayMode] ||
        this.musicOverlays[nextProps.overlayMode]) &&
      this.props.overlayMode !== nextProps.overlayMode)) {

      if (nextProps.gameLevel === 1 && nextProps.overlayMode === 'off') {
        this.playEffect('heroSelection');
      }

      this.state.song.pause();
      this.playBackgroundSong(nextProps.gameLevel, nextProps.overlayMode, nextProps);
    }
    if ((this.effectOverlays[this.props.overlayMode] ||
      this.effectOverlays[nextProps.overlayMode]) &&
      this.props.overlayMode !== nextProps.overlayMode) {

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

  render() {

    return (
      <div>

      </div>
    );
  }
}
