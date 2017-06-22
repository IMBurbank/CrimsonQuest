'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: playerArr, enemyArr, inventory, interactItem, updateGameClassState, toggleMute


var OverlayMerchant = function (_React$Component) {
  _inherits(OverlayMerchant, _React$Component);

  function OverlayMerchant(props) {
    _classCallCheck(this, OverlayMerchant);

    var _this = _possibleConstructorReturn(this, (OverlayMerchant.__proto__ || Object.getPrototypeOf(OverlayMerchant)).call(this, props));

    _this.setSource = _this.setSource.bind(_this);
    _this.optKeyDown = _this.optKeyDown.bind(_this);
    _this.updateOptFocus = _this.updateOptFocus.bind(_this);
    _this.setList = _this.setList.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.handleInteractItem = _this.handleInteractItem.bind(_this);

    _this.state = {
      source: {},
      interactCategories: ['Buy', 'Sell'],
      invCategories: ['Head', 'Amulet', 'Weapon', 'Armor', 'Shield', 'Glove', 'Ring', 'Foot', 'Consumable'],
      colNames: ['Quant/Buy/Sell', 'Name', 'Stats'],
      bInteractId: 'interact-type',
      bRowId: 'item-row',
      bColId: 'item-col',
      focusClass: 'optFocus',
      interactCategory: 'Buy',
      row: 0,
      col: 0
    };
    return _this;
  }

  _createClass(OverlayMerchant, [{
    key: 'setSource',
    value: function setSource() {
      var _props = this.props,
          playerArr = _props.playerArr,
          enemyArr = _props.enemyArr;


      var curEnemy = {},
          source = {};

      [[playerArr[0] - 1, playerArr[1]], [playerArr[0], playerArr[1] + 1], [playerArr[0] + 1, playerArr[1]], [playerArr[0], playerArr[1] - 1]].forEach(function (coord) {
        curEnemy = enemyArr[coord[0]][coord[1]];
        if (curEnemy && curEnemy.type === 'merchant') {
          source = curEnemy;
        }
      });
      this.setState({ source: source });
    }
  }, {
    key: 'optKeyDown',
    value: function optKeyDown(e) {
      var el = e.nativeEvent.code,
          cats = this.state.invCategories,
          len = cats.length;

      var _state = this.state,
          row = _state.row,
          col = _state.col,
          interactCategories = _state.interactCategories,
          interactCategory = _state.interactCategory,
          delta = [];


      if ((el === 'ArrowUp' || el === 'KeyW') && row > 0) delta = [-1, 0];else if ((el === 'ArrowRight' || el === 'KeyD') && col < len - 1) delta = [0, 1];else if (el === 'ArrowDown' || el === 'KeyS') delta = [1, 0];else if ((el === 'ArrowLeft' || el === 'KeyA') && col > 0) delta = [0, -1];else if (el === 'KeyY' && interactCategory !== interactCategories[0]) {
        this.setState({ row: 0, interactCategory: interactCategories[0] });
      } else if (el === 'KeyU' && interactCategory !== interactCategories[1]) {
        this.setState({ row: 0, interactCategory: interactCategories[1] });
      } else if (el === 'KeyI' || el === 'KeyE' || el === 'Escape') this.props.updateGameClassState({ overlayMode: 'off' });else if ((el === 'Space' || el === 'Enter' || el === 'NumpadEnter') && getById(this.state.bRowId + this.state.row)) {
        var name = getById(this.state.bRowId + row).querySelectorAll('span')[1].id,
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
          stats = '',
          quantBuySell = '',
          buyA = 0,
          buyB = 0;

      for (props in inv) {
        if (inv[props].type === header && inv[props].count > 0) {
          el = inv[props];
          quantBuySell = el.count + '/' + el.buy + '/' + el.sell;
          stats = '';

          for (p in el.stats) {
            stats += '' + conv[p] + el.stats[p] + ' ';
          }list.push([quantBuySell, el.name, stats, props]);
        }
      }

      return list.sort(function (a, b) {
        buyA = a[0].split('/')[1] * 1;
        buyB = b[0].split('/')[1] * 1;
        return buyA !== buyB ? buyB - buyA : a[1] < b[1] ? -1 : 1;
      });
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
            {
              className: colNames[0].toLowerCase().replace(/\//g, '-') + '-col',
              key: list[i][0] + i },
            list[i][0]
          ),
          React.createElement(
            'span',
            {
              id: list[i][3],
              className: colNames[1].toLowerCase() + '-col',
              key: list[i][1] + '-col' },
            list[i][1]
          ),
          React.createElement(
            'span',
            { className: colNames[2].toLowerCase() + '-col', key: list[i][2] + i },
            list[i][2]
          )
        );
      });
    }
  }, {
    key: 'handleInteractItem',
    value: function handleInteractItem(name) {
      var _state2 = this.state,
          interactCategories = _state2.interactCategories,
          interactCategory = _state2.interactCategory,
          source = _state2.source;


      var interactItem = Object.assign({}, this.props.interactItem),
          item = {},
          action = '';

      if (interactCategory === interactCategories[0]) {
        action = interactCategories[0].toLowerCase();
        item = source.inventory[name];
      } else {
        action = interactCategories[1].toLowerCase();
        item = this.props.inventory[name];
      }

      interactItem.count += 1;
      interactItem.type = action;
      interactItem.item = item;
      interactItem.source = source;

      this.props.updateGameClassState({ interactItem: interactItem });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setSource();
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.interactCategory !== nextState.interactCategory || this.state.row !== nextState.row || this.state.col !== nextState.col || this.props.interactItem.count !== nextProps.interactItem.count) {

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
      var cats = [].concat(_toConsumableArray(this.state.invCategories)),
          _state3 = this.state,
          row = _state3.row,
          col = _state3.col,
          bInteractId = _state3.bInteractId,
          bRowId = _state3.bRowId,
          bColId = _state3.bColId,
          focusClass = _state3.focusClass,
          interactCategories = _state3.interactCategories,
          interactCategory = _state3.interactCategory,
          colNames = _state3.colNames,
          source = _state3.source,
          header = cats[col].toLowerCase(),
          inv = interactCategory === interactCategories[0] ? source.inventory : this.props.inventory,
          abbrev = equipAbbrevMap;


      var interactHeaders = null,
          colHeaders = null,
          iHeaders = null,
          items = null,
          classes = '';

      var list = this.setList(inv, header);

      interactHeaders = interactCategories.map(function (x, i) {
        classes = x === interactCategory ? bInteractId + ' ' + focusClass : bInteractId;
        return React.createElement(
          'span',
          { className: classes, key: x + i },
          x
        );
      });

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
        { id: 'merchant-overlay', className: 'stage-overlay', tabIndex: '1', onKeyDown: this.optKeyDown },
        React.createElement(
          'h4',
          { className: 'merchant-header' },
          interactHeaders
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

  return OverlayMerchant;
}(React.Component);