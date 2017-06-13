//props: gameLevel, levelUpCount, interactItem, increasedStat, exchangeAttacks, enemyDead

class ActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.initActivityLog = this.initActivityLog.bind(this);
    this.recycleLog = this.recycleLog.bind(this);
    this.resetLog = this.resetLog.bind(this);
    this.logAdd = this.logAdd.bind(this);
    this.logLevelUp = this.logLevelUp.bind(this);
    this.logItem = this.logItem.bind(this);
    this.logStatPoint = this.logStatPoint.bind(this);
    this.logAttacks = this.logAttacks.bind(this);
    this.logEnemyDead = this.logEnemyDead.bind(this);

    this.logLen = 300;
    this.renderLen = 30;
    this.logArrayPadding = 10;
    this.enemyDeadCount = 0;

    this.state = ({
      log: [],
      //{type:'', message:''}
      index: -1,
    });
  }

  initActivityLog() {
    let {log} = this.state;

    log.length = this.logLen;
    this.setState({ log });
  }

  resetLog() {
    this.setState({ index: -1 });
  }

  recycleLog(log, index) {
    const len = this.renderLen;

    let i = 0;

    for (; i < len; i++) log[i] = log[index - len + i + 1];

    index = len - 1;

    this.setState({ log, index });
  }

  logAdd(logArr) {
    let {index, log} = this.state;

    logArr.forEach( el => { index++, log[index] = el; } );

    if (index > this.logLen - this.logArrayPadding) this.recycleLog(log, index);
    else this.setState({ log, index});
  }

  logLevelUp() {
    this.logAdd([{type: 'log-level', message: 'Level Up!'}]);
  }

  logItem(nextProps) {
    const {interactItem} = nextProps,
      action = interactItem.type,
      itemType = 'log-item',
      statType = 'log-stat';

    let verb = action.charAt(0).toUpperCase() + action.slice(1),
      itemLog = [],
      stat = '',
      statDisplay;


    if (action.slice(0, 3) === 'buy') {
      if (action === 'buySuccess') {
        itemLog.push({type: itemType, message: `${verb.slice(0,3)} ${interactItem.item.name}`})
      } else if (action === 'buyFail') {
        itemLog.push({type: itemType, message: 'Not enough to buy.'});
      }
    } else {
      itemLog.push({type: itemType, message: `${verb} ${interactItem.item.name}`});
    }

    if (action === 'use') {
      for (stat in interactItem.item.stats) {
        statDisplay = stat === 'curHealth' ? stat.slice(3) : stat.slice(1);
        itemLog.push({type: statType, message: `Increased ${statDisplay}`});
      }
    }

    this.logAdd(itemLog);
  }

  logStatPoint(nextProps) {
    const {increasedStat} = nextProps;

    this.logAdd([{type: 'log-stat', message: `${increasedStat.type} ${increasedStat.stat}.`}]);
  }

  logAttacks(nextProps) {
    const {attacks} = nextProps.exchangeAttacks,
      type = 'log-attack';

    let message = '',
      attackLog = [];

    attacks.forEach(
      el => {
        message = el.from === 'hero' ?
          `You attack ${el.to}.` :
          `${el.from} attacks you.`;
        attackLog.push({ type, message });

        message = `${el.type.charAt(0).toUpperCase() + el.type.slice(1)}: ${el.damage} damage.`
        attackLog.push({ type, message });
      }
    );

    this.logAdd(attackLog);
  }

  logEnemyDead(nextProps) {
    const {experience, gold, source, count} = nextProps.enemyDead,
      {name} = source,
      enemyDeadType = 'log-attack',
      experienceType = 'log-stat';

    let enemyDeadLog = [];

    enemyDeadLog.push({type: enemyDeadType, message: `${name} died.`});
    enemyDeadLog.push({type: experienceType, message: `Gained ${experience} experience.`});
    enemyDeadLog.push({type: experienceType, message: `Looted ${gold} gold.`});

    this.enemyDeadCount = count;
    this.logAdd(enemyDeadLog);
  }

  componentWillMount() {
    this.initActivityLog();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.levelUpCount !== nextProps.levelUpCount) {
      this.logLevelUp()
    }
    if (this.props.interactItem.count !== nextProps.interactItem.count) {
      this.logItem(nextProps)
    }
    if (this.props.increasedStat.count !== nextProps.increasedStat.count) {
      this.logStatPoint(nextProps)
    }
    if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count) {
      this.logAttacks(nextProps)
    }
    if (this.enemyDeadCount !== nextProps.enemyDead.count) {
      this.logEnemyDead(nextProps)
    }
    if (this.props.gameLevel !== nextProps.gameLevel) {
      this.resetLog();
    }
  }

  render() {
    const {log, index} = this.state,
      len = index < this.renderLen - 1 ? index : this.renderLen - 1;

    let renderLog = [],
      i = 0;

    for (i = len; i > -1; i--) {
      renderLog.push(
        <ActivityLogRow
          key = {i + log[index - i].message}
          type = {log[index - i].type}
          message = {log[index - i].message}  />
      );
    }

    return (
      <div className='activity-log'>
        <div className='log-content'>{renderLog}</div>
      </div>
    );
  }
}
