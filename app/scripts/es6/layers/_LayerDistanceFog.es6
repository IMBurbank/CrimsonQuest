/**
  *		@desc GameStage canvas layer responsible for distance fog rendering.
	*		@param {object} props - Component props.
	*		@param {number} props.stageSize - Pixel dimension of square GameStage.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
  *   @property {array} renderPadArr - Additional inset padding for hero view range.
  *   @property {number} renderInset - Number of tiles inset or hero view range.
  *   @property {number} fogColor - Color of distance fog.
  *   @property {boolean} smoothingEnabled - Setting for canvas context imageSmoothingEnabled.
  *		@returns HTML canvas layer for distance fog.
  */

class LayerDistanceFog extends React.Component {
  constructor(props) {
    super(props);
    this.drawDistanceFog = this.drawDistanceFog.bind(this);

    this.renderPadArr = [3, 2, 1, 0, 0, 0, 1, 2, 3];
    this.renderInset = 3;
    this.fogColor = 'rgba(0,0,0,0.4)';
    this.smoothingEnabled = false;
  }

  drawDistanceFog() {
    const {stageSize, tileSize} = this.props,
      renderInset = this.renderInset,
      renderPadArr = this.renderPadArr,
      rLen = renderPadArr.length;

    let dCtx = getById('layer-distance-fog').getContext('2d'),
      i = 0,
      j = 0;

    dCtx.fillStyle = this.fogColor;
    dCtx.imageSmoothingEnabled = this.smoothingEnabled;
    dCtx.fillRect(0, 0, stageSize, stageSize);

    for (i = 0; i < rLen; i++) {
      for (j = 0; j < rLen; j++) {
        if (j >= renderPadArr[i] && j < rLen - renderPadArr[i]) {
          dCtx.clearRect(
            tileSize * (renderInset + j),
            tileSize * (renderInset + i),
            tileSize,
            tileSize
          );
        }
      }
    }

  }

  componentDidMount() {
    this.drawDistanceFog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const {stageSize} = this.props;
    return (
      <canvas
        id = 'layer-distance-fog'
        className = 'layer-distance-fog'
        width = {stageSize}
        height = {stageSize} />
    );
  }
}
