//props: updateGameClassState, toggleMute

class OverlayGameWin extends React.Component {
  constructor(props) {
    super(props);
    this.initOverlay = this.initOverlay.bind(this);
    this.optKeyDown = this.optKeyDown.bind(this);
    this.focus = this.focus.bind(this);

    this.state = ({
      gameOverMessage: '',
      focusClass: 'optFocus',
    });
  }

  initOverlay() {
    const gameOverMessage = 'The Evil Lords have been crushed.\n' +
      'The minions that remain cower from your fury. The evil hordes scatter.\n' +
      'Your village will surely rejoice upon your return.';

    this.setState({ gameOverMessage });
  }

  optKeyDown(e) {
    const el = e.nativeEvent.code;

    if (el === 'Space' || el === 'Enter' || el === 'Escape') {
      this.props.updateGameClassState({overlayMode: 'hero-selection-overlay'});
    } else if (el === 'KeyQ' || el === 'KeyP') {
      this.props.toggleMute();
    }
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  componentWillMount() {
    this.initOverlay();
  }

  componentDidMount() {
    this.focus();
    this.focusID = setInterval( () => this.focus(), 250 );
  }

  componentWillUnmount() {
    clearInterval(this.focusID);
  }


  render() {
    const {gameOverMessage, focusClass} = this.state;

    return (
      <div id='game-over-overlay' className='stage-overlay' tabIndex='1' onKeyDown={this.optKeyDown}>
        <h4 className='game-over-header'>YOU ARE VICTORIOUS</h4>
        <div className='game-over-message'>{gameOverMessage}</div>
        <div className={`game-over-row ${focusClass}`}>Play Again?</div>
      </div>
    );
  }
}
