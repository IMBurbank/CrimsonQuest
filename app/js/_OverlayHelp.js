'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: updateGameClassState, toggleMute

var OverlayHelp = function (_React$Component) {
  _inherits(OverlayHelp, _React$Component);

  function OverlayHelp(props) {
    _classCallCheck(this, OverlayHelp);

    var _this = _possibleConstructorReturn(this, (OverlayHelp.__proto__ || Object.getPrototypeOf(OverlayHelp)).call(this, props));

    _this.initOverlay = _this.initOverlay.bind(_this);
    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.maintainFocus = _this.maintainFocus.bind(_this);
    _this.endFocus = _this.endFocus.bind(_this);

    _this.state = {
      helpMessage: ''
    };
    return _this;
  }

  _createClass(OverlayHelp, [{
    key: 'initOverlay',
    value: function initOverlay() {
      var helpMessage = "Items enclosed in quotes ('') denote key mappings.";

      this.setState({ helpMessage: helpMessage });
    }
  }, {
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var el = e.nativeEvent.code;

      if (el === 'KeyH' || el === 'Space' || el === 'Enter' || el === 'Escape') {
        this.props.updateGameClassState({ overlayMode: 'off' });
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
    key: 'maintainFocus',
    value: function maintainFocus() {
      var _this2 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this2.focus();
      }, 250);
    }
  }, {
    key: 'endFocus',
    value: function endFocus() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initOverlay();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.maintainFocus();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.endFocus();
    }
  }, {
    key: 'render',
    value: function render() {
      var helpMessage = this.state.helpMessage;


      return React.createElement(
        'div',
        { id: 'help-overlay', className: 'stage-overlay', tabIndex: '1', onKeyDown: this.optKeyDown },
        React.createElement(
          'h4',
          { className: 'game-over-header' },
          'HELP'
        ),
        React.createElement(
          'div',
          { className: 'game-over-message' },
          helpMessage
        ),
        React.createElement(
          'div',
          { className: 'help-details' },
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'ACTION'
            ),
            React.createElement(
              'span',
              null,
              'KEY MAP'
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Move Up:'
            ),
            React.createElement(
              'span',
              null,
              '\'W\' or \'ArrowUp\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Move Down:'
            ),
            React.createElement(
              'span',
              null,
              '\'S\' or \'ArrowDown\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Move Left:'
            ),
            React.createElement(
              'span',
              null,
              '\'A\' or \'ArrowLeft\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Move Right:'
            ),
            React.createElement(
              'span',
              null,
              '\'D\' or \'ArrowRight\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Enter:'
            ),
            React.createElement(
              'span',
              null,
              '\'Enter\' or \'SpaceBar\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Use Stat Point:'
            ),
            React.createElement(
              'span',
              null,
              '\'V\', \'B\', \'N\', \'M\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'QuickConsume Items:'
            ),
            React.createElement(
              'span',
              null,
              'Numbers \'1\' through \'8\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Toggle Inventory:'
            ),
            React.createElement(
              'span',
              null,
              '\'I\' or \'E\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Toggle Help:'
            ),
            React.createElement(
              'span',
              null,
              '\'H\''
            )
          ),
          React.createElement(
            'p',
            { className: 'help-row' },
            React.createElement(
              'span',
              { className: 'help-action' },
              'Toggle Buy/Sell:'
            ),
            React.createElement(
              'span',
              null,
              '\'Y\'/\'U\' (In Merch Screen)'
            )
          )
        )
      );
    }
  }]);

  return OverlayHelp;
}(React.Component);