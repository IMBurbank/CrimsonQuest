

//props: boardSize, tileSize, floor, gameLevel, levels, hero, playerArr, bgArr, updateBgArr, floorCoords,
//updateFloorCoords, updatePlayerArr, itemArr, itemPalettes, updateGameClassState, itemPaletteArrMap
//inventory, interactItem
class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.updateAccArr = this.updateAccArr.bind(this);

    this.state = ({
      stageSize: 480,
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
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.props.bgArr}
          updateBgArr = {this.props.updateBgArr}
          playerArr = {this.props.playerArr}  />
        <AccentLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          accArr = {this.state.accArr}
          updateAccArr = {this.updateAccArr}  />
        <ItemLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          levels = {this.props.levels}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          floorCoords = {this.props.floorCoords}
          itemArr = {this.props.itemArr}
        	itemPalettes = {this.props.itemPalettes}
          itemPaletteArrMap = {this.props.itemPaletteArrMap}
        	updateGameClassState = {this.props.updateGameClassState} />
        {/*<EnemyLayer	/>*/}
        {/*<FogLayer	/>*/}
        <PlayerLayer
          stageSize = {this.state.stageSize}
          tileSize =  {this.props.tileSize}
          hero = {this.props.hero}
          gameLevel = {this.props.gameLevel}
          bgArr = {this.props.bgArr}
          playerArr = {this.props.playerArr}
          floorCoords = {this.props.floorCoords}
          updateGameClassState = {this.props.updateGameClassState}  />
        <OptionOverlay
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          overlayMode = {this.props.overlayMode}
          updateGameClassState = {this.props.updateGameClassState}  />
      </div>
    );
  }
}
