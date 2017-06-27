'use strict';

var enemyElemental = {
  sandElemental: {
    name: 'Sand Elemental',
    type: 'elemental',
    palette: ['elemental0Palette', 'elemental1Palette'],
    iconLoc: [0, 32],
    spawnQuant: { '3': 20, '4': 35 },
    boss: false,
    aggression: 3,
    levelRange: [5, 6],
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
      bHealth: 10,
      bAttack: 3,
      bDefense: 5,
      bVitality: 3,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  fireElemental: {
    name: 'Fire Elemental',
    type: 'elemental',
    palette: ['elemental0Palette', 'elemental1Palette'],
    iconLoc: [64, 160],
    spawnQuant: { '5': 25, '6': 35 },
    boss: false,
    aggression: 4,
    levelRange: [6, 8],
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
      bHealth: 10,
      bAttack: 3,
      bDefense: 5,
      bVitality: 3,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  }
};