/**
 * Weapons
 */


//Short Weapons
const knife1 = {
  name: 'Arrow Head',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [96, 32, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 4, iAgility: 1}
};

const knife2 = {
  name: 'Bone Knife',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [64, 32, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iAttack: 12, iAgility: 2}
};

const knife3 = {
  name: 'Fishing Knife',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [160, 0, 32, 32],
  buy: 40,
  sell: 20,
  stats: {iAttack: 20, iAgility: 4}
};

const knife4 = {
  name: 'Jagged Dagger',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [224, 0, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 32, iStrength: 1, iAgility: 5}
};

const knife5 = {
  name: 'Rune Dagger',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [0, 32, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iAttack: 48, iStrength: 2, iAgility: 6}
};

const knife6 = {
  name: 'Coral Dagger',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [0, 0, 32, 32],
  buy: 110,
  sell: 55,
  stats: {iAttack: 68, iStrength: 2, iAgility: 7}
};

const knife7 = {
  name: 'Divining Dagger',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [96, 0, 32, 32],
  buy: 140,
  sell: 70,
  stats: {iAttack: 92, iStrength: 3, iAgility: 9}
};

//Swords
const sword1 = {
  name: 'Rough Club',
  type: 'weapon',
  palette: 'shortWepPalette',
  iconLoc: [32, 64, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 4, iStrength: 1}
};

const sword2 = {
  name: 'Practice Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [128, 0, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iAttack: 12, iStrength: 2}
};

const sword3 = {
  name: 'Short Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [160, 0, 32, 32],
  buy: 40,
  sell: 20,
  stats: {iAttack: 20, iStrength: 4}
};

const sword4 = {
  name: 'Bronze Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [64, 0, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 32, iStrength: 5, iAgility: 1}
};

const sword5 = {
  name: 'Rune Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [96, 0, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iAttack: 44, iStrength: 7, iAgility: 2}
};

const sword6 = {
  name: 'Coral Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [0, 0, 32, 32],
  buy: 110,
  sell: 55,
  stats: {iAttack: 60, iStrength: 9, iAgility: 2}
};

const sword7 = {
  name: 'Dark Sword',
  type: 'weapon',
  palette: 'medWepPalette',
  iconLoc: [32, 0, 32, 32],
  buy: 140,
  sell: 70,
  stats: {iAttack: 80, iStrength: 11, iAgility: 3}
};


// Polearms
const pole1 = {
  name: 'Long Pole',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [64, 128, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 4, iDurability: 1}
};

const pole2 = {
  name: 'Big Spade',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [128, 128, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iAttack: 8, iVitality: 1, iDurability: 1}
};

const pole3 = {
  name: 'Trident',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [192, 0, 32, 32],
  buy: 40,
  sell: 20,
  stats: {iAttack: 16, iVitality: 2, iDurability: 1, iStrength: 1}
};

const pole4 = {
  name: 'Narrow Spear',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [160, 0, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 24, iVitality: 3, iDurability: 2, iStrength: 2}
};

const pole5 = {
  name: 'Rune Voulge',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [128, 64, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iAttack: 36, iVitality: 4, iDurability: 2, iStrength: 4}
};

const pole6 = {
  name: 'Coral Bardiche',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [32, 128, 32, 32],
  buy: 110,
  sell: 55,
  stats: {iAttack: 48, iVitality: 4, iDurability: 4, iStrength: 5}
};

const pole7 = {
  name: 'Royal Poleaxe',
  type: 'weapon',
  palette: 'longWepPalette',
  iconLoc: [128, 0, 32, 32],
  buy: 140,
  sell: 70,
  stats: {iAttack: 72, iVitality: 5, iDurability: 5, iStrength: 5}
};


//Wands
const wand1 = {
  name: 'Bent Stick',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [96, 160, 32, 32],
  buy: 10,
  sell: 5,
  stats: {iAttack: 8}
};

const wand2 = {
  name: 'Summoning Fork',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [0, 96, 32, 32],
  buy: 20,
  sell: 10,
  stats: {iAttack: 20}
};

const wand3 = {
  name: 'Scavenged Wand',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [32, 0, 32, 32],
  buy: 40,
  sell: 20,
  stats: {iAttack: 28, iVitality: 1, iStrength: 1}
};

const wand4 = {
  name: 'Oak Rod',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [96, 128, 32, 32],
  buy: 60,
  sell: 30,
  stats: {iAttack: 52, iVitality: 1, iStrength: 2}
};

const wand5 = {
  name: 'Rune Wand',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [224, 0, 32, 32],
  buy: 80,
  sell: 40,
  stats: {iAttack: 72, iVitality: 2, iStrength: 2}
};

const wand6 = {
  name: 'Blazing Wand',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [32, 128, 32, 32],
  buy: 110,
  sell: 55,
  stats: {iAttack: 88, iVitality: 2, iStrength: 2, iAgility: 2}
};

const wand7 = {
  name: 'Divining Rod',
  type: 'weapon',
  palette: 'wandWepPalette',
  iconLoc: [0, 192, 32, 32],
  buy: 140,
  sell: 70,
  stats: {iAttack: 112, iVitality: 4, iStrength: 2, iAgility: 2}
};
