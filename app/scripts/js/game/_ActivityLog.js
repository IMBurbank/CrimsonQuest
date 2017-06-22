'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: gameLevel, levelUpCount, interactItem, increasedStat, exchangeAttacks, enemyDead

var ActivityLog = function (_React$Component) {
  _inherits(ActivityLog, _React$Component);

  function ActivityLog(props) {
    _classCallCheck(this, ActivityLog);

    var _this = _possibleConstructorReturn(this, (ActivityLog.__proto__ || Object.getPrototypeOf(ActivityLog)).call(this, props));

    _this.initActivityLog = _this.initActivityLog.bind(_this);
    _this.recycleLog = _this.recycleLog.bind(_this);
    _this.resetLog = _this.resetLog.bind(_this);
    _this.logAdd = _this.logAdd.bind(_this);
    _this.logLevelUp = _this.logLevelUp.bind(_this);
    _this.logItem = _this.logItem.bind(_this);
    _this.logStatPoint = _this.logStatPoint.bind(_this);
    _this.logAttacks = _this.logAttacks.bind(_this);
    _this.logEnemyDead = _this.logEnemyDead.bind(_this);

    _this.logLen = 300;
    _this.renderLen = 30;
    _this.logArrayPadding = 10;
    _this.enemyDeadCount = 0;

    _this.state = {
      log: [],
      //{type:'', message:''}
      index: -1
    };
    return _this;
  }

  _createClass(ActivityLog, [{
    key: 'initActivityLog',
    value: function initActivityLog() {
      var log = this.state.log;


      log.length = this.logLen;
      this.setState({ log: log });
    }
  }, {
    key: 'resetLog',
    value: function resetLog() {
      this.setState({ index: -1 });
    }
  }, {
    key: 'recycleLog',
    value: function recycleLog(log, index) {
      var len = this.renderLen;

      var i = 0;

      for (; i < len; i++) {
        log[i] = log[index - len + i + 1];
      }index = len - 1;

      this.setState({ log: log, index: index });
    }
  }, {
    key: 'logAdd',
    value: function logAdd(logArr) {
      var _state = this.state,
          index = _state.index,
          log = _state.log;


      logArr.forEach(function (el) {
        index++, log[index] = el;
      });

      if (index > this.logLen - this.logArrayPadding) this.recycleLog(log, index);else this.setState({ log: log, index: index });
    }
  }, {
    key: 'logLevelUp',
    value: function logLevelUp() {
      this.logAdd([{ type: 'log-level', message: 'Level Up!' }]);
    }
  }, {
    key: 'logItem',
    value: function logItem(nextProps) {
      var interactItem = nextProps.interactItem,
          action = interactItem.type,
          itemType = 'log-item',
          statType = 'log-stat';


      var verb = action.charAt(0).toUpperCase() + action.slice(1),
          itemLog = [],
          stat = '',
          statDisplay = void 0;

      if (action.slice(0, 3) === 'buy') {
        if (action === 'buySuccess') {
          itemLog.push({ type: itemType, message: verb.slice(0, 3) + ' ' + interactItem.item.name });
        } else if (action === 'buyFail') {
          itemLog.push({ type: itemType, message: 'Not enough to buy.' });
        }
      } else {
        itemLog.push({ type: itemType, message: verb + ' ' + interactItem.item.name });
      }

      if (action === 'use') {
        for (stat in interactItem.item.stats) {
          statDisplay = stat === 'curHealth' ? stat.slice(3) : stat.slice(1);
          itemLog.push({ type: statType, message: 'Increased ' + statDisplay });
        }
      }

      this.logAdd(itemLog);
    }
  }, {
    key: 'logStatPoint',
    value: function logStatPoint(nextProps) {
      var increasedStat = nextProps.increasedStat;


      this.logAdd([{ type: 'log-stat', message: increasedStat.type + ' ' + increasedStat.stat + '.' }]);
    }
  }, {
    key: 'logAttacks',
    value: function logAttacks(nextProps) {
      var enemyDead = nextProps.enemyDead,
          attacks = nextProps.exchangeAttacks.attacks,
          type = 'log-attack';


      var message = '',
          attackLog = [];

      attacks.forEach(function (el) {
        message = el.from === 'hero' ? 'You attack ' + el.to + '.' : el.from + ' attacks you.';
        attackLog.push({ type: type, message: message });

        message = el.type.charAt(0).toUpperCase() + el.type.slice(1) + ': ' + el.damage + ' damage.';
        attackLog.push({ type: type, message: message });
      });

      if (enemyDead.count !== this.enemyDeadCount) this.logEnemyDead(enemyDead, attackLog);else this.logAdd(attackLog);
    }
  }, {
    key: 'logEnemyDead',
    value: function logEnemyDead(enemyDead, attackLog) {
      var experience = enemyDead.experience,
          gold = enemyDead.gold,
          source = enemyDead.source,
          count = enemyDead.count,
          name = source.name,
          enemyDeadType = 'log-attack',
          experienceType = 'log-stat';


      attackLog.push({ type: enemyDeadType, message: name + ' died.' });
      attackLog.push({ type: experienceType, message: 'Gained ' + experience + ' experience.' });
      attackLog.push({ type: experienceType, message: 'Looted ' + gold + ' gold.' });

      if (source.boss) {
        attackLog.push({ type: experienceType, message: 'A portal has opened somewhere....' });
      }

      this.enemyDeadCount = count;
      this.logAdd(attackLog);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initActivityLog();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.levelUpCount !== nextProps.levelUpCount) {
        this.logLevelUp();
      }
      if (this.props.interactItem.count !== nextProps.interactItem.count) {
        this.logItem(nextProps);
      }
      if (this.props.increasedStat.count !== nextProps.increasedStat.count) {
        this.logStatPoint(nextProps);
      }
      if (this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count) {
        this.logAttacks(nextProps);
      }
      if (this.props.gameLevel !== nextProps.gameLevel) {
        this.resetLog();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.levelUpCount !== nextProps.levelUpCount || this.props.interactItem.count !== nextProps.interactItem.count || this.props.increasedStat.count !== nextProps.increasedStat.count || this.props.exchangeAttacks.count !== nextProps.exchangeAttacks.count || this.props.gameLevel !== nextProps.gameLevel) {

        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          log = _state2.log,
          index = _state2.index,
          len = index < this.renderLen - 1 ? index : this.renderLen - 1;


      var renderLog = [],
          i = 0;

      for (i = len; i > -1; i--) {
        renderLog.push(React.createElement(ActivityLogRow, {
          key: i + log[index - i].message,
          type: log[index - i].type,
          message: log[index - i].message }));
      }

      return React.createElement(
        'div',
        { className: 'activity-log' },
        React.createElement(
          'div',
          { className: 'log-content' },
          renderLog
        )
      );
    }
  }]);

  return ActivityLog;
}(React.Component);