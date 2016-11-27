import React from 'react'

export default class Dashboard extends React.Component{
	
	constructor(){
		super();
		
	}

	render(){
		const {setPlay} = this.props;
		return (
			<div>
				<input type="button" value="Play as X" onClick={()=>setPlay(true,"x")}></input>
				<input type="button" value="Play as O" onClick={()=>setPlay(true,"o")}></input>
			</div>
		);
	}

}


