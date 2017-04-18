'use strict';

var heroTypeStats = {
  Mage: {
    heroName: 'Forsyth',
    health: 53,
    attack: 12,
    defense: 10,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 12,
    durability: 10,
    strength: 12,
    agility: 10,
    onLevelUp: {
      health: 0,
      attack: 5,
      defense: 0,
      vitality: 1,
      durability: 0,
      strength: 2,
      agility: 1
    }
  },
  Paladin: {
    heroName: 'Roland',
    health: 53,
    attack: 10,
    defense: 12,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 11,
    durability: 11,
    strength: 11,
    agility: 11,
    onLevelUp: {
      health: 6,
      attack: 1,
      defense: 2,
      vitality: 1,
      durability: 2,
      strength: 1,
      agility: 0
    }
  },
  Rogue: {
    heroName: 'Hanzo',
    health: 50,
    attack: 13,
    defense: 10,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 10,
    durability: 10,
    strength: 12,
    agility: 12,
    onLevelUp: {
      health: 6,
      attack: 3,
      defense: 0,
      vitality: 0,
      durability: 0,
      strength: 2,
      agility: 2
    }
  },
  Warrior: {
    heroName: 'Agis',
    health: 50,
    attack: 12,
    defense: 11,
    hit: 90,
    crit: 5,
    dodge: 10,
    vitality: 10,
    durability: 12,
    strength: 12,
    agility: 10,
    onLevelUp: {
      health: 6,
      attack: 2,
      defense: 1,
      vitality: 0,
      durability: 1,
      strength: 2,
      agility: 1
    }
  }
};

var statConversion = {
  vitToHp: 9,
  durToHp: 3,
  durToDef: 2,
  durToDodge: 0.1,
  strToAtk: 2,
  strToDef: 1,
  strToHit: 0.25,
  agiToHit: 1,
  agiToDodge: 0.5,
  agiToCrit: 0.5
};