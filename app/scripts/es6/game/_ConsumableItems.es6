/**
  *		@desc Game component to display QuickConsume consumable items.
	*		@param {object} props - Component props.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {object} props.inventory - Current hero item inventory.
	*		@param {object} props.interactItem - Hero/Item interaction details.
	*		@param {object} props.itemPalettes - Item sprite sheets on canvas.
	*		@param {function} props.updateGameClassState - Update Game component state.
	*		@returns QuickConsume game component.
  */

class ConsumableItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleInteractItem = this.handleInteractItem.bind(this);
    this.updateConsumeCanvas = this.updateConsumeCanvas.bind(this);

    this.state = ({
      cItems: [
        'potion',
        'hiPotion',
        'xPotion',
        'tomeOfVitality',
        'tomeOfDurability',
        'tomeOfStrength',
        'tomeOfAgility',
        'tomeOfWisdom'
      ],
    });
  }

  handleInteractItem(nextProps) {
    const num = nextProps.quickConsume.num,
      inv = nextProps.inventory,
      interactItem = Object.assign({}, nextProps.interactItem),
      m = consumableAbbrevMap;

    let name = '',
      item = null,
      props = null;

    for (props in m) {
      if (num == m[props].num) name = m[props].name;
    }

    item = inv[name];

    if (item && item.count > 0) {
      interactItem.count += 1;
      interactItem.type = 'use'
      interactItem.item = item;

      nextProps.updateGameClassState({ interactItem });
    }
  }

  updateConsumeCanvas(nextProps) {
    const {interactItem, inventory} = nextProps,
      {item, type} = interactItem,
      m = consumableAbbrevMap;

    let update = false,
      props = null,
      dCtx = null,
      palette = null,
      loc = [];

    if ((inventory[item.name].count === 1 && ['pickup', 'buySuccess'].includes(type)) ||
      (inventory[item.name].count === 0 && ['use', 'sell'].includes(type))) {

      update = true;
    }

    if (update) {
      for (props in m) {
        if (item.name === m[props].name) dCtx = getById(props + '-canvas').getContext('2d');
      }

      palette = nextProps.itemPalettes[item.palette];
      loc = item.iconLoc;

      if (['use', 'sell'].includes(type)) dCtx.clearRect(0, 0, loc[2], loc[3]);
      else dCtx.drawImage(palette, loc[0], loc[1], loc[2], loc[3], 0, 0, loc[2], loc[3]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.quickConsume.count !== nextProps.quickConsume.count &&
      nextProps.quickConsume.count) {

      this.handleInteractItem(nextProps);
    }
    if (this.props.interactItem.count !== nextProps.interactItem.count &&
      nextProps.interactItem.count &&
      ['pickup', 'use', 'buySuccess', 'sell'].includes(nextProps.interactItem.type) &&
      nextProps.interactItem.item.type === 'consumable') {

      this.updateConsumeCanvas(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.quickConsume.count !== nextProps.quickConsume.count ||
      this.props.interactItem.count !== nextProps.interactItem.count) {

      return true;
    }
    return false;
  }

  render() {
    const m = consumableAbbrevMap,
      itm = this.state.cItems,
      inv = this.props.inventory,
      ts = this.props.tileSize;

    let output = [],
      count = 0;

    output = itm.map( el => {
      count = 0;
      if (inv[m[el].name]) count = inv[m[el].name].count;
      return (
        <div className={'consumable-col'} key={'consumable-col' + m[el].num}>
          <p className={'consumable-col-num'} key={'consumable-col-num' + m[el].num}>
            {m[el].num}
          </p>
          <canvas
            id={el + '-canvas'}
            className='consumable-canvas'
            key={el + '-canvas'}
            width={ts}
            height={ts} />
          <p className={'consumable-col-abbrev'} key={'consumable-col-abbrev' + m[el].num}>
            {m[el].abbrev}
          </p>
          <p className={'consumable-col-count'} key={'consumable-col-count' + m[el].num}>
            {'x' + count}
          </p>
        </div>
      );
    });

    return (
      <div className='consumable-items'>
        {output}
      </div>
    );
  }
}
