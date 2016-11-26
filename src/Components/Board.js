import React from 'react'
import Cell from './Cell'
import State from '../game_logic/state'


export default class Board extends React.Component{
	
	constructor(){
		super();
		this.state = {
			boardstate: new State()
		};
		this.state.board = this.state.boardstate.board;
		console.log(this.state);
		this.move = this.move.bind(this);
	}

	move(colIndex){
		this.setState({boardstate: this.state.boardstate.move(colIndex)})
		console.log(this.state.boardstate.board);
	}

	render(){
		return (
			<div>
				<table>
					<tbody>
					{
						this.state.boardstate.board.map( (row,i) => (
						<tr key={i}>
							{
								row.map( (element, j) => (
									<Cell key={`${i}+${j}`} content={element} colIndex={j} move={this.move} />
								))
							}
						</tr>
						))
					}
					</tbody>
				</table>
			</div>
		);
	}

}


