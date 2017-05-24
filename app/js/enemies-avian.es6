

const enemyAvian = {
  timidBat: {
    name: 'Timid Bat',
    type: 'avian',
    palette: ['avian0Palette', 'avian1Palette'],
    iconLoc: [128,352],
    spawnQuant: {'1': 30, '2': 20},
    boss: false,
    aggression: 4,
    levelRange: [1,2],
    baseStats: {
      bHealth: 10,
      bAttack: 3,
      bDefense: 10,
      bHit: 60,
      bCrit: 5,
      bDodge: 15,
      bVitality: 2,
      bDurability: 4,
      bStrength: 5,
      bAgility: 10,
    },
    onLevelUp: {
      bHealth: 6,
      bAttack: 1,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    },
  },
};
