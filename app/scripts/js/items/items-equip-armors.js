'use strict';

/**
 * Armor
 */

var itemArmors = {
  //Mage armor
  clothArm1: {
    name: "Moldy Robe",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [0, 128, 32, 32],
    buy: 10,
    sell: 5,
    stats: { iDefense: 4, iVitality: 1, iStrength: 1 },
    spawnQuant: { '2': 1 }
  },
  clothArm2: {
    name: "Adept Robe",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [32, 128, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iDefense: 4, iVitality: 2, iStrength: 2 },
    spawnQuant: { '4': 1 }
  },
  clothArm3: {
    name: "Shining Robe",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [64, 128, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 8, iVitality: 3, iStrength: 2, iDurability: 1 },
    spawnQuant: { '6': 1 }
  },
  clothArm4: {
    name: "Ancient Robe",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [128, 128, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iDefense: 12, iVitality: 4, iStrength: 3, iDurability: 1 },
    spawnQuant: { '8': 1 }
  },
  clothArm5: {
    name: "Brilliant Robe",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [96, 128, 32, 32],
    buy: 80,
    sell: 40,
    stats: { iDefense: 16, iVitality: 6, iStrength: 3, iDurability: 1 },
    spawnQuant: { '10': 1 }
  },
  //Rogue armor
  leatherArm1: {
    name: "Cracked Leather Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [32, 256, 32, 32],
    buy: 10,
    sell: 5,
    stats: { iDefense: 4, iStrength: 1, iAgility: 1 },
    spawnQuant: { '2': 1 }
  },
  leatherArm2: {
    name: "Supple Leather Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [0, 256, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iDefense: 8, iStrength: 1, iAgility: 2 },
    spawnQuant: { '4': 1 }
  },
  leatherArm3: {
    name: "Reinforced Leather Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [96, 256, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 16, iStrength: 2, iAgility: 2 },
    spawnQuant: { '6': 1 }
  },
  leatherArm4: {
    name: "Rune Leather Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [160, 256, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iDefense: 20, iStrength: 2, iAgility: 4 },
    spawnQuant: { '8': 1 }
  },
  leatherArm5: {
    name: "Dark Leather Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [128, 256, 32, 32],
    buy: 80,
    sell: 40,
    stats: { iDefense: 20, iStrength: 3, iAgility: 6 },
    spawnQuant: { '10': 1 }
  },
  //Warrior armor
  chainArm1: {
    name: "Rusted Chainmail Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [32, 0, 32, 32],
    buy: 10,
    sell: 5,
    stats: { iDefense: 8, iStrength: 1 },
    spawnQuant: { '2': 1 }
  },
  chainArm2: {
    name: "Bronze Chainmail Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [0, 0, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iDefense: 12, iStrength: 2 },
    spawnQuant: { '4': 1 }
  },
  chainArm3: {
    name: "Reinforced Chainmail Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [234, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 16, iStrength: 3, iAgility: 1 },
    spawnQuant: { '6': 1 }
  },
  chainArm4: {
    name: "Rune Chainmail Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [160, 0, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iDefense: 24, iStrength: 4, iAgility: 1 },
    spawnQuant: { '8': 1 }
  },
  chainArm5: {
    name: "Brilliant Chainmail Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [192, 0, 32, 32],
    buy: 80,
    sell: 40,
    stats: { iDefense: 28, iStrength: 5, iDurability: 1, iAgility: 1 },
    spawnQuant: { '10': 1 }
  },
  //Paladin armor
  plateArm1: {
    name: "Rusted Plate Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [0, 192, 32, 32],
    buy: 10,
    sell: 5,
    stats: { iDefense: 12 },
    spawnQuant: { '2': 1 }
  },
  plateArm2: {
    name: "Bronze Plate Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [32, 192, 32, 32],
    buy: 20,
    sell: 10,
    stats: { iDefense: 16, iDurability: 1 },
    spawnQuant: { '4': 1 }
  },
  plateArm3: {
    name: "Reinforced Plate Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [160, 192, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 24, iDurability: 2 },
    spawnQuant: { '6': 1 }
  },
  plateArm4: {
    name: "Rune Plate Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [192, 192, 32, 32],
    buy: 50,
    sell: 25,
    stats: { iDefense: 32, iVitality: 1, iDurability: 2 },
    spawnQuant: { '8': 1 }
  },
  plateArm5: {
    name: "Brilliant Plate Armor",
    type: 'armor',
    palette: 'armorPalette',
    iconLoc: [224, 192, 32, 32],
    buy: 80,
    sell: 40,
    stats: { iDefense: 36, iVitality: 2, iDurability: 3 },
    spawnQuant: { '10': 1 }
  }
};