'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: updateGameClassState, toggleMute

var OverlayGameWin = function (_React$Component) {
  _inherits(OverlayGameWin, _React$Component);

  function OverlayGameWin(props) {
    _classCallCheck(this, OverlayGameWin);

    var _this = _possibleConstructorReturn(this, (OverlayGameWin.__proto__ || Object.getPrototypeOf(OverlayGameWin)).call(this, props));

    _this.initOverlay = _this.initOverlay.bind(_this);
    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.focus = _this.focus.bind(_this);

    _this.state = {
      gameOverMessage: '',
      focusClass: 'optFocus'
    };
    return _this;
  }

  _createClass(OverlayGameWin, [{
    key: 'initOverlay',
    value: function initOverlay() {
      var gameOverMessage = 'The Evil Lords have been crushed.\n' + 'The minions that remain cower from your fury. The evil hordes scatter.\n' + 'Your village will surely rejoice upon your return.';

      this.setState({ gameOverMessage: gameOverMessage });
    }
  }, {
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var el = e.nativeEvent.code;

      if (el === 'Space' || el === 'Enter' || el === 'Escape') {
        this.props.updateGameClassState({ overlayMode: 'hero-selection-overlay' });
      } else if (el === 'KeyQ' || el === 'KeyP') {
        this.props.toggleMute();
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
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
          'YOU ARE VICTORIOUS'
        ),
        React.createElement(
          'div',
          { className: 'game-over-message' },
          gameOverMessage
        ),
        React.createElement(
          'div',
          { className: 'game-over-row ' + focusClass },
          'Play Again?'
        )
      );
    }
  }]);

  return OverlayGameWin;
}(React.Component);