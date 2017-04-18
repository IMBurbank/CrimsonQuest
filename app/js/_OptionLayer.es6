
//props: stageSize
class OptionOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      mode: 'off',
      //inventory, inGameOptions, startOptions

    });
  }

  render() {
    const size = this.props.stageSize,
      mode = this.state.mode;

    let content = null;

    


    return (
      <div id='opt-overlay' className='opt-overlay'>

      </div>
    );
  }
}
