/**
  *		@desc Stage for all game animation layers.
	*		@param {object} props - Component props.
	*		@param {number} props.boardSize - Length of square game state arrays.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {number} props.floor - First integer of floor value range in bgArr.
	*		@param {number} props.gameLevel - Current game level.
	*		@param {number} props.levels - Total game levels.
	*		@param {number} props.bgLevelProcessed - Updated as LayerBackground processes a level.
	*		@param {string} props.hero - Name of chosen hero.
	*		@param {string} props.heroFacing - Current hero direction.
	*		@param {string} props.overlayMode - Current GameStage overlay.
	*		@param {array} props.playerArr - Hero's coordinates on the game board.
	*		@param {array} props.bgArr - Square array holds level background layer state.
	*		@param {array} props.itemArr - Square array holds level item layer state.
	*		@param {array} props.enemyArr - Square array holds level enemy layer state.
	*		@param {array} props.floorcoords - Floor coords which haven't been take by hero/item/enemy.
	*		@param {object} props.inventory - Current hero item inventory.
	*		@param {object} props.interactItem - Hero/Item interaction details.
	*		@param {object} props.portalObjective - Portal location and current discovery state.
	*		@param {object} props.enemyDead - Most recent dead enemy details.
	*		@param {object} props.itemPaletteArrMap - Maps itemArr numbers to their corresponding object.
	*		@param {object} props.itemPalettes - Item sprite sheets on canvas.
	*		@param {object} props.enemyPalettes - Enemy sprite sheets on canvas.
	*		@param {object} props.playerPalettes - Hero sprite sheets on canvas.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *		@returns Game layer stage.
  */

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
        <LayerPlayer
          stageSize = {this.state.stageSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          bgLevelProcessed = {this.props.bgLevelProcessed}
          hero = {this.props.hero}
          heroFacing = {this.props.heroFacing}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          floorCoords = {this.props.floorCoords}
          playerPalettes = {this.props.playerPalettes}
          updateGameClassState = {this.props.updateGameClassState}  />
        <LayerBackground
          boardSize = {this.props.boardSize}
          stageSize = {this.state.stageSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          bgLevelProcessed = {this.props.bgLevelProcessed}
          playerArr = {this.props.playerArr}
          bgArr = {this.props.bgArr}
          updateGameClassState = {this.props.updateGameClassState}  />
        <LayerAccent
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
        <LayerItem
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
        <LayerEnemy
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          enemyPalettes = {this.props.enemyPalettes}
        	updateGameClassState = {this.props.updateGameClassState} 	/>
        <LayerDistanceFog
          stageSize = {this.state.stageSize}
          tileSize =  {this.props.tileSize}  />
        <LayerExploreFog
          stageSize = {this.state.stageSize}
          boardSize = {this.props.boardSize}
          tileSize =  {this.props.tileSize}
          gameLevel = {this.props.gameLevel}
          playerArr = {this.props.playerArr}
          portalObjective = {this.props.portalObjective}
          updateGameClassState = {this.props.updateGameClassState}  />
        <LayerOverlays
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
