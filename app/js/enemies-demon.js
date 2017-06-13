'use strict';

var enemyDemon = {
  deviousImp: {
    name: 'Devious Imp',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [64, 128],
    spawnQuant: { '4': 10, '5': 10 },
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
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  chupacabra: {
    name: 'Chupacabra',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [0, 256],
    spawnQuant: { '6': 10, '7': 10 },
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
      bHealth: 6,
      bAttack: 3,
      bDefense: 4,
      bVitality: 2,
      bDurability: 2,
      bStrength: 2,
      bAgility: 3
    }
  },
  vileSuccubus: {
    name: 'Vile Succubus',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [0, 224],
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
  },
  abyssHound: {
    name: 'Vile Succubus',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [160, 0],
    spawnQuant: { '8': 10, '9': 10 },
    boss: false,
    aggression: 4,
    levelRange: [8, 9],
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
  demonGuard: {
    name: 'Demon Guard',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [32, 32],
    spawnQuant: { '9': 10, '10': 10 },
    boss: false,
    aggression: 5,
    levelRange: [9, 10],
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
  abyssCambion: {
    name: 'Abyss Cambion',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [192, 64],
    spawnQuant: { '10': 10 },
    boss: false,
    aggression: 5,
    levelRange: [10, 11],
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
  agares: {
    name: 'Agares',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [224, 32],
    spawnQuant: { '6': 1 },
    boss: true,
    aggression: 3,
    levelRange: [8, 8],
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
  asmodius: {
    name: 'Asmodius',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [128, 32],
    spawnQuant: { '7': 1 },
    boss: true,
    aggression: 4,
    levelRange: [9, 9],
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
  belphagor: {
    name: 'Belphagor',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [192, 0],
    spawnQuant: { '8': 1 },
    boss: true,
    aggression: 5,
    levelRange: [10, 10],
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
  astaroth: {
    name: 'Astaroth',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [192, 32],
    spawnQuant: { '9': 1 },
    boss: true,
    aggression: 5,
    levelRange: [12, 12],
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
  azazel: {
    name: 'Azazel',
    type: 'demon',
    palette: ['demon0Palette', 'demon1Palette'],
    iconLoc: [96, 32],
    spawnQuant: { '10': 1 },
    boss: true,
    aggression: 5,
    levelRange: [13, 13],
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