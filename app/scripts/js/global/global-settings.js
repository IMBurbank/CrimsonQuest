'use strict';

//Global state
var timeRef = null;
var paddingCache = {};

/**
 * Global Settings
 */

//Room size Settings
var roomSize = {
  '4': { min: 16, max: 30 },
  '6': { min: 14, max: 20 },
  '8': { min: 11, max: 15 }
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

var statConvertWordMap = {
  curHealth: 'HP',
  iAttack: 'Atk',
  iDefense: 'Def',
  iVitality: 'Vit',
  iDurability: 'Dur',
  iStrength: 'Str',
  iAgility: 'Agi'
};

//Hero Stat Conversions
var statConversion = {
  vitToHp: 9,
  durToHp: 3,
  durToDef: 2,
  durToDodge: 0.1,
  strToAtk: 2,
  strToDef: 1,
  strToHit: 0.25,
  agiToHit: 1,
  agiToDodge: 0.5,
  agiToCrit: 0.5,
  atkToHpRange: [3, 5],
  defToHpRange: [1, 3],
  lvlToExpRange: [6, 9],
  lvlToGoldRange: [1, 3],
  expLevelMult: 1.75,
  lvlUpSkillPoints: 2,
  bossMultiplier: 2.5
};

/**
  *   Hero stats
  */

var heroTypeStats = {
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
      agility: 1
    },
    description: 'Not your usual paper tiger. Devasting attack and high vitality.'
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
      agility: 0
    },
    description: 'Keeper of the faith. Very durable. Not terribly agile.'
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
      agility: 2
    },
    description: 'Fierce. Deadly. Agile. Just don\'t get hit.'
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
      agility: 1
    },
    description: 'Well-rounded. Fierce. Fairly agile. You don\'t need health if your enemy is dead.'
  }

  /**
    *   Merchant Inventories
    */

};var merchantInventories = {
  travelingMerchant: {
    'Potion': {
      name: 'Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 200,
      palette: 'potionPalette',
      iconLoc: [0, 0, 32, 32],
      buy: 20,
      sell: 10,
      stats: { curHealth: 50 },
      spawnQuant: { '1': 2, '2': 3, '3': 3, '4': 2, '5': 1 }
    },
    specialAmu1: {
      name: "Cracked Ancient Amulet",
      type: 'amulet',
      count: 1,
      equipped: false,
      palette: 'amuletPalette',
      iconLoc: [160, 32, 32, 32],
      buy: 120,
      sell: 60,
      stats: { iDurability: 2, iAgility: 2 },
      spawnQuant: {}
    }
  },
  outlawMerchant: {
    'Potion': {
      name: 'Potion',
      type: 'consumable',
      count: 4,
      equipped: false,
      itemArrVal: 200,
      palette: 'potionPalette',
      iconLoc: [0, 0, 32, 32],
      buy: 20,
      sell: 10,
      stats: { curHealth: 50 },
      spawnQuant: { '1': 2, '2': 3, '3': 3, '4': 2, '5': 1 }
    },
    'Hi Potion': {
      name: 'Hi Potion',
      type: 'consumable',
      count: 4,
      equipped: false,
      itemArrVal: 201,
      palette: 'potionPalette',
      iconLoc: [64, 0, 32, 32],
      buy: 50,
      sell: 25,
      stats: { curHealth: 150 },
      spawnQuant: { '4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2 }
    },
    tomeOfWisdom: {
      name: 'Tome of Wisdom',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 207,
      palette: 'bookPalette',
      iconLoc: [0, 160, 32, 32],
      buy: 200,
      sell: 100,
      stats: { statPoints: 1 },
      spawnQuant: { '4': 1, '6': 1, '8': 1, '10': 1 }
    }
  },
  seedyMerchant: {
    'Potion': {
      name: 'Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 200,
      palette: 'potionPalette',
      iconLoc: [0, 0, 32, 32],
      buy: 20,
      sell: 10,
      stats: { curHealth: 50 },
      spawnQuant: { '1': 2, '2': 3, '3': 3, '4': 2, '5': 1 }
    },
    'Hi Potion': {
      name: 'Hi Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 201,
      palette: 'potionPalette',
      iconLoc: [64, 0, 32, 32],
      buy: 50,
      sell: 25,
      stats: { curHealth: 150 },
      spawnQuant: { '4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2 }
    },
    tomeOfVitality: {
      name: 'Tome of Vitality',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 203,
      palette: 'bookPalette',
      iconLoc: [192, 160, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iVitality: 1 },
      spawnQuant: { '3': 1, '6': 1, '9': 1 }
    },
    tomeOfDurability: {
      name: 'Tome of Durability',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 204,
      palette: 'bookPalette',
      iconLoc: [192, 192, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iDurability: 1 },
      spawnQuant: { '2': 1, '5': 1, '8': 1 }
    },
    tomeOfStrength: {
      name: 'Tome of Strength',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 205,
      palette: 'bookPalette',
      iconLoc: [0, 224, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iStrength: 1 },
      spawnQuant: { '1': 1, '4': 1, '8': 1 }
    },
    tomeOfAgility: {
      name: 'Tome of Agility',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 206,
      palette: 'bookPalette',
      iconLoc: [64, 224, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iAgility: 1 },
      spawnQuant: { '2': 1, '5': 1, '9': 1 }
    },
    tomeOfWisdom: {
      name: 'Tome of Wisdom',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 207,
      palette: 'bookPalette',
      iconLoc: [0, 160, 32, 32],
      buy: 200,
      sell: 100,
      stats: { statPoints: 1 },
      spawnQuant: { '4': 1, '6': 1, '8': 1, '10': 1 }
    },
    specialRng1: {
      name: "Dark Ring",
      type: 'ring',
      count: 1,
      equipped: false,
      palette: 'ringPalette',
      iconLoc: [128, 96, 32, 32],
      buy: 200,
      sell: 100,
      stats: { iStrength: 2, iAgility: 2 },
      spawnQuant: {}
    }
  },
  soullessMerchant: {
    'Hi Potion': {
      name: 'Hi Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 201,
      palette: 'potionPalette',
      iconLoc: [64, 0, 32, 32],
      buy: 50,
      sell: 25,
      stats: { curHealth: 150 },
      spawnQuant: { '4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2 }
    },
    xPotion: {
      name: 'X Potion',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 202,
      palette: 'potionPalette',
      iconLoc: [96, 64, 32, 32],
      buy: 150,
      sell: 75,
      stats: { curHealth: 500 },
      spawnQuant: { '10': 1 }
    },
    tomeOfWisdom: {
      name: 'Tome of Wisdom',
      type: 'consumable',
      count: 3,
      equipped: false,
      itemArrVal: 207,
      palette: 'bookPalette',
      iconLoc: [0, 160, 32, 32],
      buy: 200,
      sell: 100,
      stats: { statPoints: 1 },
      spawnQuant: { '4': 1, '6': 1, '8': 1, '10': 1 }
    },
    specialRng2: {
      name: "Dark Glowing Ring",
      type: 'ring',
      count: 1,
      equipped: false,
      palette: 'ringPalette',
      iconLoc: [32, 128, 32, 32],
      buy: 400,
      sell: 200,
      stats: { iStrength: 4, iAgility: 3 },
      spawnQuant: {}
    }
  },
  darkMerchant: {
    'Hi Potion': {
      name: 'Hi Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 201,
      palette: 'potionPalette',
      iconLoc: [64, 0, 32, 32],
      buy: 50,
      sell: 25,
      stats: { curHealth: 150 },
      spawnQuant: { '4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2 }
    },
    xPotion: {
      name: 'X Potion',
      type: 'consumable',
      count: 5,
      equipped: false,
      itemArrVal: 202,
      palette: 'potionPalette',
      iconLoc: [96, 64, 32, 32],
      buy: 150,
      sell: 75,
      stats: { curHealth: 500 },
      spawnQuant: { '10': 1 }
    },
    tomeOfVitality: {
      name: 'Tome of Vitality',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 203,
      palette: 'bookPalette',
      iconLoc: [192, 160, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iVitality: 1 },
      spawnQuant: { '3': 1, '6': 1, '9': 1 }
    },
    tomeOfDurability: {
      name: 'Tome of Durability',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 204,
      palette: 'bookPalette',
      iconLoc: [192, 192, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iDurability: 1 },
      spawnQuant: { '2': 1, '5': 1, '8': 1 }
    },
    tomeOfStrength: {
      name: 'Tome of Strength',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 205,
      palette: 'bookPalette',
      iconLoc: [0, 224, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iStrength: 1 },
      spawnQuant: { '1': 1, '4': 1, '8': 1 }
    },
    tomeOfAgility: {
      name: 'Tome of Agility',
      type: 'consumable',
      count: 1,
      equipped: false,
      itemArrVal: 206,
      palette: 'bookPalette',
      iconLoc: [64, 224, 32, 32],
      buy: 100,
      sell: 50,
      stats: { iAgility: 1 },
      spawnQuant: { '2': 1, '5': 1, '9': 1 }
    },
    tomeOfWisdom: {
      name: 'Tome of Wisdom',
      type: 'consumable',
      count: 2,
      equipped: false,
      itemArrVal: 207,
      palette: 'bookPalette',
      iconLoc: [0, 160, 32, 32],
      buy: 200,
      sell: 100,
      stats: { statPoints: 1 },
      spawnQuant: { '4': 1, '6': 1, '8': 1, '10': 1 }
    },
    specialAmu2: {
      name: "Dark Amulet",
      type: 'amulet',
      count: 1,
      equipped: false,
      palette: 'amuletPalette',
      iconLoc: [128, 32, 32, 32],
      buy: 400,
      sell: 200,
      stats: { iStrength: 5, iAgility: 4 },
      spawnQuant: {}
    }
  }
};