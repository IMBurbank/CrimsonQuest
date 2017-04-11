const Mage = {
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
    agility: 1,
  }
};

const Paladin = {
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
    agility: 0,
  }
};

const Rogue = {
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
    agility: 2,
  }
};

class Hero extends React.Component {
  constructor(props) {
    super(props);


    this.setState({
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
  }

  initHero() {

  }

  render() {
    return (
      <a></a>
    );
  }
}
