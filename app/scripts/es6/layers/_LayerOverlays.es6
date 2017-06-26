/**
  *		@desc GameStage component responsible for managing stage HTML overlays.
	*		@param {object} props - Component props.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {string} props.overlayMode - Current GameStage overlay.
	*		@param {array} props.playerArr - Hero's coordinates on the game board.
	*		@param {array} props.enemyArr - Square array holds level enemy layer state.
	*		@param {object} props.inventory - Current hero item inventory.
	*		@param {object} props.interactItem - Hero/Item interaction details.
	*		@param {object} props.playerPalettes - Hero sprite sheets on canvas.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *		@returns Current GameStage overlay, if applicable.
  */

class LayerOverlays extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.overlayMode !== nextProps.overlayMode ||
      this.props.overlayMode !== 'off') {

      return true;
    }
    return false;
  }

  render() {
    const mode = this.props.overlayMode;

    let content = null;

    if (mode === 'inv-overlay') {
      content = (
        <OverlayInventory
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'help-overlay') {
      content = (
        <OverlayHelp
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'merchant-overlay') {
      content = (
        <OverlayMerchant
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'game-over-overlay') {
      content = (
        <OverlayGameOver
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'game-win-overlay') {
      content = (
        <OverlayGameWin
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'hero-selection-overlay') {
      content = (
        <OverlayHeroSelection
          tileSize = {this.props.tileSize}
          playerPalettes = {this.props.playerPalettes}
          toggleMute = {this.props.toggleMute}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    }

    return (
      <div>{content}</div>
    );
  }
}
