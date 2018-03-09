import React from 'react'
import Cell from './Cell'
import State from '../game_logic/state'
import makeMoveFactory from '../game_logic/makemove';
import { minimaxWrapper } from '../minimax'; 

const makeMove = makeMoveFactory(minimaxWrapper);

export default class Board extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			boardstate: new State()
		};
		this.move = this.move.bind(this);
	}

	moveIfComputerMove(){
		if (this.state.boardstate.nextMovePlayer !== this.props.humanPlayerIs
			&& this.props.humanPlayerIs !== null 
			&& this.state.boardstate.legalMoves().length !== 0 ){
			var that = this;
			setTimeout(() => {
				var move = makeMove(this.state.boardstate);
				this.setState({boardstate: this.state.boardstate.move(move)});
			},50);
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
				<table id="board">
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
				{
					this.state.boardstate.legalMoves().length === 0 ?

					<div className="centeredText">
						<span>{this.state.boardstate.winner()} won!
						</span>
						<br />
						<input type="button" value="Restart" onClick={this.props.restart} />
					</div>
					: null
				}
			</div>
		);
	}

}


