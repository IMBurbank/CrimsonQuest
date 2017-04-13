/**
 * Armor
 */

//Mage armor
const clothArm1 = {
  name: "Moldy Robe",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [0, 128, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iDefense: 4, iVitality: 1, iStrength: 1}
};

const clothArm2 = {
  name: "Adept Robe",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [32, 128, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iDefense: 4, iVitality: 2, iStrength: 2}
};

const clothArm3 = {
  name: "Shining Robe",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [64, 128, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iDefense: 8, iVitality: 3, iStrength: 2, iDurability: 1}
};

const clothArm4 = {
  name: "Ancient Robe",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [128, 128, 32, 32],
  buy: 50,
  sell: 25,
  stats: {iDefense: 12, iVitality: 4, iStrength: 3, iDurability: 1}
};

const clothArm5 = {
  name: "Brilliant Robe",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [96, 128, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iDefense: 16, iVitality: 6, iStrength: 3, iDurability: 1}
};


//Rogue armor
const leatherArm1 = {
  name: "Cracked Leather Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [32, 256, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iDefense: 4, iStrength: 1, iAgility: 1}
};

const leatherArm2 = {
  name: "Supple Leather Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [0, 256, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iDefense: 8, iStrength: 1, iAgility: 2}
};

const leatherArm3 = {
  name: "Reinforced Leather Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [96, 256, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iDefense: 16, iStrength: 2, iAgility: 2}
};

const leatherArm4 = {
  name: "Rune Leather Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [160, 256, 32, 32],
  buy: 50,
  sell: 25,
  stats: {iDefense: 20, iStrength: 2, iAgility: 4}
};

const leatherArm5 = {
  name: "Dark Leather Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [128, 256, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iDefense: 20, iStrength: 3, iAgility: 6}
};


//Warrior armor
const chainArm1 = {
  name: "Rusted Chainmail Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [32, 0, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iDefense: 8, iStrength: 1}
};

const chainArm2 = {
  name: "Bronze Chainmail Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [0, 0, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iDefense: 12, iStrength: 2}
};

const chainArm3 = {
  name: "Reinforced Chainmail Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [234, 0, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iDefense: 16, iStrength: 3, iAgility: 1}
};

const chainArm4 = {
  name: "Rune Chainmail Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [160, 0, 32, 32],
  buy: 50,
  sell: 25,
  stats: {iDefense: 24, iStrength: 4, iAgility: 1}
};

const chainArm5 = {
  name: "Brilliant Chainmail Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [192, 0, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iDefense: 28, iStrength: 5, iDurability: 1, iAgility: 1}
};


//Paladin armor
const plateArm1 = {
  name: "Rusted Plate Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [0, 192, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iDefense: 12}
};

const plateArm2 = {
  name: "Bronze Plate Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [32, 192, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iDefense: 16, iDurability: 1}
};

const plateArm3 = {
  name: "Reinforced Plate Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [160, 192, 32, 32],
  buy: 30,
  sell: 15,
  stats: {iDefense: 24, iDurability: 2}
};

const plateArm4 = {
  name: "Rune Plate Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [192, 192, 32, 32],
  buy: 50,
  sell: 25,
  stats: {iDefense: 32, iVitality: 1, iDurability: 2}
};

const plateArm5 = {
  name: "Brilliant Plate Armor",
  type: 'armor',
  palette: 'armPalette',
  iconLoc: [224, 192, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iDefense: 36, iVitality: 2, iDurability: 3}
};
