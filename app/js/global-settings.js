'use strict';

/**
 * Global Settings
 */

var statConvertWordMap = {
  curHealth: 'HP',
  iAttack: 'Atk',
  iDefense: 'Def',
  iVitality: 'Vit',
  iDurability: 'Dur',
  iStrength: 'Str',
  iAgility: 'Agi'
};

var equipAbbrevMap = {
  Head: 'HED',
  Amulet: 'AMU',
  Weapon: 'WEP',
  Armor: 'AMR',
  Shield: 'SLD',
  Glove: 'GLV',
  Ring: 'RNG',
  Foot: 'FT',
  Consumable: 'CNS'
};

var consumableAbbrevMap = {
  potion: { name: 'Potion', key: 'potion', abbrev: 'LPOT', num: 1 },
  hiPotion: { name: 'Hi Potion', key: 'hiPotion', abbrev: 'HPOT', num: 2 },
  xPotion: { name: 'X Potion', key: 'xPotion', abbrev: 'XPOT', num: 3 },
  tomeOfVitality: { name: 'Tome of Vitality', key: 'tomeOfVitality', abbrev: 'VTOM', num: 4 },
  tomeOfDurability: { name: 'Tome of Durability', key: 'tomeOfDurability', abbrev: 'DTOM', num: 5 },
  tomeOfStrength: { name: 'Tome of Strength', key: 'tomeOfStrength', abbrev: 'STOM', num: 6 },
  tomeOfAgility: { name: 'Tome of Agility', key: 'tomeOfAgility', abbrev: 'ATOM', num: 7 },
  tomeOfWisdom: { name: 'Tome of Wisdom', key: 'tomeOfWisdom', abbrev: 'WTOM', num: 8 }
};

//Global state
var timeRef = null;