'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  *		@desc OverlayHeroSelection single hero row with description.
	*		@param {object} props - Component props.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {string} props.heroType - Type of hero.
	*		@param {object} props.playerPalettes - Hero sprite sheets on canvas.
	*		@param {string} props.key - React rendering property.
	*		@param {number} props.position - Rendered row number, zero-based.
	*		@param {string} props.currentSelection - heroType of hero row in current focus.
  *   @returns Hero row with description.
  */

var OverlayHeroSelectionRow = function (_React$Component) {
  _inherits(OverlayHeroSelectionRow, _React$Component);

  function OverlayHeroSelectionRow(props) {
    _classCallCheck(this, OverlayHeroSelectionRow);

    var _this = _possibleConstructorReturn(this, (OverlayHeroSelectionRow.__proto__ || Object.getPrototypeOf(OverlayHeroSelectionRow)).call(this, props));

    _this.drawIcon = _this.drawIcon.bind(_this);

    _this.canvasId = 'hero-icon';
    _this.iconDrawn = false;

    _this.state = {};
    return _this;
  }

  _createClass(OverlayHeroSelectionRow, [{
    key: 'drawIcon',
    value: function drawIcon() {
      var curProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.iconDrawn = true;

      var position = curProps.position,
          heroType = curProps.heroType,
          playerPalettes = curProps.playerPalettes,
          tileSize = curProps.tileSize,
          heroCanvas = playerPalettes[heroType.toLowerCase() + 'Img'];


      var ctx = getById(this.canvasId + position).getContext('2d');

      ctx.drawImage(heroCanvas, 0, 0, tileSize, tileSize, 0, 0, tileSize, tileSize);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.playerPalettes != null && this.props.playerPalettes[this.props.heroType.toLowerCase() + 'Img']) {

        this.drawIcon();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.iconDrawn && nextProps.playerPalettes != null && nextProps.playerPalettes[nextProps.heroType.toLowerCase() + 'Img']) {

        this.drawIcon(nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.propscurrentSelection !== nextProps.currentSelection) {
        return true;
      }

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          position = _props.position,
          heroType = _props.heroType,
          currentSelection = _props.currentSelection,
          tileSize = _props.tileSize,
          hero = heroTypeStats[heroType],
          rowClasses = heroType === currentSelection ? 'hero-selection-row hero-selection-focus' : 'hero-selection-row';


      return React.createElement(
        'div',
        { className: rowClasses },
        React.createElement('canvas', {
          id: this.canvasId + position,
          className: 'hero-selection-canvas',
          width: tileSize,
          height: tileSize }),
        React.createElement(
          'div',
          { className: 'hero-description' },
          React.createElement(
            'div',
            { className: 'label-col' },
            React.createElement(
              'p',
              null,
              'Name:'
            ),
            React.createElement(
              'p',
              null,
              'Type:'
            ),
            React.createElement(
              'p',
              null,
              'Desc:'
            )
          ),
          React.createElement(
            'div',
            { className: 'info-col' },
            React.createElement(
              'p',
              null,
              hero.heroName
            ),
            React.createElement(
              'p',
              null,
              heroType
            ),
            React.createElement(
              'p',
              null,
              hero.description
            )
          )
        )
      );
    }
  }]);

  return OverlayHeroSelectionRow;
}(React.Component);