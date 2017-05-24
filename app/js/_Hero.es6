//props: tileSize, hero, heroIcon, inventory, itemPalettes, interactItem, updateGameClassState
//enemyAttack, exchangedAttacks, enemyDead, gameOver
class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.initHero = this.initHero.bind(this);
    this.changeStats = this.changeStats.bind(this);
    this.gainExperience = this.gainExperience.bind(this);
    this.handleLevelUp = this.handleLevelUp.bind(this);
    this.paintHeroIcon = this.paintHeroIcon.bind(this);
    this.handleInteractItem = this.handleInteractItem.bind(this);
    this.updateEquipCanvas = this.updateEquipCanvas.bind(this);
    this.handleBattleRound = this.handleBattleRound.bind(this);

    this.state = ({
      heroName: "",
      experience: 0,
      expToLevel: 0,
      charLevel: 0,
      gold: 0,
      curHealth: 0,
      bHealth: 0,
      bAttack: 0,
      bDefense: 0,
      bHit: 0,
      bCrit: 0,
      bDodge: 0,
      bVitality: 0,
      bDurability: 0,
      bStrength: 0,
      bAgility: 0,
      statPoints: 0,
      onLevelUp: {},
      head: null,
      weapon: null,
      amulet: null,
      armor: null,
      shield: null,
      glove: null,
      ring: null,
      foot: null,
      iHealth: 0,
      iAttack: 0,
      iDefense: 0,
      iHit: 0,
      iCrit: 0,
      iDodge: 0,
      iVitality: 0,
      iDurability: 0,
      iStrength: 0,
      iAgility: 0,
      bExpToLevel: 100,
      expLevelMult: 1.75,
      interactItemCount: 0,
      battleRound: 0,
    });
  }

  initHero(hero) {
    const char = Object.assign({}, heroTypeStats[hero]),
      bHp = char.health,
      bVit = char.vitality,
      bDur = char.durability,
      conv = statConversion;

    this.setState({
      heroName: char.heroName,
      charLevel: 1,
      expToLevel: this.state.bExpToLevel,
      curHealth: bHp + conv.vitToHp * bVit + conv.durToHp * bDur,
      bHealth: bHp,
      bAttack: char.attack,
      bDefense: char.defense,
      bHit: char.hit,
      bCrit: char.crit,
      bDodge: char.dodge,
      bVitality: bVit,
      bDurability: bDur,
      bStrength: char.strength,
      bAgility: char.agility,
      onLevelUp: char.onLevelUp
    });
  }

  paintHeroIcon(icon) {
    let ctx = document.getElementById('hero-icon').getContext('2d');

    ctx.drawImage(icon, 0, 0);
  }

  changeStats(stats, decStats = {}) {
    const attr = Object.assign({}, stats),
      decAttr = Object.assign({}, decStats);

    let newState = Object.assign({}, this.state),
      prop = null;

    for (prop in attr) newState[prop] += attr[prop];
    for (prop in decAttr) newState[prop] -= decAttr[prop];

    return newState;
  }

  gainExperience(enemyDead) {
    const conv = statConversion;

    let {charLevel, experience, experienceToLevel} = this.state,
      inc = 0,
      i = 0;

    for (; i < enemyDead.level; i++) inc += randInt(conv.lvlToExpRange[0], conv.lvlToExpRange[1]);

    if (enemyDead.source.boss) inc *= conv.bossMultiplier;

    experience += inc;

    if (experience >= experienceToLevel) {
      experience -= experienceToLevel;
      charLevel++;
      this.handleLevelUp(charLevel, experience)
    } else {
      this.setState({ experience });
    }
  }

  handleLevelUp(charLevel, experience) {
    const onLvl = this.state.onLevelUp,
      bHealth = this.state.bHealth + onLvl.health,
      bVitality = this.state.bVitality + onLvl.vitality,
      bDurability = this.state.bDurability + onLvl.durability,
      iHealth = this.state.iHealth,
      iVitality = this.state.iVitality,
      iDurability = this.state.durability,
      conv = statConversion,
      maxHealth = bHealth + iHealth + conv.vitToHp * (bVitality + iVitality) +
        conv.durToHp * (bDurability + iDurability),
      lvlUpPoints = 2;

    this.setState((prevState, props) => {
      return {
        charLevel,
        experience,
        expToLevel: prevState.expLevelMult * prevState.expToLevel,
        bHealth: prevState.bHealth + onLvl.health,
        bAttack: prevState.bAttack + onLvl.attack,
        bDefense: prevState.bDefense + onLvl.defense,
        bVitality: prevState.bVitality + onLvl.vitality,
        bDurability: prevState.bDurability + onLvl.durability,
        bStrength: prevState.bStrength + onLvl.strength,
        bAgility: prevState.bAgility + onLvl.agility,
        statPoints: prevState.statPoints + lvlUpPoints,
        curHealth: maxHealth
      };
    });
    console.log('Hero Level Up!: ', charLevel);
  }

  handleInteractItem(nextProps) {
    let inventory = Object.assign({}, nextProps.inventory),
      item = inventory[nextProps.interactItem.item.name],
      updateInventory = false,
      updateCanvas = false,
      curItem = null,
      nState = {},
      maxHp = 0,
      hp = 0,
      vit = 0,
      dur = 0;

    const action = nextProps.interactItem.type,
      conv = statConversion,
      stats = item.stats,
      iType = item.type;

    if (action === 'pickup' && item.type === 'gold') nState = this.changeStats(stats);
    else if (action === 'use') {
      updateInventory = true;
      item.count -= 1;

      nState = this.changeStats(stats);
    } else if (action === 'unequip') {
      updateInventory = true;
      updateCanvas = true;
      curItem = this.state[iType];
      inventory[curItem.name].equipped = false;

      nState = this.changeStats({}, curItem.stats);
      nState[iType] = null;
    } else if (action === 'equip') {
      updateInventory = true;
      updateCanvas = true;
      curItem = this.state[iType];

      if (curItem) {
        inventory[curItem.name].equipped = false;
        nState = this.changeStats(stats, curItem.stats);
      }
      else nState = this.changeStats(stats);

      item.equipped = true;
      nState[iType] = item;
    }

    hp = nState.bHealth + nState.iHealth;
    vit = nState.iVitality + nState.bVitality;
    dur = nState.iDurability + nState.bDurability;
    maxHp = hp + conv.vitToHp * vit + conv.durToHp * dur;

    if (nState.curHealth > maxHp) nState.curHealth = maxHp;
    if (updateCanvas) this.updateEquipCanvas(item);
    if (updateInventory) this.props.updateGameClassState({ inventory });

    this.setState(nState);
  }

  updateEquipCanvas(item) {
    const palette = this.props.itemPalettes[item.palette],
      loc = item.iconLoc;

    let dCtx = getById(item.type + '-canvas').getContext('2d');

    dCtx.clearRect(0, 0, loc[2], loc[3]);

    if (item.equipped) {
      dCtx.drawImage(palette, loc[0], loc[1], loc[2], loc[3], 0, 0, loc[2], loc[3]);
    }
  }

  handleBattleRound(nextProps) {
    const {enemyAttack} = nextProps,
      eStats = enemyAttack.stats,
      roundCount = enemyAttack.roundCount,
      conv = statConversion,
      hDur = this.state.bDurability + this.state.iDurability,
      hStr = this.state.bStrength + this.state.iStrength,
      hAgi = this.state.bAgility + this.state.iAgility,
      hAtk = this.state.bAttack + this.state.iAttack + conv.strToAtk * hStr,
      hDef = this.state.bDefense + this.state.iDefense + conv.durToDef*hDur + conv.strToDef*hStr,
      hHit = this.state.bHit + this.state.iHit + conv.strToHit * hStr + conv.agiToHit * hAgi,
      hCrit = this.state.bCrit + this.state.iCrit + conv.agiToCrit * hAgi,
      hDodge = this.state.bDodge + this.state.iDodge + conv.durToDodge*hDur + conv.agiToDodge*hAgi,
      eDur = eStats.bDurability,
      eStr = eStats.bStrength,
      eAgi = eStats.bAgility,
      eAtk = eStats.bAttack + conv.strToAtk * eStr,
      eDef = eStats.bDefense + conv.durToDef * eDur + conv.strToDef * eStr,
      eHit = eStats.bHit + conv.strToHit * eStr + conv.agiToHit * eAgi,
      eCrit = eStats.bCrit + conv.agiToCrit * eAgi,
      eDodge = eStats.bDodge + conv.durToDodge * eDur + conv.agiToDodge * eAgi;

    let exchangedAttacks = Object.assign({}, nextProps.exchangedAttacks),
      {curHealth, battleRound} = this.state,
      spawnIndex = enemyAttack.spawnIndex,
      enemyHealth = eStats.curHealth,
      attacks = [],
      turn = {},
      enemyFirst = false,
      type = '',
      attack = 0,
      defense = 0,
      damage = 0,
      i = 0;

    if (roundCount !== battleRound) {
      if (randInt(0, 100) < hHit - eDodge) {
        for (i = 0; i < hAtk; i++) attack += randInt(conv.atkToHpRange[0], conv.atkToHpRange[1]);
        for (i = 0; i < eDef; i++) defense += randInt(conv.defToHpRange[0], conv.defToHpRange[1]);

        damage = attack - defense > 0 ? attack - defense : 0;

        if (randInt(0, 100) < hCrit) type = 'cricital hit', damage *= 2;
        else type = 'hit';

        turn = { type, damage, from: 'hero', to: enemyAttack.source.name };
      } else {
        spawnIndex = -1;
        turn = { from: 'hero', to: enemyAttack.source.name, type: 'miss', damage: 0 };
      }
      attacks.push(turn);
    }

    if (!(attacks.length && eAgi <= hAgi && attacks[0].damage >= enemyHealth)) {
      if (randInt(0, 100) < eHit - hDodge) {
        attack = 0, defense = 0;

        for (i = 0; i < eAtk; i++) attack += randInt(conv.atkToHpRange[0], conv.atkToHpRange[1]);
        for (i = 0; i < hDef; i++) defense += randInt(conv.defToHpRange[0], conv.defToHpRange[1]);

        damage = attack - defense > 0 ? attack - defense : 0;

        if (randInt(0, 100) < eCrit) type = 'cricital hit', damage *= 2;
        else type = 'hit';

        turn = { type, damage, from: enemyAttack.source.name, to: 'hero' };
      } else {
        damage = 0;
        turn = { damage, from: enemyAttack.source.name, to: 'hero', type: 'miss' };
      }
      curHealth -= turn.damage;

      if (eAgi <= hAgi) attacks.push(turn);
      else enemyFirst = true, attacks.unshift(turn);
    }

    if (enemyFirst && curHealth <= 0 && attacks.length === 2) {
      attacks.length = 1;
      spawnIndex = -1;
    }

    if (battleRound < roundCount) battleRound = roundCount;
    exchangedAttacks.count++;
    exchangedAttacks.spawnIndex = spawnIndex;
    exchangedAttacks.attacks = attacks;

    this.setState({ curHealth, battleRound });
    nextProps.updateGameClassState({ exchangedAttacks });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.heroName === "" && nextProps.hero) {
      this.initHero(nextProps.hero);
    }
    if (this.props.interactItem.count !== nextProps.interactItem.count &&
      nextProps.interactItem.count) {

      console.log('interactItem');
      console.log(nextProps.interactItem.type, nextProps.interactItem.item.name);

      this.handleInteractItem(nextProps);
    }
    if (this.props.enemyAttack.count !== nextProps.enemyAttack.count) {
      this.handleBattleRound(nextProps);
    }
    if (this.props.enemyDead.count !== nextProps.enemyDead.count) {
      this.gainExperience(nextProps.enemyDead);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.heroIcon !== nextProps.heroIcon && nextProps.heroIcon) {
      this.paintHeroIcon(nextProps.heroIcon);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.curHealth <= 0) {
      this.props.updateGameClassState({ gameOver: true });
    }
  }

  render() {
    const ts = this.props.tileSize,
      none = 'None',
      conv = statConversion,
      lvl = this.state.charLevel,
      curHp = this.state.curHealth,
      gold = this.state.gold,
      exp = this.state.experience,
      expToLvl = this.state.expToLevel,
      vit = this.state.bVitality + this.state.iVitality,
      dur = this.state.bDurability + this.state.iDurability,
      str = this.state.bStrength + this.state.iStrength,
      agi = this.state.bAgility + this.state.iAgility,
      atk = this.state.bAttack + this.state.iAttack + conv.strToAtk * str,
      def = this.state.bDefense + this.state.iDefense + conv.durToDef * dur + conv.strToDef * str,
      maxHp = this.state.bHealth + this.state.iHealth + conv.vitToHp * vit + conv.durToHp * dur,
      hed = this.state.head ? this.state.head.name : none,
      wep = this.state.weapon ? this.state.weapon.name : none,
      amu = this.state.amulet ? this.state.amulet.name : none,
      bod = this.state.armor ? this.state.armor.name : none,
      shd = this.state.shield ? this.state.shield.name : none,
      glv = this.state.glove ? this.state.glove.name : none,
      rng = this.state.ring ? this.state.ring.name : none,
      ft = this.state.foot ? this.state.foot.name : none;

    return (
      <div className='hero'>
        <p className='hero-heading'>Character Info</p>
        <div className='hero-type'>
          <canvas id='hero-icon' className='hero-icon' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Name: {this.state.heroName}</p>
            <p>Type: {this.props.hero}</p>
          </div>
        </div>
        <p className='stat-row'>Level: {lvl}</p>
        <p className='stat-row'>Health: {curHp}/{maxHp}</p>
        <p className='stat-row'>Gold: {gold}</p>
        <p className='stat-row'>Exp: {exp}/{expToLvl}</p>
        <p className='stat-row'>Atk: {atk}</p>
        <p className='stat-row'>Def: {def}</p>
        <p className='stat-row'>Vit: {vit}</p>
        <p className='stat-row'>Dur: {dur}</p>
        <p className='stat-row'>Str: {str}</p>
        <p className='stat-row'>Agi: {agi}</p>
        <div className='equip-row'>
          <canvas id='head-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Head</p>
            <p className='equip-name'>{hed}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='weapon-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Weapon</p>
            <p className='equip-name'>{wep}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='amulet-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Amulet</p>
            <p className='equip-name'>{amu}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='armor-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Armor</p>
            <p className='equip-name'>{bod}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='shield-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Shield</p>
            <p className='equip-name'>{shd}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='glove-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Glove</p>
            <p className='equip-name'>{glv}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='ring-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Ring</p>
            <p className='equip-name'>{rng}</p>
          </div>
        </div>
        <div className='equip-row'>
          <canvas id='foot-canvas' className='equip-canv' width={ts} height={ts} />
          <div className='stat-col'>
            <p>Foot</p>
            <p className='equip-name'>{ft}</p>
          </div>
        </div>
      </div>
    );
  }
}
