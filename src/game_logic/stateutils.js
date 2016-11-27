
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

	if (length < 2) throw new Error("Cannot call num-lines on lines < 2 long.")

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
	for(var x = board.length-1; x >= length-1; x--){
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

module.exports = {
	blankBoard: blankBoard,
	copyBoard: copyBoard,
	dropped: dropped,
	transpose: transpose,
	numCharInLength: numCharInLength,
	numLines: numLines
}