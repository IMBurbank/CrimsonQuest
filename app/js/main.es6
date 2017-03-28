

class GameLevel extends React.Component {
	render() {
		return (
			<div className='level'>
				Game Level
			</div>
		);
	}
}

class CharacterInfo extends React.Component {
	render() {
		return (
			<div className='char-info'>
				Character Info
			</div>
		);
	}
}

class GameItems extends React.Component {
	render() {
		return (
			<div className='items'>
				Game Items
			</div>
		);
	}
}

class EnemiesRemaining extends React.Component {
	render() {
		return (
			<div className='enemies-remaining'>
				Enemies Remaining
			</div>
		);
	}
}

class EnemyStats extends React.Component {
	render() {
		return (
			<div className='enemy-stats'>
				Enemy Stats
			</div>
		);
	}
}

class ActivityLog extends React.Component {
	render() {
		return (
			<div className='activity-log'>
				Activity Log
			</div>
		);
	}
}

class GameTips extends React.Component {
	render() {
		return (
			<div className='tips'>
				Game Tips
			</div>
		);
	}
}

class GameStage extends React.Component {
	render() {
		return (
			<div className='stage'>
				Game Stage
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className='game'>
				<div className='col-lft'>
					<GameLevel	/>
					<CharacterInfo	/>
				</div>
				<div className='col-mid'>
					<div className='title'>CrimsonQuest</div>
					<GameStage	/>
					<GameItems	/>
				</div>
				<div className='col-rgt'>
					<EnemiesRemaining	/>
					<EnemyStats	/>
					<ActivityLog	/>
					<GameTips	/>
				</div>
			</div>
		);
	}
}


/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/
class PageHeader extends React.Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div className='pg-header'>
				<h1>CrimsonQuest</h1>
			</div>
		);
	}
}

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/
class PageFooter extends React.Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div className='pg-footer'>
				<span>© 2017 Isaac Burbank.</span>
				<span>
					Tiles By&nbsp;
					<a href='http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181' target='_blank'>
					DragonDePlatino </a>
				</span>
			</div>
		);
	}
}


/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/
class App extends React.Component {
	render() {
		return (
			<div className='pg'>
				<PageHeader	/>
				<div className='pg-content'>
					<Game	/>
				</div>
				<PageFooter	/>
			</div>
		);
	}
}


/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/
ReactDOM.render (
	<App	/>,
	document.getElementById('root')
)
