

const enemyUndead = {
  necromancer: {
    name: 'Necromancer',
    type: 'undead',
    palette: ['undead0Palette', 'undead1Palette'],
    iconLoc: [0,160],
    spawnQuant: {'9': 30},
    boss: false,
    aggression: 4,
    levelRange: [11,13],
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
      bAgility: 10,
    },
    onLevelUp: {
      bHealth: 12,
      bAttack: 4,
      bDefense: 2,
      bVitality: 4,
      bDurability: 1,
      bStrength: 2,
      bAgility: 2
    },
  },
};
