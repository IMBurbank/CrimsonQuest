/**
  *		@desc GameStage overlay for hero death game over.
	*		@param {object} props - Component props.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *   @returns HTML GameStage overlay for game over.
  */

class OverlayGameOver extends React.Component {
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
    const gameOverMessage = 'You have failed. ' +
      'Your village was overrun by the evil horde. ' +
      'There were no survivors.';

    this.setState({ gameOverMessage });
  }

  optKeyDown(e) {
    const el = e.nativeEvent.code;

    if (el === 'Space' || el === 'Enter' || el === 'NumpadEnter' || el === 'Escape') {
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

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const {gameOverMessage, focusClass} = this.state;

    return (
      <div id='game-over-overlay' className='stage-overlay' tabIndex='1' onKeyDown={this.optKeyDown}>
        <h4 className='game-over-header'>GAME OVER</h4>
        <div className='game-over-message'>{gameOverMessage}</div>
        <div className={`game-over-row ${focusClass}`}>Try Again?</div>
      </div>
    );
  }
}
