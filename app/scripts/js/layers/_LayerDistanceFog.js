'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, tileSize,

var LayerDistanceFog = function (_React$Component) {
  _inherits(LayerDistanceFog, _React$Component);

  function LayerDistanceFog(props) {
    _classCallCheck(this, LayerDistanceFog);

    var _this = _possibleConstructorReturn(this, (LayerDistanceFog.__proto__ || Object.getPrototypeOf(LayerDistanceFog)).call(this, props));

    _this.drawDistanceFog = _this.drawDistanceFog.bind(_this);

    _this.renderPadArr = [3, 2, 1, 0, 0, 0, 1, 2, 3];
    _this.renderInset = 3;
    _this.fogColor = 'rgba(0,0,0,0.4)';
    _this.smoothingEnabled = false;
    return _this;
  }

  _createClass(LayerDistanceFog, [{
    key: 'drawDistanceFog',
    value: function drawDistanceFog() {
      var _props = this.props,
          stageSize = _props.stageSize,
          tileSize = _props.tileSize,
          renderInset = this.renderInset,
          renderPadArr = this.renderPadArr,
          rLen = renderPadArr.length;


      var dCtx = getById('layer-distance-fog').getContext('2d'),
          i = 0,
          j = 0;

      dCtx.fillStyle = this.fogColor;
      dCtx.imageSmoothingEnabled = this.smoothingEnabled;
      dCtx.fillRect(0, 0, stageSize, stageSize);

      for (i = 0; i < rLen; i++) {
        for (j = 0; j < rLen; j++) {
          if (j >= renderPadArr[i] && j < rLen - renderPadArr[i]) {
            dCtx.clearRect(tileSize * (renderInset + j), tileSize * (renderInset + i), tileSize, tileSize);
          }
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawDistanceFog();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var stageSize = this.props.stageSize;

      return React.createElement('canvas', {
        id: 'layer-distance-fog',
        className: 'layer-distance-fog',
        width: stageSize,
        height: stageSize });
    }
  }]);

  return LayerDistanceFog;
}(React.Component);