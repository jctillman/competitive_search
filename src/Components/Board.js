import React from 'react'
import Cell from './Cell'
import State from '../game_logic/state'
import makeMove from '../minimax.js'


export default class Board extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			boardstate: new State()
		};
		this.move = this.move.bind(this);
		console.log(props)
	}

	moveIfComputerMove(){
		if (this.state.boardstate.nextMovePlayer !== this.props.humanPlayerIs &&
			this.props.humanPlayerIs !== null ){
			var move = makeMove(this.state.boardstate);
			this.setState({boardstate: this.state.boardstate.move(move)});
		}
	}

	componentDidMount(){
		this.moveIfComputerMove();
	}

	componentDidUpdate(){
		this.moveIfComputerMove();
	}

	move(colIndex){
		this.setState({boardstate: this.state.boardstate.move(colIndex)})
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


