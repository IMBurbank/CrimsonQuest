/**
  *		@desc ActivityLog subcomponent renders each individual log row.
	*		@param {object} props - Component props.
	*		@param {string} props.key - React render property.
	*		@param {string} props.type - Log row activity type.
	*		@param {string} props.message - Displayed row message.
	*		@returns ActivityLog row.
  */

class ActivityLogRow extends React.Component {
  render() {

    return (
      <p className={`log ${this.props.type}`}>{this.props.message}</p>
    );
  }

}
