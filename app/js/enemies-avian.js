'use strict';

var enemyAvian = {
  timidBat: {
    name: 'Timid Bat',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [128, 352],
    spawnQuant: { '1': 15 },
    boss: false,
    aggression: 2,
    levelRange: [1, 1],
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
  annoyedOwl: {
    name: 'Annoyed Owl',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [32, 320],
    spawnQuant: { '1': 10, '2': 10 },
    boss: false,
    aggression: 2,
    levelRange: [1, 2],
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
  bloodBat: {
    name: 'Blood Bat',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [64, 352],
    spawnQuant: { '3': 10, '4': 5 },
    boss: false,
    aggression: 3,
    levelRange: [4, 5],
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
  deathHawk: {
    name: 'Death Hawk',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [32, 32],
    spawnQuant: { '5': 10, '6': 10 },
    boss: false,
    aggression: 4,
    levelRange: [6, 7],
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
  bloodBeak: {
    name: 'Blood Beak',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [160, 96],
    spawnQuant: { '7': 10, '8': 10 },
    boss: false,
    aggression: 4,
    levelRange: [7, 8],
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
  }
};