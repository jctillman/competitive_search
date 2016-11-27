const stateutils = require('./stateutils');


function State(options){
	options = options || {};
	this.width = options.width || 7;		//default board width
	this.height = options.height || 6;		//default board height
	this.winning = options.winning || 4;	//how many connections you need to win
	this.lastMove = undefined;
	this.lastMovePlayer = undefined;		//'x' or 'o': who moved last
	this.nextMovePlayer = 'x';				//'x' or 'o': who moves next
	this.board = stateutils.blankBoard(this.width, this.height);	//initialize with a blank board.
}

//Returns a state after a move has been made.
//move(Int) => State
State.prototype.move = function(location){
	if (this.legalMoves().length == 0){
		throw new Error("No move allowed")
	};
	var ret = new State({
		width: this.width,
		height: this.height
	});
	ret.lastMove = location;
	ret.lastMovePlayer = this.nextMovePlayer
	ret.nextMovePlayer = (this.nextMovePlayer == 'x') ? 'o' : 'x';
	ret.board = stateutils.dropped(this.board, location, this.nextMovePlayer);
	return ret;
}

//Returns an array of legal moves.
// legaMoves() => [Int, Int, Int...]
State.prototype.legalMoves = function(){
	if (this.someoneWon()){
		return [];
	}else{
		return this.board[0].map(function(content, index){
				return (content == 0) ? index : content;
			}).filter(function(thing, index){
				return typeof(thing) == 'number'
			});
	}
}

//Returns an array of possible successor states.
//nextStates() => [State, State, State...]
State.prototype.nextStates = function(){
	var self = this;
	return this.legalMoves().map(function(move){
		return self.move(move);
	});
}

//Returns the number of lines for side 'type'
//of length 'length'
//numLines(Int, Str) => Int
State.prototype.numLines = function(length, type){
	return stateutils.numLines(this.board, length, type);
}

//someoneWon() => Bool
//Returns whether someone one.
State.prototype.someoneWon = function(){
	var self = this;
	return ['x','o'].some(function(side){
		return (self.numLines(self.winning, side) !== 0)
	});
}

//winner => 'x' or 'o'
State.prototype.winner = function(){
	var self = this;
	return ['x','o'].find(function(side){
		return self.numLines(self.winning, side);
	});
}

State.prototype.isDraw = function(){
	return !this.someoneWon() && this.legalMoves().length == 0;
}

State.load = function(ld){
	var ret = new State();
	ret.width = ld.width;
	ret.height = ld.height;
	ret.winning = ld.winning;
	ret.lastMove = ld.lastMove;
	ret.lastMovePlayer = ld.lastMovePlayer;
	ret.nextMovePlayer = ld.nextMovePlayer;
	ret.board = ld.board;
	return ret;
}

module.exports = State;