const charTypeStats = {
  Mage: {
    heroName: 'Forsyth',
    health: 53,
    attack: 12,
    defense: 10,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 12,
    durability: 10,
    strength: 12,
    agility: 10,
    onLevelUp: {
      health: 0,
      attack: 5,
      defense: 0,
      vitality: 1,
      durability: 0,
      strength: 2,
      agility: 1,
    }
  },
  Paladin: {
    heroName: 'Roland',
    health: 53,
    attack: 10,
    defense: 12,
    hit: 90,
    crit: 5,
    dodge: 10,
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
      agility: 0,
    }
  },
  Rogue: {
    heroName: 'Hanzo',
    health: 50,
    attack: 13,
    defense: 10,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 10,
    durability: 10,
    strength: 12,
    agility: 12,
    onLevelUp: {
      health: 6,
      attack: 3,
      defense: 0,
      vitality: 0,
      durability: 0,
      strength: 2,
      agility: 2,
    }
  },
  Warrior: {
    heroName: 'Agis',
    health: 50,
    attack: 12,
    defense: 11,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 10,
    durability: 12,
    strength: 12,
    agility: 10,
    onLevelUp: {
      health: 6,
      attack: 2,
      defense: 1,
      vitality: 0,
      durability: 1,
      strength: 2,
      agility: 1,
    }
  }
}

const statConversion = {
  vitToHp: 9,
  durToHp: 3,
};

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.initHero = this.initHero.bind(this);
    this.handleLevelUp = this.handleLevelUp.bind(this);

    this.setState({
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
      expLevelMult: 1.75
    });
  }

  initHero(hero) {
    const char = Object.assign({}, charTypeStats[hero]),
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
    if (this.props.hero !== nextProps.hero && nextProps.hero) {
      initHero(nextProps.hero);
    }
  }

  render() {
    return (
      <a></a>
    );
  }
}
