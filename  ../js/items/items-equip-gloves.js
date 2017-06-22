'use strict';

/**
 * Gloves
 */

var itemGloves = {
  mageGlv1: {
    name: "Cloth Gloves",
    type: 'glove',
    palette: 'glovePalette',
    iconLoc: [32, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iVitality: 2, iStrength: 1, iAgility: 1 },
    spawnQuant: { '3': 1 }
  },
  rogueGlv1: {
    name: "Leather Gloves",
    type: 'glove',
    palette: 'glovePalette',
    iconLoc: [0, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iStrength: 2, iAgility: 2 },
    spawnQuant: { '3': 1 }
  },
  warriorGlv1: {
    name: "Battle Mitts",
    type: 'glove',
    palette: 'glovePalette',
    iconLoc: [64, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 8, iStrength: 2 },
    spawnQuant: { '3': 1 }
  },
  paladinGlv1: {
    name: "Plate Gloves",
    type: 'glove',
    palette: 'glovePalette',
    iconLoc: [96, 0, 32, 32],
    buy: 30,
    sell: 15,
    stats: { iDefense: 8, iDurabilty: 2 },
    spawnQuant: { '3': 1 }
  }
};