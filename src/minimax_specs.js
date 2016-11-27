var State = require('./game_logic/state.js');
var minimaxLib = require('./minimax.js')
var expect = require('chai').expect;

var minimax = minimaxLib.minimax;
var makeMove = minimaxLib.makeMove;
var heuristic = minimaxLib.heuristic;

/* 
   A heuristic takes as input some particular game state.
   and outputs a number indicating how good / bad that state is.

   More specifically, the heuristic for a zero-sum game -- that is,
   a game where any gain by one side is loss for the other side --
   will return a higher positive number the better the game is
   for the maximizing player, and a lower negative number the better the game
   is for the minimizing player.

   Specifically, this concrete function will take as input
   1. An instance of the class "State" -- that is, a description of the current state of the board.
   2. The current player who is the maximizing player -- the one who is currently
      trying to maximize the score, unlike the other who is trying to minimize.
      This will either be an 'x' string or an 'o' string.

      It will return a positive or negative number. 
 */
describe("Testing some basic functionality for the heuristics", function(){

	/*First off, this function should return some kind of number.*/
	it("Returns a number after being given a state", function(){
		var s = new State();
		expect(typeof (heuristic(s, 'x')) == 'number').to.equal(true);
		expect(typeof (heuristic(s, 'o')) == 'number').to.equal(true);
	});

	/* Second, remember that the "maximizing player" and the "minimizing player"
	   are only maximizing and minimizing players by convention.  They are a 
	   feature of the map, and not the territory; of how we're looking at 
	   the game, and not the game itself.

	   So if we switch the players, we should get exactly the same value, except
	   multiplied by -1.*/ 

	it("Returns the negative of the value for one player when maximizing player is switched", function(){
		for(var x = 0; x < 100; x++){
			var s = new State();
			for(var z = 0; z < 7; z++){
				s = s.move( Math.floor(Math.random() * s.width ) )
			}
			expect( -heuristic(s, 'x') == heuristic(s, 'o')).to.equal(true);;
		}
	});

	/* The rest of these all are basically checking to see if 
	   the program returns some kind of reasonable values in cases when, although
	   there are equal numbers of pieces on the board, 'x' has more in a line 
	   together than 'o' does. */
	it("It returns a higher score when 'x' has two in a single line, and 'o' has two disconnected", function(){
		//Make a new game state
		var s = new State();
		s = s.move(1)  //X moves
		s = s.move(5)  //O moves
		var lower = heuristic(s, 'x')
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		var higher = heuristic(s, 'x')
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has three in a single line, and 'o' has two connected, and one not connected", function(){
		var s = new State();
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		var lower = heuristic(s, 'x')
		s = s.move(1)  //X moves
		s = s.move(5)  //O moves
		var higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has four in a single line, and 'o' doens'true", function(){
		//Make a new game state
		var s = new State();
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		var lower = heuristic(s, 'x')
		s = s.move(0)  //X moves
		var higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

});




describe('Testing some basic functions in the minimax evaluation function', function(){

	/* The depth which is passed to the minimax function tells it how many 
	   layers down to go.

	   So when it is called with a depth of zero, it should
	   simply be calling the heuristic function and never call itself recursivly. */

	it('Returns simply the value of the heuristic function when depth is set to 0', function(){
		for(var x = 0; x < 10; x++){
			var s = new State();  //Make a new game state
			for(var z = 0; z < 7; z++){  //Make some random moves
				s = s.move( Math.floor(Math.random() * s.width ) )
			}
			var heuristicValue = heuristic(s, 'x');
			var minimaxValue = minimax(s, 0, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue).to.equal(true);
		}
	});

	/* When there are no more moves which can be made, then the
	   minimax function should also return merely the value of the
	   heuristic function, because there are no child states to
	   call itself recursively on. */

	it('Also returns simply the value of the heuristic function when there are no moves left to make', function(){
		for(var x = 0; x < 5; x++){
			//Make a new game state, with a board height of 1 so
			//that s.nextStates or s.legalMoves returns an array 
			//of length zero after we've filled the first 
			//and last row entirely.
			var s = new State({height: 1});
			s = s.move(0)
			s = s.move(1)
			s = s.move(2)
			s = s.move(3)
			s = s.move(4)
			s = s.move(5)
			s = s.move(6)
			var heuristicValue = heuristic(s, 'x');
			var minimaxValue = minimax(s, 32, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue).to.equal(true);;
		}
	});


	/* It should also return some kind of value when you call it and
	   it does need to call itself recursively. */
	it("It returns values of some kind when there's depth involved", function(){

		for(var x = 0; x < 3; x++){
			var s = new State();
			for(var m = 0; m < 6; m++){
				s = s.move(Math.floor(Math.random()*7));
			}
			var val = minimax(s, Math.floor(Math.random()*2), 'x');
			expect(typeof val == 'number').to.equal(true);;
		}

	});

	/* And sadly, here is where the test specs end.
	   
	   To see if your algorithm really working any more--that is,
	   to see if it's making intelligent decisions--you'll need
	   to play it.  "npm start" and go to localhost:8888 to play 
	   against your algorithm.
     */

});
