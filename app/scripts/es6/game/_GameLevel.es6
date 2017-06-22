//props: gameLevel, levels

class GameLevel extends React.Component {
  constructor(props) {
    super(props);

    this.levelNames = {
      '1': 'The Threshold',
      '2': 'Forboding Cave',
      '3': 'Cave of Hopelessness',
      '4': 'Cave of Despair',
      '5': 'Abyss Cave',
      '6': 'Dungeon Entry',
      '7': 'Demon Palisades',
      '8': 'Feeding Dungeon',
      '9': "Death's Doorstep",
      '10': 'The Abyss'
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.gameLevel !== nextProps.gameLevel) return true;

    return false;
  }

  render() {
    const {gameLevel} = this.props,
      levelName = this.levelNames[gameLevel];

    return (
      <div className='level'>
        <p className='level-header'>{`Level ${gameLevel}`}</p>
        <p className='level-name'>{levelName}</p>
      </div>
    );
  }
}
