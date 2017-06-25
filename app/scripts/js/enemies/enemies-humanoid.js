'use strict';

var enemyHumanoid = {
  eliTheTraitor: {
    name: 'Eli the Traitor',
    type: 'humanoid',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [160, 192],
    spawnQuant: { '1': 1 },
    boss: true,
    aggression: 3,
    levelRange: [2, 2],
    baseStats: {
      bHealth: 10,
      bAttack: 4,
      bDefense: 15,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  borisTheButcher: {
    name: 'Boris the Butcher',
    type: 'humanoid',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [0, 0],
    spawnQuant: { '2': 1 },
    boss: true,
    aggression: 3,
    levelRange: [3, 3],
    baseStats: {
      bHealth: 10,
      bAttack: 4,
      bDefense: 15,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  phanxTheRaider: {
    name: 'Phanx the Raider',
    type: 'humanoid',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [32, 64],
    spawnQuant: { '3': 1 },
    boss: true,
    aggression: 3,
    levelRange: [5, 5],
    baseStats: {
      bHealth: 10,
      bAttack: 4,
      bDefense: 15,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  quorakTheCannibal: {
    name: 'Quorak the Cannibal',
    type: 'humanoid',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [64, 128],
    spawnQuant: { '4': 1 },
    boss: true,
    aggression: 4,
    levelRange: [6, 6],
    baseStats: {
      bHealth: 10,
      bAttack: 4,
      bDefense: 15,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  theDarkDisciple: {
    name: 'The Dark Disciple',
    type: 'humanoid',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [128, 192],
    spawnQuant: { '5': 1 },
    boss: true,
    aggression: 4,
    levelRange: [7, 7],
    baseStats: {
      bHealth: 10,
      bAttack: 4,
      bDefense: 15,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  travelingMerchant: {
    name: 'Traveling Merchant',
    type: 'merchant',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [32, 160],
    spawnQuant: { '1': 1 },
    boss: false,
    aggression: 0,
    levelRange: [5, 5],
    baseStats: {
      bHealth: 10,
      bAttack: 0,
      bDefense: 150,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 0,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
    inventory: {}
  },
  outlawMerchant: {
    name: 'Outlaw Merchant',
    type: 'merchant',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [96, 160],
    spawnQuant: { '3': 1 },
    boss: false,
    aggression: 0,
    levelRange: [6, 8],
    baseStats: {
      bHealth: 10,
      bAttack: 0,
      bDefense: 150,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 0,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
    inventory: {}
  },
  seedyMerchant: {
    name: 'Seedy Merchant',
    type: 'merchant',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [64, 160],
    spawnQuant: { '5': 1 },
    boss: false,
    aggression: 0,
    levelRange: [8, 8],
    baseStats: {
      bHealth: 10,
      bAttack: 0,
      bDefense: 150,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 0,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
    inventory: {}
  },
  soullessMerchant: {
    name: 'Soulless Merchant',
    type: 'merchant',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [128, 160],
    spawnQuant: { '7': 1 },
    boss: false,
    aggression: 0,
    levelRange: [9, 11],
    baseStats: {
      bHealth: 10,
      bAttack: 0,
      bDefense: 150,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 0,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
    inventory: {}
  },
  darkMerchant: {
    name: 'Dark Merchant',
    type: 'merchant',
    palette: ['humanoid0Palette', 'humanoid1Palette'],
    iconLoc: [160, 160],
    spawnQuant: { '9': 1 },
    boss: false,
    aggression: 0,
    levelRange: [12, 12],
    baseStats: {
      bHealth: 10,
      bAttack: 0,
      bDefense: 150,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 0,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
    inventory: {}
  }
};