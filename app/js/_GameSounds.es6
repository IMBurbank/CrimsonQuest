//props: gameOver, gameLevel, levels , levelUpCount, interactItem, useStatPoint,
//exchangeAttacks, enemyDead, overlayMode

class GameSounds extends React.Component {
  constructor(props) {
    super(props);
    this.getSounds = this.getSounds.bind(this);

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

    this.state = {
      music: {},
      effects: {},
    }
  }

  getSounds() {
    const {levels} = this.props,
      {path, effectKeys, effectPre, effectPost, effectType} = this.soundKeys,
      {musicKeys, musicPre, musicPost, musicType} = this.soundKeys,
      that = this;

    let effects = {},
      music = {},
      el = '',
      key = '',
      len = 0,
      i = 0,
      j = 0;

    console.log('Starting getSounds: ');
    console.log('effectKeys, musicKeys: ', effectKeys, musicKeys);

    const handleLoad = function handleSoundLoad(e) {
      i++;
      if (i === len) {
        that.setState({ effects, music });
        console.log('MUSIC LOADED');
      }
    }

    for (el in musicKeys) {
      if (el === 'level') {
        for (j = 1; j <= levels; j++) {
          key = el + j;
          music[key] = new Audio();
          music[key].src = path + musicPre + ('0'+len).slice(-2) + musicKeys[el] + musicPost;
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

  componentWillMount() {
    this.getSounds();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.overlayMode === 'hero-selection-overlay' &&
      this.props.overlayMode !== nextProps.overlayMode) {

      console.log('stop intro song');
      this.state.music.intro.pause();
      this.state.music.level1.play();
    }
  }

  render() {
    let content = null;

    return (
      <div>

      </div>
    );
  }
}
