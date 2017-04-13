/**
 * Amulets
 */

//Mage Amulets
const mageAmu1 = {
  name: "Damaged Amulet of Striking",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [32, 0, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 8}
};

const mageAmu2 = {
  name: "Amulet of Striking",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [0, 0, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iAttack: 12, iStrength: 1}
};

const mageAmu3 = {
  name: "Enchanted Amulet of Striking",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [64, 0, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 16, iStrength: 2, iAgility: 1}
};


//Rogue Amulets
const rogueAmu1 = {
  name: "Damaged Amulet of Stealth",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [96, 0, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 4, iAgility: 1}
};

const rogueAmu2 = {
  name: "Amulet of Stealth",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [160, 0, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iAttack: 4, iStrength: 1, iAgility: 2}
};

const rogueAmu3 = {
  name: "Enchanted Amulet of Stealth",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [128, 0, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 8, iStrength: 1, iAgility: 4}
};


//Warrior Amulets
const warriorAmu1 = {
  name: "Damaged Amulet of Power",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [224, 0, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iStrength: 2}
};

const warriorAmu2 = {
  name: "Amulet of Power",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [196, 0, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iStrength: 2, iDurability: 1}
};

const warriorAmu3 = {
  name: "Enchanted Amulet of Power",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [0, 32, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iStrength: 4, iDurability: 2, iAgility: 1}
};


//Paladin Amulets
const paladinAmu1 = {
  name: "Damaged Amulet of Life",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [32, 32, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iVitality: 2}
};

const paladinAmu2 = {
  name: "Amulet of Life",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [96, 32, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iVitality: 3, iDurabilty: 1}
};

const paladinAmu3 = {
  name: "EnchantedAmulet of Life",
  type: 'amulet',
  palette: 'amuPalette',
  iconLoc: [64, 32, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iVitality: 4, iStrength: 1, iDurabilty: 2}
};
