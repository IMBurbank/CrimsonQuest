//props: type, message

class ActivityLogRow extends React.Component {
  render() {

    return (
      <p className={`log ${this.props.type}`}>{this.props.message}</p>
    );
  }

}
