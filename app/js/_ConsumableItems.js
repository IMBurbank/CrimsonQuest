'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: tileSize, inventory, itemPalettes, interactItem, quickConsume, updateGameClassState
var ConsumableItems = function (_React$Component) {
  _inherits(ConsumableItems, _React$Component);

  function ConsumableItems(props) {
    _classCallCheck(this, ConsumableItems);

    var _this = _possibleConstructorReturn(this, (ConsumableItems.__proto__ || Object.getPrototypeOf(ConsumableItems)).call(this, props));

    _this.handleInteractItem = _this.handleInteractItem.bind(_this);
    _this.updateConsumeCanvas = _this.updateConsumeCanvas.bind(_this);

    _this.state = {
      cItems: ['potion', 'hiPotion', 'xPotion', 'tomeOfVitality', 'tomeOfDurability', 'tomeOfStrength', 'tomeOfAgility', 'tomeOfWisdom']
    };
    return _this;
  }

  _createClass(ConsumableItems, [{
    key: 'handleInteractItem',
    value: function handleInteractItem(nextProps) {
      var num = nextProps.quickConsume.num,
          inv = nextProps.inventory,
          interactItem = Object.assign({}, nextProps.interactItem),
          m = consumableAbbrevMap;

      var name = '',
          item = null,
          props = null;

      for (props in m) {
        if (num == m[props].num) name = m[props].name;
      }

      item = inv[name];

      if (item && item.count > 0) {
        interactItem.count += 1;
        interactItem.type = 'use';
        interactItem.item = item;

        nextProps.updateGameClassState({ interactItem: interactItem });
      }
    }
  }, {
    key: 'updateConsumeCanvas',
    value: function updateConsumeCanvas(nextProps) {
      var interactItem = nextProps.interactItem,
          inventory = nextProps.inventory,
          item = interactItem.item,
          type = interactItem.type,
          m = consumableAbbrevMap;


      var update = false,
          props = null,
          dCtx = null,
          palette = null,
          loc = [];

      if (inventory[item.name].count === 1 && ['pickup', 'buySuccess'].includes(type) || inventory[item.name].count === 0 && ['use', 'sell'].includes(type)) {

        update = true;
      }

      if (update) {
        for (props in m) {
          if (item.name === m[props].name) dCtx = getById(props + '-canvas').getContext('2d');
        }

        palette = nextProps.itemPalettes[item.palette];
        loc = item.iconLoc;

        if (['use', 'sell'].includes(type)) dCtx.clearRect(0, 0, loc[2], loc[3]);else dCtx.drawImage(palette, loc[0], loc[1], loc[2], loc[3], 0, 0, loc[2], loc[3]);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.quickConsume.count !== nextProps.quickConsume.count && nextProps.quickConsume.count) {

        this.handleInteractItem(nextProps);
      }
      if (this.props.interactItem.count !== nextProps.interactItem.count && nextProps.interactItem.count && ['pickup', 'use', 'buySuccess', 'sell'].includes(nextProps.interactItem.type) && nextProps.interactItem.item.type === 'consumable') {

        this.updateConsumeCanvas(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var m = consumableAbbrevMap,
          itm = this.state.cItems,
          inv = this.props.inventory,
          ts = this.props.tileSize;

      var output = [],
          count = 0;

      output = itm.map(function (el) {
        count = 0;
        if (inv[m[el].name]) count = inv[m[el].name].count;
        return React.createElement(
          'div',
          { className: 'consumable-col', key: 'consumable-col' + m[el].num },
          React.createElement(
            'p',
            { className: 'consumable-col-num', key: 'consumable-col-num' + m[el].num },
            m[el].num
          ),
          React.createElement('canvas', {
            id: el + '-canvas',
            className: 'consumable-canvas',
            key: el + '-canvas',
            width: ts,
            height: ts }),
          React.createElement(
            'p',
            { className: 'consumable-col-abbrev', key: 'consumable-col-abbrev' + m[el].num },
            m[el].abbrev
          ),
          React.createElement(
            'p',
            { className: 'consumable-col-count', key: 'consumable-col-count' + m[el].num },
            'x' + count
          )
        );
      });

      return React.createElement(
        'div',
        { className: 'consumable-items' },
        output
      );
    }
  }]);

  return ConsumableItems;
}(React.Component);