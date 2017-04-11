

//props: boardSize, floor gameLevel, hero, playerArr, bgArr,
//updateBgArr, floorCoords, updatePlayerArr
class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.updateAccArr = this.updateAccArr.bind(this);

    this.state = ({
      stageSize: 480,
      tileSize: 32,
      accArr: [],
    });
  }
  updateAccArr(accArr) {
    this.setState({ accArr });
  }

  render() {
    return (
      <div className='stage'>
        <BackgroundLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.props.bgArr}
          updateBgArr = {this.props.updateBgArr}
          playerArr = {this.props.playerArr}  />
        <AccentLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.state.tileSize}
          gameLevel = {this.props.gameLevel}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
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
          bgArr = {this.props.bgArr}
          playerArr = {this.props.playerArr}
          updatePlayerArr = {this.props.updatePlayerArr}
          floorCoords = {this.props.floorCoords}  />
      </div>
    );
  }
}
