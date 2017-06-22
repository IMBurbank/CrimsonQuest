//props: enemyDead, gameLevel

class CurrentObjective extends React.Component {
  constructor(props) {
    super(props);
    this.resetBossDead = this.resetBossDead.bind(this);
    this.handleEnemyDead = this.handleEnemyDead.bind(this);

    this.enemyDeadCount = 0;
    this.objectives = {
      'false': 'Find and slay boss',
      'true': 'Travel through portal'
    };

    this.state = ({
      bossDead: false
    });
  }

  resetBossDead() {
    this.setState({ bossDead: false });
  }

  handleEnemyDead(nextProps) {
    const {enemyDead} = nextProps;

    this.enemyDeadCount = enemyDead.count;

    if (enemyDead.source.boss) this.setState({ bossDead: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.enemyDeadCount !== nextProps.enemyDead.count) {
      this.handleEnemyDead(nextProps);
    }
    if (this.props.gameLevel !== nextProps.gameLevel) {
      this.resetBossDead();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.bossDead !== nextState.bossDead) {

      return true;
    }
    return false;
  }

  render() {
    return (
      <div className='current-objective'>
        <p>Current Objective</p>
        <p>{this.objectives[this.state.bossDead]}</p>
      </div>
    );
  }
}
