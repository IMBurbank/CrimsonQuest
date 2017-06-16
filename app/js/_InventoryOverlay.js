'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: inventory, interactItem, updateGameClassState, toggleMute
var InventoryOverlay = function (_React$Component) {
  _inherits(InventoryOverlay, _React$Component);

  function InventoryOverlay(props) {
    _classCallCheck(this, InventoryOverlay);

    var _this = _possibleConstructorReturn(this, (InventoryOverlay.__proto__ || Object.getPrototypeOf(InventoryOverlay)).call(this, props));

    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.updateOptFocus = _this.updateOptFocus.bind(_this);
    _this.setList = _this.setList.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.handleInteractItem = _this.handleInteractItem.bind(_this);

    _this.state = {
      invCategories: ['Head', 'Amulet', 'Weapon', 'Armor', 'Shield', 'Glove', 'Ring', 'Foot', 'Consumable'],
      bRowId: 'item-row',
      bColId: 'item-col',
      focusClass: 'optFocus',
      row: 0,
      col: 0
    };
    return _this;
  }

  _createClass(InventoryOverlay, [{
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var el = e.nativeEvent.code,
          cats = this.state.invCategories,
          len = cats.length;

      var _state = this.state,
          row = _state.row,
          col = _state.col,
          delta = [];


      if ((el === 'ArrowUp' || el === 'KeyW') && row > 0) delta = [-1, 0];else if ((el === 'ArrowRight' || el === 'KeyD') && col < len - 1) delta = [0, 1];else if (el === 'ArrowDown' || el === 'KeyS') delta = [1, 0];else if ((el === 'ArrowLeft' || el === 'KeyA') && col > 0) delta = [0, -1];else if (el === 'KeyI' || el === 'KeyE' || el === 'Escape') this.props.updateGameClassState({ overlayMode: 'off' });else if ((el === 'Space' || el === 'Enter') && getById(this.state.bRowId + this.state.row)) {
        var name = getById(this.state.bRowId + row).querySelectorAll('span')[1].innerText,
            type = this.state.invCategories[this.state.col].toLowerCase();

        this.handleInteractItem(name);
      } else if (el === 'KeyQ' || el === 'KeyP') this.props.toggleMute();

      if (delta.length > 0) this.updateOptFocus([row, col], delta);
    }
  }, {
    key: 'updateOptFocus',
    value: function updateOptFocus(coordsArr) {
      var deltaArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var bIds = [this.state.bRowId, this.state.bColId];

      var update = false,
          nextVal = '',
          nState = {};

      if (deltaArr[1] !== 0) {
        nState['row'] = 0;
        nextVal = coordsArr[1] + deltaArr[1];

        if (getById(bIds[1] + nextVal)) nState['col'] = nextVal;
      } else {
        nextVal = coordsArr[0] + deltaArr[0];

        if (getById(bIds[0] + nextVal)) nState['row'] = nextVal;
      }

      if (nState.hasOwnProperty('row')) {
        update = true;
        this.setState(nState);
      }

      return update;
    }
  }, {
    key: 'focus',
    value: function focus() {
      ReactDOM.findDOMNode(this).focus();
    }
  }, {
    key: 'setList',
    value: function setList(inv, header) {
      var conv = statConvertWordMap;

      var list = [],
          props = null,
          p = null,
          el = null,
          equipped = '',
          stats = '';

      for (props in inv) {
        if (inv[props].type === header && inv[props].count > 0) {
          el = inv[props];
          stats = '';

          for (p in el.stats) {
            stats += '' + conv[p] + el.stats[p] + ' ';
          }if (el.type === 'consumable') list.push([el.count, el.name, stats]);else equipped = el.equipped ? 'E' : ' ', list.push([equipped, el.name, stats]);
        }
      }
      return list;
    }
  }, {
    key: 'setItems',
    value: function setItems(list, colNames, bRowId) {
      var _this2 = this;

      var row = this.state.row;

      var classes = '';

      return [].concat(_toConsumableArray(Array(list.length))).map(function (x, i) {
        classes = i === row ? bRowId + ' ' + _this2.state.focusClass : bRowId;
        return React.createElement(
          'div',
          { id: bRowId + i, className: classes, key: list[i][1] },
          React.createElement(
            'span',
            { className: colNames[0].toLowerCase() + '-col', key: list[i][0] },
            list[i][0]
          ),
          React.createElement(
            'span',
            { className: colNames[1].toLowerCase() + '-col', key: list[i][1] + '-col' },
            list[i][1]
          ),
          React.createElement(
            'span',
            { className: colNames[2].toLowerCase() + '-col', key: list[i][2] },
            list[i][2]
          )
        );
      });
    }
  }, {
    key: 'handleInteractItem',
    value: function handleInteractItem(name) {
      var item = this.props.inventory[name],
          cats = this.state.invCategories;

      var interactItem = Object.assign({}, this.props.interactItem),
          action = '';

      action = item.type === cats[cats.length - 1].toLowerCase() ? 'use' : item.equipped ? 'unequip' : 'equip';

      interactItem.count += 1;
      interactItem.type = action;
      interactItem.item = item;

      this.props.updateGameClassState({ interactItem: interactItem });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this3.focus();
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
      var cats = [].concat(_toConsumableArray(this.state.invCategories)),
          _state2 = this.state,
          row = _state2.row,
          col = _state2.col,
          bRowId = _state2.bRowId,
          bColId = _state2.bColId,
          focusClass = _state2.focusClass,
          header = cats[col].toLowerCase(),
          inv = this.props.inventory,
          abbrev = equipAbbrevMap;


      var colHeaders = null,
          iHeaders = null,
          items = null,
          classes = '';

      var colNames = header === 'consumable' ? ['Quantity', 'Name', 'Stats'] : ['Equipped', 'Name', 'Stats'];

      var list = this.setList(inv, header);

      colHeaders = cats.map(function (x, i) {
        classes = i === col ? bColId + ' ' + focusClass : bColId;
        return React.createElement(
          'span',
          { id: bColId + i, className: classes, key: x },
          abbrev[x]
        );
      });

      iHeaders = [].concat(_toConsumableArray(Array(colNames.length))).map(function (x, i) {
        return React.createElement(
          'span',
          { className: 'item-header item-header-' + i, key: colNames[i] },
          colNames[i]
        );
      });

      items = this.setItems(list, colNames, bRowId);

      return React.createElement(
        'div',
        { id: 'inv-overlay', className: 'stage-overlay', tabIndex: '1', onKeyDown: this.optKeyDown },
        React.createElement(
          'h4',
          { className: 'inv-header' },
          'Inventory'
        ),
        React.createElement(
          'div',
          { className: 'inv-categories' },
          colHeaders
        ),
        React.createElement(
          'div',
          { className: 'item-list' },
          React.createElement(
            'div',
            { className: 'iheader-row' },
            iHeaders
          ),
          items
        )
      );
    }
  }]);

  return InventoryOverlay;
}(React.Component);