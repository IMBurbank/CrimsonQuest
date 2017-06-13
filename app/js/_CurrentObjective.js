'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: enemyDead, gameLevel

var CurrentObjective = function (_React$Component) {
  _inherits(CurrentObjective, _React$Component);

  function CurrentObjective(props) {
    _classCallCheck(this, CurrentObjective);

    var _this = _possibleConstructorReturn(this, (CurrentObjective.__proto__ || Object.getPrototypeOf(CurrentObjective)).call(this, props));

    _this.resetBossDead = _this.resetBossDead.bind(_this);
    _this.handleEnemyDead = _this.handleEnemyDead.bind(_this);

    _this.enemyDeadCount = 0;
    _this.objectives = {
      'false': 'Find and slay boss.',
      'true': 'Travel through portal.'
    };

    _this.state = {
      bossDead: false
    };
    return _this;
  }

  _createClass(CurrentObjective, [{
    key: 'resetBossDead',
    value: function resetBossDead() {
      this.setState({ bossDead: false });
    }
  }, {
    key: 'handleEnemyDead',
    value: function handleEnemyDead(nextProps) {
      var enemyDead = nextProps.enemyDead;


      this.enemyDeadCount = enemyDead.count;

      if (enemyDead.source.boss) this.setState({ bossDead: true });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.enemyDeadCount !== nextProps.enemyDead.count) {
        this.handleEnemyDead(nextProps);
      }
      if (this.props.gameLevel !== nextProps.gameLevel) {
        this.resetBossDead();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'current-objective' },
        React.createElement(
          'p',
          null,
          'Current Objective'
        ),
        React.createElement(
          'p',
          null,
          this.objectives[this.state.bossDead]
        )
      );
    }
  }]);

  return CurrentObjective;
}(React.Component);