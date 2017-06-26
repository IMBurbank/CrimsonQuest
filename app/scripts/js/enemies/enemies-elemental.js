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
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
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
    spawnQuant: { '5': 20, '6': 35 },
    boss: false,
    aggression: 4,
    levelRange: [5, 7],
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