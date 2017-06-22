'use strict';

/**
 * Rings
 */

var itemRings = {
  //Mage rings
  mageRng1: {
    name: "Damaged Ring of Striking",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [0, 0, 32, 32],
    buy: 5,
    sell: 2,
    stats: { iAttack: 4 },
    spawnQuant: { '1': 1 }
  },
  mageRng2: {
    name: "Ring of Striking",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [64, 32, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iAttack: 8, iAgility: 1 },
    spawnQuant: { '3': 1 }
  },
  mageRng3: {
    name: "Enchanted Ring of Striking",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [64, 64, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iAttack: 12, iVitality: 1, iAgility: 1 },
    spawnQuant: { '9': 1 }
  },
  //Rogue rings
  rogueRng1: {
    name: "Damaged Ring of Stealth",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [160, 0, 32, 32],
    buy: 5,
    sell: 2,
    stats: { iAgility: 1 },
    spawnQuant: { '1': 1 }
  },
  rogueRng2: {
    name: "Ring of Stealth",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [0, 32, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iStrength: 1, iAgility: 2 },
    spawnQuant: { '3': 1 }
  },
  rogueRng3: {
    name: "Enchanted Ring of Stealth",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [160, 32, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iVitalitY: 1, iStrength: 1, iAgility: 3 },
    spawnQuant: { '9': 1 }
  },
  //Warrior rings
  warriorRng1: {
    name: "Damaged Ring of Power",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [192, 0, 32, 32],
    buy: 5,
    sell: 2,
    stats: { iStrength: 1 },
    spawnQuant: { '1': 1 }
  },
  warriorRng2: {
    name: "Ring of Power",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [0, 64, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iDurability: 1, iStrength: 2 },
    spawnQuant: { '3': 1 }
  },
  warriorRng3: {
    name: "Enchanted Ring of Power",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [96, 96, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iDurability: 1, iStrength: 3, iAgility: 1 },
    spawnQuant: { '9': 1 }
  },
  //Paladin rings
  paladinRng1: {
    name: "Damaged Ring of Life",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [224, 0, 32, 32],
    buy: 5,
    sell: 2,
    stats: { iVitality: 1 },
    spawnQuant: { '1': 1 }
  },
  paladinRng2: {
    name: "Ring of Life",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [192, 32, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iVitality: 1, iDurability: 1, iStrength: 1 },
    spawnQuant: { '3': 1 }
  },
  paladinRng3: {
    name: "Enchanted Ring of Life",
    type: 'ring',
    palette: 'ringPalette',
    iconLoc: [192, 32, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iVitality: 2, iDurability: 2, iStrength: 1 },
    spawnQuant: { '9': 1 }
  }
};