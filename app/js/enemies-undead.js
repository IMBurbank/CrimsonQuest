'use strict';

var enemyUndead = {
  necromancer: {
    name: 'Necromancer',
    type: 'undead',
    palette: ['undead0Palette', 'undead1Palette'],
    iconLoc: [0, 160],
    spawnQuant: { '9': 10 },
    boss: false,
    aggression: 4,
    levelRange: [8, 10],
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