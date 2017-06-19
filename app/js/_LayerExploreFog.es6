//props: stageSize, tileSize, boardSize, playerArr, gameLevel

class LayerExploreFog extends React.Component {
  constructor(props) {
    super(props);
    this.initfogState = this.initFogState.bind(this);
    this.resetFogArr = this.resetFogArr.bind(this);
    this.clearExploreFog = this.clearExploreFog.bind(this);
    this.drawExploreFog = this.drawExploreFog.bind(this);

    this.lastPlayerArr = [];
    this.smoothingEnabled = false;
    this.fogVal = 1;
    this.sightRadius = 4;
    this.sightDecrement = 1;

    this.state = ({
      fogArr: [],
      renderArr: [],
      fogSquareCanvas: null,
      tempCanvas: null
    });
  }

  initFogState() {
    let {fogArr, renderArr} = this.state,
      {stageSize, boardSize, tileSize} = this.props,
      fogVal = this.fogVal,
      fogSquareCanvas = initMemCanvas(tileSize, tileSize, this.smoothingEnabled),
      tempCanvas = initMemCanvas(stageSize, stageSize, this.smoothingEnabled),
      fogCtx = fogSquareCanvas.getContext('2d'),
      rLen = stageSize / tileSize,
      i = 0,
      j = 0;

    fogCtx.fillRect(0, 0, tileSize, tileSize);
    renderArr = initZeroArray(rLen);
    fogArr.length = boardSize;

    while (i < boardSize) {
      fogArr[i] = [];
      fogArr[i].length = boardSize;

      while (j < boardSize) fogArr[i][j] = fogVal, j++;

      j = 0, i++;
    }

    this.setState({ fogArr, renderArr, fogSquareCanvas, tempCanvas });
  }

  clearExploreFog(fogArr, playerArr, boardSize) {
    const sightRadius = this.sightRadius,
      sightDecrement = this.sightDecrement,
      [row, col] = playerArr;

    let rowRadius = 0,
      i = 0,
      j = 0;

    for (i = 0; i <= sightRadius; i++) {
      rowRadius = i < 2 ? sightRadius : sightRadius - sightDecrement * i + 1;

      for (j = 0; j <= rowRadius; j++) {
        if (row + i < boardSize && col + j < boardSize) fogArr[row + i][col + j] = 0;
        if (i && row - i >= 0 && col + j < boardSize) fogArr[row - i][col + j] = 0;
        if (j && row + i < boardSize && col - j >= 0) fogArr[row + i][col - j] = 0;
        if (i && j && row - i >= 0 && col - j >= 0) fogArr[row - i][col - j] = 0;
      }
    }
    return fogArr;
  }

  resetFogArr() {
    let {fogArr} = this.state,
      {boardSize} = this.props,
      fogVal = this.fogVal,
      i = 0,
      j = 0;

    fogArr.length = boardSize;

    while (i < boardSize) {
      fogArr[i] = [];
      fogArr[i].length = boardSize;

      while (j < boardSize) fogArr[i][j] = fogVal, j++;

      j = 0, i++;
    }
    this.setState({ fogArr });
  }

  drawExploreFog(timestamp) {
    const {playerArr} = this.props;
    let lastArr = this.lastPlayerArr;

    if (playerArr[0] !== lastArr[0] || playerArr[1] !== lastArr[1]) {
      this.lastPlayerArr = playerArr.slice(0);

      const {fogSquareCanvas} = this.state,
        {stageSize, boardSize, tileSize} = this.props,
        rLen = stageSize / tileSize;

      let {fogArr, renderArr, tempCanvas} = this.state,
        dCtx = document.getElementById('layer-explore-fog').getContext('2d'),
        tempCtx = tempCanvas.getContext('2d'),
        dX = 0,
        dY = 0,
        i = 0,
        j = 0;

      let {startRow, startCol, renderArrHeight, renderArrWidth, sX, sY} =
        calcRenderPadding(playerArr, boardSize, rLen, tileSize);

      fogArr = this.clearExploreFog(fogArr, playerArr, boardSize);

      //set renderArr
      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          renderArr[i][j] = fogArr[startRow + i][startCol + j];
        }
      }

      tempCtx.clearRect(0, 0, stageSize, stageSize)

      for (i = 0; i < renderArrHeight; i++) {
        for (j = 0; j < renderArrWidth; j++) {
          if (renderArr[i][j]) {
            dX = sX + j * tileSize;
            dY = sY + i * tileSize;

            tempCtx.drawImage(fogSquareCanvas, dX, dY, tileSize, tileSize);
          }
        }
      }

      dCtx.clearRect(0, 0, stageSize, stageSize);
      dCtx.drawImage(tempCanvas, 0, 0, stageSize, stageSize);

      this.setState({ fogArr });
    }

    window.requestAnimationFrame(this.drawExploreFog);
  }

  componentDidMount() {
    this.initFogState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameLevel !== nextProps.gameLevel) {
      this.resetFogArr();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.tempCanvas && nextState.tempCanvas) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    window.requestAnimationFrame(this.drawExploreFog);
  }

  render() {
    const {stageSize} = this.props;
    return (
      <canvas
        id = 'layer-explore-fog'
        className = 'layer-explore-fog'
        width = {stageSize}
        height = {stageSize} />
    );
  }
}
