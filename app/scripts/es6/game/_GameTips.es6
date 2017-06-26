/**
  *		@desc Game component provides basic game tips.
	*		@returns Basic game tips.
  */

class GameTips extends React.Component {
  render() {
    return (
      <div className='tips'>
        <p>Press 'H' for help</p>
        <p>Press 'Q' for mute</p>
      </div>
    );
  }
}
