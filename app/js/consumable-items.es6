/**
 * Consumable Items
 */

const itemConsumables = {
  //Potions
  potion: {
    name: 'Potion',
    type: 'consumable',
    palette: 'potionPalette',
    iconLoc: [0, 0, 32, 32],
    buy: 20,
    sell: 10,
    stats: {curHealth: 50},
    spawnQuant: {'1': 2, '2': 3, '3': 3, '4': 2, '5': 1}
  },
  hiPotion: {
    name: 'Hi Potion',
    type: 'consumable',
    palette: 'potionPalette',
    iconLoc: [64, 0, 32, 32],
    buy: 50,
    sell: 25,
    stats: {curHealth: 150},
    spawnQuant: {'4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2}
  },
  xPotion: {
    name: 'X Potion',
    type: 'consumable',
    palette: 'potionPalette',
    iconLoc: [96, 64, 32, 32],
    buy: 150,
    sell: 75,
    stats: {curHealth: 500},
    spawnQuant: {'10': 1}
  },
  //Tomes
  tomeOfVitality: {
    name: 'Tome of Vitality',
    type: 'consumable',
    palette: 'bookPalette',
    iconLoc: [192, 160, 32, 32],
    buy: 100,
    sell: 50,
    stats: {iVitality: 1},
    spawnQuant: {'3': 1, '6': 1, '9': 1}
  },
  tomeOfDurability: {
    name: 'Tome of Durability',
    type: 'consumable',
    palette: 'bookPalette',
    iconLoc: [192, 192, 32, 32],
    buy: 100,
    sell: 50,
    stats: {iDurability: 1},
    spawnQuant: {'2': 1, '5': 1, '8': 1}
  },
  tomeOfStrength: {
    name: 'Tome of Strength',
    type: 'consumable',
    palette: 'bookPalette',
    iconLoc: [0, 224, 32, 32],
    buy: 100,
    sell: 50,
    stats: {iStrength: 1},
    spawnQuant: {'1': 1, '4': 1, '8': 1}
  },
  tomeOfAgility: {
    name: 'Tome of Agility',
    type: 'consumable',
    palette: 'bookPalette',
    iconLoc: [64, 224, 32, 32],
    buy: 100,
    sell: 50,
    stats: {iAgility: 1},
    spawnQuant: {'2': 1, '5': 1, '9': 1}
  },
  tomeOfWisdom: {
    name: 'Tome of Wisdom',
    type: 'consumable',
    palette: 'bookPalette',
    iconLoc: [0, 160, 32, 32],
    buy: 200,
    sell: 100,
    stats: {statPoints: 1},
    spawnQuant: {'4': 1, '6': 1, '8': 1, '10': 1}
  },
  //Gold
  gold1: {
    name: 'a little Gold',
    type: 'gold',
    palette: 'moneyPalette',
    iconLoc: [32, 32, 32, 32],
    stats: {gold: randInt(1,3)},
    spawnQuant: {'1': 10, '2': 10, '3': 7, '4': 5, '5': 3}
  },
  gold2: {
    name: 'some Gold',
    type: 'gold',
    palette: 'moneyPalette',
    iconLoc: [32, 32, 32, 32],
    stats: {gold: randInt(4,7)},
    spawnQuant: {'3': 2, '4': 4, '5': 7, '6': 9, '7': 6, '8': 3, '9': 1}
  },
  gold3: {
    name: 'a small pile of Gold',
    type: 'gold',
    palette: 'moneyPalette',
    iconLoc: [0, 32, 32, 32],
    stats: {gold: randInt(8,12)},
    spawnQuant: {'7': 3, '8': 6, '9': 7, '10': 4}
  },
  gold4: {
    name: 'a pile of Gold',
    type: 'gold',
    palette: 'moneyPalette',
    iconLoc: [0, 32, 32, 32],
    stats: {gold: randInt(13,17)},
    spawnQuant: {'9': 2, '10': 6}
  }
};
