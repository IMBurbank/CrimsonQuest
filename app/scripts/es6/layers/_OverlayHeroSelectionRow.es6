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

class OverlayHeroSelectionRow extends React.Component {
  constructor(props) {
    super(props);
    this.drawIcon = this.drawIcon.bind(this);

    this.canvasId = 'hero-icon'
    this.iconDrawn = false;

    this.state = ({});
  }

  drawIcon(curProps = this.props) {
    this.iconDrawn = true;

    const {position, heroType, playerPalettes, tileSize} = curProps,
      heroCanvas = playerPalettes[heroType.toLowerCase()+'Img'];

    let ctx = getById(this.canvasId + position).getContext('2d');

    ctx.drawImage(heroCanvas, 0, 0, tileSize, tileSize, 0, 0, tileSize, tileSize);
  }

  componentDidMount() {
    if (this.props.playerPalettes != null &&
      this.props.playerPalettes[this.props.heroType.toLowerCase()+'Img']) {

      this.drawIcon();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.iconDrawn &&
      nextProps.playerPalettes != null &&
      nextProps.playerPalettes[nextProps.heroType.toLowerCase()+'Img']) {

      this.drawIcon(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.propscurrentSelection !== nextProps.currentSelection) {
      return true;
    }

    return false
  }

  render() {
    const {position, heroType, currentSelection, tileSize} = this.props,
      hero = heroTypeStats[heroType],
      rowClasses = heroType === currentSelection ?
        `hero-selection-row hero-selection-focus` :
        `hero-selection-row`;

    return (
      <div className={rowClasses}>

        <canvas
          id={this.canvasId + position}
          className='hero-selection-canvas'
          width = {tileSize}
          height = {tileSize} />

        <div className='hero-description'>
          <div className='label-col'>
            <p>Name:</p>
            <p>Type:</p>
            <p>Desc:</p>
          </div>

          <div className='info-col'>
            <p>{hero.heroName}</p>
            <p>{heroType}</p>
            <p>{hero.description}</p>
          </div>
        </div>

      </div>
    );
  }
}
