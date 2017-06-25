'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  *		@desc Game level component.
	*		@param {object} props - Component props.
	*		@param {number} props.gameLevel - Current game level.
  *		@returns Game level container with level number and name.
  */

var GameLevel = function (_React$Component) {
  _inherits(GameLevel, _React$Component);

  function GameLevel(props) {
    _classCallCheck(this, GameLevel);

    var _this = _possibleConstructorReturn(this, (GameLevel.__proto__ || Object.getPrototypeOf(GameLevel)).call(this, props));

    _this.levelNames = {
      '1': 'The Threshold',
      '2': 'Forboding Cave',
      '3': 'Cave of Hopelessness',
      '4': 'Cave of Despair',
      '5': 'Abyss Cave',
      '6': 'Dungeon Entry',
      '7': 'Demon Palisades',
      '8': 'Feeding Dungeon',
      '9': "Death's Doorstep",
      '10': 'The Abyss'
    };
    return _this;
  }

  _createClass(GameLevel, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.gameLevel !== nextProps.gameLevel) return true;

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var gameLevel = this.props.gameLevel,
          levelName = this.levelNames[gameLevel];


      return React.createElement(
        'div',
        { className: 'level' },
        React.createElement(
          'p',
          { className: 'level-header' },
          'Level ' + gameLevel
        ),
        React.createElement(
          'p',
          { className: 'level-name' },
          levelName
        )
      );
    }
  }]);

  return GameLevel;
}(React.Component);