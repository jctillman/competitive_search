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

	}

	setPlay(playing, playAs){
		this.setState({playing: playing, humanPlayerIs: playAs});
	}

	render(){
		return (
			<div>
				{ this.state.playing || <Dashboard setPlay={this.setPlay} /> }
				{ this.state.playing && <Board humanPlayerIs={this.state.humanPlayerIs}/> }
			</div>
		);
	}

}


