'use strict';

var enemyReptile = {
  bloodSnake: {
    name: 'Blood Snake',
    type: 'reptile',
    palette: ['reptile0Palette', 'reptile1Palette'],
    iconLoc: [96, 128],
    spawnQuant: { '1': 10, '2': 25 },
    boss: false,
    aggression: 3,
    levelRange: [2, 3],
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
      bHealth: 8,
      bAttack: 4,
      bDefense: 2,
      bVitality: 4,
      bDurability: 2,
      bStrength: 2,
      bAgility: 4
    }
  },
  wingedViper: {
    name: 'Winged Viper',
    type: 'reptile',
    palette: ['reptile0Palette', 'reptile1Palette'],
    iconLoc: [96, 0],
    spawnQuant: { '2': 25, '3': 25 },
    boss: false,
    aggression: 3,
    levelRange: [3, 4],
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
      bHealth: 8,
      bAttack: 4,
      bDefense: 2,
      bVitality: 4,
      bDurability: 2,
      bStrength: 2,
      bAgility: 4
    }
  },
  abyssDragon: {
    name: 'Abyss Dragon',
    type: 'reptile',
    palette: ['reptile0Palette', 'reptile1Palette'],
    iconLoc: [96, 128],
    spawnQuant: { '10': 20 },
    boss: false,
    aggression: 4,
    levelRange: [13, 16],
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
      bHealth: 8,
      bAttack: 4,
      bDefense: 2,
      bVitality: 4,
      bDurability: 2,
      bStrength: 2,
      bAgility: 4
    }
  }
};