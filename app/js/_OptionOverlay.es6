
//props: playerArr, enemyArr, inventory, interactItem, overlayMode, updateGameClassState
class OptionOverlay extends React.Component {

  render() {
    const mode = this.props.overlayMode;

    let content = null;

    if (mode === 'inv-overlay') {
      content = (
        <InventoryOverlay
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'merchant-overlay') {
      content = (
        <OverlayMerchant
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    }

    return (
      <div>{content}</div>
    );
  }
}
