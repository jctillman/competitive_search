import React from 'react'
import Dashboard from './Dashboard'
import Board from './Board'


export default class App extends React.Component{
	
	constructor(){
		super();
		this.state = {
			playing: false,
			humanPlayerIs: null
		}
		this.setPlay = this.setPlay.bind(this);
		this.restart = this.restart.bind(this);

	}

	setPlay(playing, playAs){
		this.setState({playing: playing, humanPlayerIs: playAs});
	}

	restart(){
		this.setState({playing: false});
	}

	render(){
		return (
			<div className="outer">
				{ this.state.playing || <Dashboard setPlay={this.setPlay} /> }
				{ this.state.playing && <Board humanPlayerIs={this.state.humanPlayerIs} restart={this.restart}/> }
			</div>
		);
	}

}


