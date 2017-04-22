
//props: inventory, interactItem, updateGameClassState
class InventoryOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.optKeyDown = this.optKeyDown.bind(this);
    this.updateOptFocus = this.updateOptFocus.bind(this);
    this.setList = this.setList.bind(this);
    this.focus = this.focus.bind(this);
    this.handleInteractItem = this.handleInteractItem.bind(this);

    this.state = ({
      invCategories: ['Head','Amulet','Weapon','Armor','Shield','Glove','Ring','Foot','Consumable'],
      bRowId: 'item-row',
      bColId: 'item-col',
      focusClass: 'optFocus',
      row: 0,
      col: 0,
    });
  }

  optKeyDown(e) {
    const el = e.nativeEvent.code,
      cats = this.state.invCategories,
      len = cats.length;

    let {row, col} = this.state,
      delta = [];

    if ((el === 'ArrowUp' || el === 'KeyW') && row > 0) delta = [-1, 0];
    else if ((el === 'ArrowRight' || el === 'KeyD') && col < len - 1) delta = [0, 1];
    else if ((el === 'ArrowDown' || el === 'KeyS') ) delta = [1, 0];
    else if ((el === 'ArrowLeft' || el === 'KeyA') && col > 0) delta = [0, -1];
    else if ((el === 'KeyI' || el === 'KeyE')) this.props.updateGameClassState({overlayMode: 'off'});
    else if ((el === 'Space' || el === 'Enter') && getById(this.state.bRowId + this.state.row)) {
      let name = getById(this.state.bRowId + row).querySelectorAll('span')[1].innerText,
        type = this.state.invCategories[this.state.col].toLowerCase();

      this.handleInteractItem(name);
    }

    if (delta.length > 0) this.updateOptFocus([row, col], delta);
  }

  updateOptFocus(coordsArr, deltaArr = []) {
    const bIds = [this.state.bRowId, this.state.bColId];

    let update = false,
      nextVal = '',
      nState = {};

    if (deltaArr[1] !== 0 ) {
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

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  setList(inv, header) {
    const conv = statConvertWordMap;

    let list = [],
      props = null,
      p = null,
      el = null,
      equipped = '',
      stats = '';

    for (props in inv) {
      if (inv[props].type === header && inv[props].count > 0) {
        el = inv[props];
        stats = '';

        for (p in el.stats) stats += `${conv[p]}${el.stats[p]} `;
        if (el.type === 'consumable') list.push([el.count, el.name, stats]);
        else equipped = el.equipped ? 'E' : ' ', list.push([equipped, el.name, stats]);
      }
    }
    return list;
  }

  setItems(list, colNames, bRowId) {
    const row = this.state.row;

    let classes = '';

    return [...Array(list.length)].map(
      (x, i) => {
        classes = i === row ? `${bRowId} ${this.state.focusClass}` : bRowId;
        return ( <div id={bRowId + i} className={classes} key={list[i][1]}>
          <span className={`${colNames[0].toLowerCase()}-col`} key={list[i][0]}>{list[i][0]}</span>
          <span className={`${colNames[1].toLowerCase()}-col`} key={list[i][1] + '-col'}>{list[i][1]}</span>
          <span className={`${colNames[2].toLowerCase()}-col`} key={list[i][2]}>{list[i][2]}</span>
        </div> );
      }
    );
  }

  handleInteractItem(name) {
    const item = this.props.inventory[name],
      cats = this.state.invCategories;

    let interactItem = Object.assign({}, this.props.interactItem),
      action = '';

    action = item.type === cats[cats.length - 1].toLowerCase() ? 'use' :
      item.equipped ? 'unequip' : 'equip';

    interactItem.count += 1;
    interactItem.type = action;
    interactItem.item = item;

    this.props.updateGameClassState({ interactItem });
  }

  componentDidMount() {
    this.focus();
    this.focusID = setInterval( () => this.focus(), 250 );
  }

  componentWillUnmount() {
    clearInterval(this.focusID);
  }

  render() {
    const cats = [...this.state.invCategories],
      {row, col, bRowId, bColId, focusClass} = this.state,
      header = cats[col].toLowerCase(),
      inv = this.props.inventory,
      abbrev = equipAbbrevMap;

    let colHeaders = null,
      iHeaders = null,
      items = null,
      classes = '';

    const colNames = header === 'consumable' ? ['Quantity', 'Name', 'Stats'] :
      ['Equipped', 'Name', 'Stats'];

    const list = this.setList(inv, header);

    colHeaders = cats.map(
      (x, i) => {
        classes = i === col ? `${bColId} ${focusClass}` : bColId;
        return (<span id={bColId + i} className={classes} key={x}>{abbrev[x]}</span>);
      }
    );

    iHeaders = [...Array(colNames.length)].map(
       (x,i) => <span className={'item-header item-header-' + i} key={colNames[i]}>{colNames[i]}</span>
     );

    items = this.setItems(list, colNames, bRowId);


    return (
      <div id='inv-overlay' className='stage-overlay' tabIndex='1' onKeyDown={this.optKeyDown}>
        <h4 className='inv-header'>Inventory</h4>
        <div className='inv-categories'>
          {colHeaders}
        </div>
        <div className='item-list'>
          <div className='iheader-row'>{iHeaders}</div>
          {items}
        </div>
      </div>
    );
  }
}
