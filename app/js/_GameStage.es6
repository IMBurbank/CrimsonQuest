//props: boardSize, gameLevel, hero, playerArr, updatePlayerArr
class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.updateBgArr = this.updateBgArr.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateAccArr = this.updateAccArr.bind(this);

    this.state = ({
      stageSize: 480,
      tileSize: 32,
      floor: 40,
      bgArr: [],
      accArr: [],
      floorCoords: [],
      hWallCoords: [],
      vWallCoords: []
    });
  }

  updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords) {
    this.setState({ bgArr, floorCoords, hWallCoords, vWallCoords });
  }

  updateAccArr(accArr) {
    this.setState({ accArr });
  }

  handleKeyDown(e) {
    const el = e.nativeEvent.code,
      arr = this.props.playerArr,
      bg = this.state.bgArr,
      flr = this.state.floor,
      func = this.props.updatePlayerArr,
      len = this.props.boardSize - 1;

    let r = arr[0],
      c = arr[1];

    if ((el === 'ArrowUp' || el === 'KeyW') && r > 0 && bg[r-1][c] > flr) r--, func([r,c]);
    else if ((el === 'ArrowRight' || el === 'KeyD') && c < len && bg[r][c+1] > flr) c++, func([r,c]);
    else if ((el === 'ArrowDown' || el === 'KeyS') && r < len && bg[r+1][c] > flr) r++, func([r,c]);
    else if ((el === 'ArrowLeft' || el === 'KeyA') && c > 0 && bg[r][c-1] > flr) c--, func([r,c]);
  }

  render() {
    return (
      <div className='stage' tabIndex='0' onKeyDown={this.handleKeyDown}>
        <BackgroundLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.state.bgArr}
          updateBgArr = {this.updateBgArr}
          playerArr = {this.props.playerArr}  />
        <AccentLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          playerArr = {this.props.playerArr}
          bgArr = {this.state.bgArr}
          accArr = {this.state.accArr}
          updateAccArr = {this.updateAccArr}  />
        {/*<ItemLayer	/>*/}
        {/*<EnemyLayer	/>*/}
        {/*<FogLayer	/>*/}
        <PlayerLayer
          stageSize = {this.state.stageSize}
          tileSize =  {this.state.tileSize}
          hero = {this.props.hero}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.state.bgArr}
          playerArr = {this.props.playerArr}
          updatePlayerArr = {this.props.updatePlayerArr}
          floorCoords = {this.state.floorCoords}  />
      </div>
    );
  }
}
