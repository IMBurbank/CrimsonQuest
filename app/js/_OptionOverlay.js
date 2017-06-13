'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: playerArr, enemyArr, inventory, interactItem, overlayMode, updateGameClassState
var OptionOverlay = function (_React$Component) {
  _inherits(OptionOverlay, _React$Component);

  function OptionOverlay() {
    _classCallCheck(this, OptionOverlay);

    return _possibleConstructorReturn(this, (OptionOverlay.__proto__ || Object.getPrototypeOf(OptionOverlay)).apply(this, arguments));
  }

  _createClass(OptionOverlay, [{
    key: 'render',
    value: function render() {
      var mode = this.props.overlayMode;

      var content = null;

      if (mode === 'inv-overlay') {
        content = React.createElement(InventoryOverlay, {
          inventory: this.props.inventory,
          interactItem: this.props.interactItem,
          updateGameClassState: this.props.updateGameClassState });
      } else if (mode === 'merchant-overlay') {
        content = React.createElement(OverlayMerchant, {
          playerArr: this.props.playerArr,
          enemyArr: this.props.enemyArr,
          inventory: this.props.inventory,
          interactItem: this.props.interactItem,
          updateGameClassState: this.props.updateGameClassState });
      }

      return React.createElement(
        'div',
        null,
        content
      );
    }
  }]);

  return OptionOverlay;
}(React.Component);