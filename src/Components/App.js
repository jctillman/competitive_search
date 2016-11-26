import React from 'react'
import Dashboard from './Dashboard'
import Board from './Board'


export default class App extends React.Component{
	
	constructor(){
		super();
		this.state = {
			playing: true
		}
	}

	render(){
		return (
			<div>
				{ this.state.playing || <Dashboard/> }
				{ this.state.playing && <Board/> }
			</div>
		);
	}

}


