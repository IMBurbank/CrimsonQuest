

//props: boardSize, tileSize, floor, gameLevel, levels, hero, playerArr, bgArr, updateBgArr, floorCoords,
//updateFloorCoords, updatePlayerArr, itemArr, itemPalettes, updateGameClassState, itemPaletteArrMap
//inventory, interactItem, heroFacing, enemyArr, enemyPalettes, enemyDead, bgLevelProcessed, playerPalettes, toggleMute
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
          bgLevelProcessed = {this.props.bgLevelProcessed}
          bgArr = {this.props.bgArr}
          updateBgArr = {this.props.updateBgArr}
          playerArr = {this.props.playerArr}  />
        <AccentLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          bgLevelProcessed = {this.props.bgLevelProcessed}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          accArr = {this.state.accArr}
          enemyDead = {this.props.enemyDead}
          updateAccArr = {this.updateAccArr}  />
        <ItemLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          bgLevelProcessed = {this.props.bgLevelProcessed}
          levels = {this.props.levels}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          floorCoords = {this.props.floorCoords}
          itemArr = {this.props.itemArr}
        	itemPalettes = {this.props.itemPalettes}
          itemPaletteArrMap = {this.props.itemPaletteArrMap}
          enemyDead = {this.props.enemyDead}
        	updateGameClassState = {this.props.updateGameClassState} />
        <EnemyLayer
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          enemyPalettes = {this.props.enemyPalettes}
        	updateGameClassState = {this.props.updateGameClassState} 	/>
        {/*<FogLayer	/>*/}
        <PlayerLayer
          stageSize = {this.state.stageSize}
          tileSize =  {this.props.tileSize}
          hero = {this.props.hero}
          heroFacing = {this.props.heroFacing}
          playerPalettes = {this.props.playerPalettes}
          gameLevel = {this.props.gameLevel}
          bgLevelProcessed = {this.props.bgLevelProcessed}
          bgArr = {this.props.bgArr}
          playerArr = {this.props.playerArr}
          floorCoords = {this.props.floorCoords}
          updateGameClassState = {this.props.updateGameClassState}  />
        <OptionOverlay
          tileSize =  {this.props.tileSize}
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          playerPalettes = {this.props.playerPalettes}
          overlayMode = {this.props.overlayMode}
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      </div>
    );
  }
}
