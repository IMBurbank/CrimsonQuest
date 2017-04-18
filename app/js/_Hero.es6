//props: tileSize, hero, heroIcon, inventory, interactItem, updateGameClassState
class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.initHero = this.initHero.bind(this);
    this.changeStats = this.changeStats.bind(this);
    this.handleLevelUp = this.handleLevelUp.bind(this);
    this.paintHeroIcon = this.paintHeroIcon.bind(this);

    this.state = ({
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
    });
  }

  initHero(hero) {
    const char = Object.assign({}, heroTypeStats[hero]),
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

  paintHeroIcon(icon) {
    let ctx = document.getElementById('hero-icon').getContext('2d');

    ctx.drawImage(icon, 0, 0);
  }

  changeStats(stats) {
    const attr = Object.assign({}, stats);

    let newState = Object.assign({}, this.state),
      prop = null;

    for (prop in attr) {
      newState[prop] += attr[prop];
    }
    console.log('newState: ', JSON.stringify(newState));
    this.setState(newState);
  }

  handleLevelUp(lvl) {
    const onLvl = this.state.onLevelUp,
      bHealth = this.state.bHealth + onLvl.health,
      bVitality = this.state.bVitality + onLvl.vitality,
      bDurability = this.state.bDurability + onLvl.durability,
      iHealth = this.state.iHealth,
      iVitality = this.state.iVitality,
      iDurability = this.state.durability,
      conv = statConversion,
      maxHealth = bHealth + iHealth + conv.vitToHp * (bVitality + iVitality) +
        conv.durToHp * (bDurability + iDurability),
      lvlUpPoints = 2;

    this.setState((prevState, props) => {
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

  componentWillReceiveProps(nextProps) {
    if (this.state.heroName === "" && nextProps.hero) {
      this.initHero(nextProps.hero);
    }
    if (this.state.interactItemCount !== nextProps.interactItem.count &&
      nextProps.interactItem.count) {

      console.log('interactItem');
      console.log(nextProps.interactItem.type);

      if (nextProps.interactItem.type === 'pickup' && nextProps.interactItem.item.type === 'gold') {
        this.changeStats(nextProps.interactItem.item.stats);
      }

      this.setState({ interactItemCount: nextProps.interactItem.count });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.heroIcon !== nextProps.heroIcon && nextProps.heroIcon) {
      this.paintHeroIcon(nextProps.heroIcon);
    }
  }

  render() {
    const ts = this.props.tileSize,
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

    return (
      <div className='hero'>
        <p className='hero-heading'>Character Info</p>
        <div className='hero-type'>
          <canvas id='hero-icon' className='hero-icon' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Name: {this.state.heroName}</p>
            <p>Type: {this.props.hero}</p>
          </div>
        </div>
        <p className='stat-row'>Level: {lvl}</p>
        <p className='stat-row'>Health: {curHp}/{maxHp}</p>
        <p className='stat-row'>Gold: {gold}</p>
        <p className='stat-row'>Exp: {exp}/{expToLvl}</p>
        <p className='stat-row'>Atk: {atk}</p>
        <p className='stat-row'>Def: {def}</p>
        <p className='stat-row'>Vit: {vit}</p>
        <p className='stat-row'>Dur: {dur}</p>
        <p className='stat-row'>Str: {str}</p>
        <p className='stat-row'>Agi: {agi}</p>
        <div className='equip-row'>
          <canvas id='hero-hed' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Head</p>
            <p className='equip-name'>{hed}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-wep' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Weapon</p>
            <p className='equip-name'>{wep}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-amu' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Amulet</p>
            <p className='equip-name'>{amu}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-bod' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Armor</p>
            <p className='equip-name'>{bod}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-shd' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Shield</p>
            <p className='equip-name'>{shd}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-glv' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Glove</p>
            <p className='equip-name'>{glv}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-rng' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Ring</p>
            <p className='equip-name'>{rng}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='hero-ft' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Foot</p>
            <p className='equip-name'>{ft}</p>
          </div>
        </div>
      </div>
    );
  }
}
