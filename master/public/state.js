(function(){ 

	var blankBoard = function(width, height){
		var board = [];
		for(var x = 0; x < height; x++){
			board.push([]);
			for(var y = 0; y < width; y++){
				board[x].push(0);
			}
		}
		return board;
	}

	var copyBoard = function(board){
		var newBoard = [];
		for(var x = 0; x < board.length; x++){
			newBoard.push([])
			for(var y = 0; y < board[0].length; y++){
				newBoard[x].push(board[x][y]);
			}
		}
		return newBoard;
	}

	var dropped = function(board, place, kind){
		var newBoard = copyBoard(board);
		for(var x = board.length; x--; x >= 0){
			if(newBoard[x][place]==0){
				newBoard[x][place] = kind;
				return newBoard;
			}
		}
		throw new Error("Cannot place there.")
	}

	var transpose = function(arr){
		return arr[0].map(function(col, i) { 
	  		return arr.map(function(row) { 
	    		return row[i] 
	  		})
		});
	}

	function numCharInLength(arr, length, char){
		var times = 0;
		var currLength = 0;
		for(var x = 0; x < arr.length; x++){
			currLength = (arr[x] == char) ? (currLength + 1) : 0;
			times = (currLength >= length) ? (times + 1) : times;
		}
		return times;
	}

	var numLines = function(board, length, type){

		if (length < 2) throw new Error("Error! Cannot call num-lines on lines less than length of 2.")

		var numLines = 0;

		var rowCounts = board.map(function(row){
			return numCharInLength(row, length, type)
		});
		var colCounts = transpose(board).map(function(col){
			return numCharInLength(col, length, type)
		});

		var timesDownRight = 0;
		for(var x = 0; x <= board.length - length; x++){
			for(var y = 0; y <= board[0].length - length; y++){
				var allSame = true;
				for(var q = 0; q < length; q++){
					if (board[x+q][y+q] != type){
						allSame = false;
						break;
					}
				}
				if(allSame){
					timesDownRight++;
				}

			}
		}

		var timesUpRight = 0;
		for(var x = board.length-1; x >= length; x--){
			for(var y = 0; y <= board[0].length - length; y++){
				var allSame = true;
				for(var q = 0; q < length; q++){
					if (board[x-q][y+q] != type){
						allSame = false;
						break;
					}
				}
				if(allSame){
					timesUpRight++;
				}

			}
		}
		var add = function(a,b){
			return (a || 0) + (b || 0);
		}

		var total = timesUpRight + timesDownRight + rowCounts.reduce(add) + colCounts.reduce(add);
		return total;
	}

	function State(options){
		options = options || {};
		this.width = options.width || 7;
		this.height = options.height || 6;
		this.winning = options.winning || 4;
		this.lastMove = undefined;
		this.lastMovePlayer = undefined;
		this.nextMovePlayer = 'x';
		this.board = blankBoard(this.width, this.height);
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
		ret.board = dropped(this.board, location, this.nextMovePlayer);
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
	//nextStates() => [State, State, State]
	State.prototype.nextStates = function(){
		var self = this;
		return this.legalMoves().map(function(move){
			return self.move(move);
		});
	}

	State.prototype.numLines = function(length, type){
		return numLines(this.board, length, type);
	}

	//someoneWon => Bool
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


	if(typeof window == 'undefined'){
		module.exports = State;
	}else{
		set('State', State)
	}
	

})();


