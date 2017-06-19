'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: updateGameClassState, playerPalettes, tileSize, toggleMute

var OverlayHeroSelection = function (_React$Component) {
  _inherits(OverlayHeroSelection, _React$Component);

  function OverlayHeroSelection(props) {
    _classCallCheck(this, OverlayHeroSelection);

    var _this = _possibleConstructorReturn(this, (OverlayHeroSelection.__proto__ || Object.getPrototypeOf(OverlayHeroSelection)).call(this, props));

    _this.initOverlay = _this.initOverlay.bind(_this);
    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.focus = _this.focus.bind(_this);

    _this.state = {
      heroTypes: [],
      heroSelectionMessage: '',
      currentSelection: ''
    };
    return _this;
  }

  _createClass(OverlayHeroSelection, [{
    key: 'initOverlay',
    value: function initOverlay() {
      var heroSelectionMessage = 'It was a stroke of luck to have intercepted their plot.<br>' + 'The evil horde is gathering strength to sweep across your homeland.<br>' + 'Your only hope is a preemptive strike at their very heart.<br>' + 'Choose your hero wisely';

      var heroTypes = [],
          heroType = '',
          currentSelection = '';

      for (heroType in heroTypeStats) {
        heroTypes.push(heroType);
      }currentSelection = heroTypes[0];

      this.setState({ heroTypes: heroTypes, heroSelectionMessage: heroSelectionMessage, currentSelection: currentSelection });
    }
  }, {
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var heroTypes = this.state.heroTypes,
          el = e.nativeEvent.code;
      var currentSelection = this.state.currentSelection,
          index = heroTypes.indexOf(currentSelection);


      if (el === 'ArrowUp' && index > 0 || el === 'ArrowDown' && index < heroTypes.length - 1) {
        index = el === 'ArrowUp' ? index - 1 : index + 1;
        currentSelection = heroTypes[index];

        this.setState({ currentSelection: currentSelection });
      } else if (el === 'Space' || el === 'Enter') {
        this.props.updateGameClassState({ hero: currentSelection });
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.currentSelection !== nextState.currentSelection || !Object.keys(this.props.playerPalettes).length && Object.keys(nextProps.playerPalettes).length) {
        return true;
      }

      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          heroTypes = _state.heroTypes,
          heroSelectionMessage = _state.heroSelectionMessage,
          currentSelection = _state.currentSelection,
          playerPalettes = this.props.playerPalettes[currentSelection.toLowerCase() + 'Img'] ? this.props.playerPalettes : null;


      var heroSelectionRows = heroTypes.map(function (type, i) {
        return React.createElement(OverlayHeroSelectionRow, {
          key: type + i,
          position: i,
          heroType: type,
          currentSelection: currentSelection,
          playerPalettes: playerPalettes,
          tileSize: _this3.props.tileSize });
      });

      return React.createElement(
        'div',
        {
          id: 'hero-selection-overlay',
          className: 'stage-overlay',
          tabIndex: '1',
          onKeyDown: this.optKeyDown
        },
        React.createElement(
          'h4',
          { className: 'hero-selection-header' },
          'CHOOSE YOUR FATE'
        ),
        React.createElement(
          'div',
          { className: 'hero-selection-message' },
          heroSelectionMessage
        ),
        heroSelectionRows,
        React.createElement(
          'div',
          { className: 'hero-selection-footer' },
          'Footer Content Here'
        )
      );
    }
  }]);

  return OverlayHeroSelection;
}(React.Component);