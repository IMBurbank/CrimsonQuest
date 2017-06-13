//props: playerArr, enemyArr, inventory, interactItem, updateGameClassState


class OverlayMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.setSource = this.setSource.bind(this);
    this.optKeyDown = this.optKeyDown.bind(this);
    this.updateOptFocus = this.updateOptFocus.bind(this);
    this.setList = this.setList.bind(this);
    this.focus = this.focus.bind(this);
    this.handleInteractItem = this.handleInteractItem.bind(this);

    this.state = ({
      source: {},
      interactCategories: ['Buy', 'Sell'],
      invCategories: ['Head','Amulet','Weapon','Armor','Shield','Glove','Ring','Foot','Consumable'],
      colNames: ['Quant/Buy/Sell', 'Name', 'Stats'],
      bInteractId: 'interact-type',
      bRowId: 'item-row',
      bColId: 'item-col',
      focusClass: 'optFocus',
      interactCategory: 'Buy',
      row: 0,
      col: 0,
    });
  }

  setSource() {
    const {playerArr, enemyArr} = this.props;

    let curEnemy = {},
      source = {};

    [
      [playerArr[0] - 1, playerArr[1]],
      [playerArr[0], playerArr[1] + 1],
      [playerArr[0] + 1, playerArr[1]],
      [playerArr[0], playerArr[1] - 1],
    ].forEach(
      coord => {
        curEnemy = enemyArr[coord[0]][coord[1]];
        if (curEnemy && curEnemy.type === 'merchant') {
          source = curEnemy;
          console.log('Found Merchant ', source);
        }
      }
    );
    this.setState({ source });
  }

  optKeyDown(e) {
    const el = e.nativeEvent.code,
      cats = this.state.invCategories,
      len = cats.length;

    let {row, col, interactCategories, interactCategory} = this.state,
      delta = [];

    if ((el === 'ArrowUp' || el === 'KeyW') && row > 0) delta = [-1, 0];
    else if ((el === 'ArrowRight' || el === 'KeyD') && col < len - 1) delta = [0, 1];
    else if ((el === 'ArrowDown' || el === 'KeyS') ) delta = [1, 0];
    else if ((el === 'ArrowLeft' || el === 'KeyA') && col > 0) delta = [0, -1];
    else if (el === 'KeyY' && interactCategory !== interactCategories[0]) {
      this.setState({row: 0, interactCategory: interactCategories[0]});
    }
    else if (el === 'KeyU' && interactCategory !== interactCategories[1]) {
      this.setState({row: 0, interactCategory: interactCategories[1]});
    }
    else if ((el === 'KeyI' || el === 'KeyE' || el === 'Escape')) this.props.updateGameClassState({overlayMode: 'off'});
    else if ((el === 'Space' || el === 'Enter') && getById(this.state.bRowId + this.state.row)) {
      let name = getById(this.state.bRowId + row).querySelectorAll('span')[1].id,
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
      stats = '',
      quantBuySell = '';

    for (props in inv) {
      if (inv[props].type === header && inv[props].count > 0) {
        el = inv[props];
        quantBuySell = `${el.count}/${el.buy}/${el.sell}`;
        stats = '';

        for (p in el.stats) stats += `${conv[p]}${el.stats[p]} `;

        list.push([quantBuySell, el.name, stats, props]);
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
          <span
            className={`${colNames[0].toLowerCase().replace(/\//g, '-')}-col`}
            key={list[i][0] + i}  >

            {list[i][0]}
          </span>
          <span
            id={list[i][3]}
            className={`${colNames[1].toLowerCase()}-col`}
            key={list[i][1] + '-col'}>

            {list[i][1]}
          </span>
          <span className={`${colNames[2].toLowerCase()}-col`} key={list[i][2] + i}>{list[i][2]}</span>
        </div> );
      }
    );
  }

  handleInteractItem(name) {
    const {interactCategories, interactCategory, source} = this.state;

    let interactItem = Object.assign({}, this.props.interactItem),
      item = {},
      action = '';

    if (interactCategory === interactCategories[0]) {
      action = interactCategories[0].toLowerCase();
      item = source.inventory[name];
    } else {
      action = interactCategories[1].toLowerCase();
      item = this.props.inventory[name];
    }

    console.log('OverlayMerchant handleInteractItem name, item: ', name, item);

    interactItem.count += 1;
    interactItem.type = action;
    interactItem.item = item;
    interactItem.source = source;

    this.props.updateGameClassState({ interactItem });
  }

  componentWillMount() {
    this.setSource();
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
      {row, col, bInteractId, bRowId, bColId, focusClass, interactCategories, interactCategory, colNames, source} = this.state,
      header = cats[col].toLowerCase(),
      inv = interactCategory === interactCategories[0] ? source.inventory :
        this.props.inventory,
      abbrev = equipAbbrevMap;

    let interactHeaders = null,
      colHeaders = null,
      iHeaders = null,
      items = null,
      classes = '';

    const list = this.setList(inv, header);

    interactHeaders = interactCategories.map(
      (x, i) => {
        classes = x === interactCategory ?
          `${bInteractId} ${focusClass}` :
          bInteractId;
        return (<span className={classes} key={x+i}>{x}</span>);
      }
    );

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
      <div id='merchant-overlay' className='stage-overlay' tabIndex='1' onKeyDown={this.optKeyDown}>
        <h4 className='merchant-header'>
          {interactHeaders}
        </h4>
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
