
//props: playerArr, enemyArr, inventory, interactItem, overlayMode, updateGameClassState,
//playerPalettes, tileSize, toggleMute
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
