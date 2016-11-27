import React from 'react'

export default class Cell extends React.Component {

	render () {
		const {content, move, colIndex} = this.props;
		var color
		if(content === 0){
			color = "white";
		}else if(content === "x"){
			color = "red";
		}else if(content == "o"){
			color = "blue";
		}else{
			throw new Error("Unidentified piece on board.");
		}

		return (
			<td 
				style={{backgroundColor:color}}
				onClick={() => (move(colIndex))}>
			</td>
			)
	}
	
}

