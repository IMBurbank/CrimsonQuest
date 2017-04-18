'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize
var OptionLayer = function (_React$Component) {
  _inherits(OptionLayer, _React$Component);

  function OptionLayer(props) {
    _classCallCheck(this, OptionLayer);

    var _this = _possibleConstructorReturn(this, (OptionLayer.__proto__ || Object.getPrototypeOf(OptionLayer)).call(this, props));

    _this.state = {
      mode: 'off'
    };
    return _this;
  }

  _createClass(OptionLayer, [{
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;

      return React.createElement('canvas', {
        id: 'opt-layer',
        className: 'opt-layer',
        width: size,
        height: size });
    }
  }]);

  return OptionLayer;
}(React.Component);