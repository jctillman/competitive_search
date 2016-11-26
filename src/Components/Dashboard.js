import React from 'react'

export default class Dashboard extends React.Component{
	
	constructor(){
		super();
	}

	render(){
		return (
			<div>
				<input type="button" value="Play as X"></input>
				<input type="button" value="Play as O"></input>
			</div>
		);
	}

}


