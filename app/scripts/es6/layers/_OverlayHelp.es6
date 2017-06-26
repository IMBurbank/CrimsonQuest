/**
  *		@desc GameStage overlay for help and key bindings.
	*		@param {object} props - Component props.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *   @returns HTML GameStage overlay for help screen.
  */

class OverlayHelp extends React.Component {
  constructor(props) {
    super(props);
    this.initOverlay = this.initOverlay.bind(this);
    this.optKeyDown = this.optKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.maintainFocus = this.maintainFocus.bind(this);
    this.endFocus = this.endFocus.bind(this);

    this.state = ({
      helpMessage: '',
    });
  }

  initOverlay() {
    const helpMessage = "Items enclosed in quotes ('') denote key mappings."

    this.setState({ helpMessage });
  }

  optKeyDown(e) {
    const el = e.nativeEvent.code;

    if (el === 'KeyH' || el === 'Space' || el === 'Enter' || el === 'Escape') {
      this.props.updateGameClassState({overlayMode: 'off'});
    } else if (el === 'KeyQ' || el === 'KeyP') {
      this.props.toggleMute();
    }
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  maintainFocus() {
    this.focus();
    this.focusID = setInterval( () => this.focus(), 250 );
  }

  endFocus() {
    clearInterval(this.focusID);
  }

  componentWillMount() {
    this.initOverlay();
  }

  componentDidMount() {
    this.maintainFocus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount() {
    this.endFocus();
  }


  render() {
    const {helpMessage} = this.state;

    return (
      <div id='help-overlay' className='stage-overlay' tabIndex='1' onKeyDown={this.optKeyDown}>
        <h4 className='game-over-header'>HELP</h4>
        <div className='game-over-message'>{helpMessage}</div>
        <div className='help-details'>
          <p className='help-row'>
            <span className='help-action'>ACTION</span>
            <span>KEY MAP</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Move Up:</span>
            <span>'W' or 'ArrowUp'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Move Down:</span>
            <span>'S' or 'ArrowDown'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Move Left:</span>
            <span>'A' or 'ArrowLeft'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Move Right:</span>
            <span>'D' or 'ArrowRight'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Enter:</span>
            <span>'Enter' or 'SpaceBar'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Use Stat Point:</span>
            <span>'V', 'B', 'N', 'M'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>QuickConsume Items:</span>
            <span>Numbers '1' through '8'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Toggle Inventory:</span>
            <span>'I' or 'E'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Toggle Help:</span>
            <span>'H'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Toggle Mute:</span>
            <span>'Q' or 'P'</span>
          </p>
          <p className='help-row'>
            <span className='help-action'>Toggle Buy/Sell:</span>
            <span>'Y'/'U' (In Merch Screen)</span>
          </p>
        </div>
      </div>
    );
  }
}
