/**
 * Amulets
 */

const itemAmulets = {
  //Mage Amulets
  mageAmu1: {
    name: "Damaged Amulet of Striking",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [32, 0, 32, 32],
    buy: 10,
    sell: 5,
    stats: {iAttack: 8},
    spawnQuant: {'3': 1}
  },
  mageAmu2: {
    name: "Amulet of Striking",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [0, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: {iAttack: 12, iStrength: 1},
    spawnQuant: {'5': 1}
  },
  mageAmu3: {
    name: "Enchanted Amulet of Striking",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [64, 0, 32, 32],
    buy: 60,
    sell: 30,
    stats: {iAttack: 16, iStrength: 2, iAgility: 1},
    spawnQuant: {'7': 1}
  },
  //Rogue Amulets
  rogueAmu1: {
    name: "Damaged Amulet of Stealth",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [96, 0, 32, 32],
    buy: 10,
    sell: 5,
    stats: {iAttack: 4, iAgility: 1},
    spawnQuant: {'3': 1}
  },
  rogueAmu2: {
    name: "Amulet of Stealth",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [160, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: {iAttack: 4, iStrength: 1, iAgility: 2},
    spawnQuant: {'5': 1}
  },
  rogueAmu3: {
    name: "Enchanted Amulet of Stealth",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [128, 0, 32, 32],
    buy: 60,
    sell: 30,
    stats: {iAttack: 8, iStrength: 1, iAgility: 4},
    spawnQuant: {'7': 1}
  },
  //Warrior Amulets
  warriorAmu1: {
    name: "Damaged Amulet of Power",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [224, 0, 32, 32],
    buy: 10,
    sell: 5,
    stats: {iStrength: 2},
    spawnQuant: {'3': 1}
  },
  warriorAmu2: {
    name: "Amulet of Power",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [196, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: {iStrength: 2, iDurability: 1},
    spawnQuant: {'5': 1}
  },
  warriorAmu3: {
    name: "Enchanted Amulet of Power",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [0, 32, 32, 32],
    buy: 60,
    sell: 30,
    stats: {iStrength: 4, iDurability: 2, iAgility: 1},
    spawnQuant: {'7': 1}
  },
  //Paladin Amulets
  paladinAmu1: {
    name: "Damaged Amulet of Life",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [32, 32, 32, 32],
    buy: 10,
    sell: 5,
    stats: {iVitality: 2},
    spawnQuant: {'3': 1}
  },
  paladinAmu2: {
    name: "Amulet of Life",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [96, 32, 32, 32],
    buy: 30,
    sell: 15,
    stats: {iVitality: 3, iDurabilty: 1},
    spawnQuant: {'5': 1}
  },
  paladinAmu3: {
    name: "Enchanted Amulet of Life",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [64, 32, 32, 32],
    buy: 60,
    sell: 30,
    stats: {iVitality: 4, iStrength: 1, iDurabilty: 2},
    spawnQuant: {'7': 1}
  },
  //Special Amulets
  specialAmu1: {
    name: "Cracked Ancient Amulet",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [160, 32, 32, 32],
    buy: 120,
    sell: 60,
    stats: {iDurability: 2, iAgility: 2},
    spawnQuant: {}
  },
  specialAmu2: {
    name: "Dark Amulet",
    type: 'amulet',
    palette: 'amuletPalette',
    iconLoc: [128, 32, 32, 32],
    buy: 400,
    sell: 200,
    stats: {iStrength: 5, iAgility: 4},
    spawnQuant: {}
  },
};
