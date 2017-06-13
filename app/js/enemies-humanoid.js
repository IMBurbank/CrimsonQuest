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
    inventory: {
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
        count: 3,
        equipped: false,
        itemArrVal: 201,
        palette: 'potionPalette',
        iconLoc: [64, 0, 32, 32],
        buy: 50,
        sell: 25,
        stats: { curHealth: 150 },
        spawnQuant: { '4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2 }
      }
    }
  }
};