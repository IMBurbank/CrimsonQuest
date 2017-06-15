'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: updateGameClassState

var OverlayGameOver = function (_React$Component) {
  _inherits(OverlayGameOver, _React$Component);

  function OverlayGameOver(props) {
    _classCallCheck(this, OverlayGameOver);

    var _this = _possibleConstructorReturn(this, (OverlayGameOver.__proto__ || Object.getPrototypeOf(OverlayGameOver)).call(this, props));

    _this.initOverlay = _this.initOverlay.bind(_this);
    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.focus = _this.focus.bind(_this);

    _this.state = {
      gameOverMessage: '',
      focusClass: 'optFocus'
    };
    return _this;
  }

  _createClass(OverlayGameOver, [{
    key: 'initOverlay',
    value: function initOverlay() {
      var gameOverMessage = 'You have failed.\n' + 'Your village was overrun by the evil horde.\n' + 'There were no survivors.';

      this.setState({ gameOverMessage: gameOverMessage });
    }
  }, {
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var el = e.nativeEvent.code;

      if (el === 'Space' || el === 'Enter' || el === 'Escape') {
        this.props.updateGameClassState({ overlayMode: 'hero-selection-overlay' });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      ReactDOM.findDOMNode(this).focus();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initOverlay();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this2.focus();
      }, 250);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          gameOverMessage = _state.gameOverMessage,
          focusClass = _state.focusClass;


      return React.createElement(
        'div',
        { id: 'game-over-overlay', className: 'stage-overlay', tabIndex: '1', onKeyDown: this.optKeyDown },
        React.createElement(
          'h4',
          { className: 'game-over-header' },
          'GAME OVER'
        ),
        React.createElement(
          'div',
          { className: 'game-over-message' },
          gameOverMessage
        ),
        React.createElement(
          'div',
          { className: 'game-over-row ' + focusClass },
          'Try Again?'
        )
      );
    }
  }]);

  return OverlayGameOver;
}(React.Component);