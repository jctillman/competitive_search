const State = require('./game_logic/state.js');
const minimaxLib = require('./minimax.js')
const expect = require('chai').expect;

const heuristic = minimaxLib.heuristic;
const isBaseCase = minimaxLib.isBaseCase; 
const minimax = minimaxLib.minimax;
const minimaxAlphaBeta = minimaxLib.minimaxAlphaBeta;

/* 
   A heuristic takes as input some particular game state.
   and outputs a number indicating how good / bad that state is.

   More specifically, the heuristic for a zero-sum game -- that is,
   a game where any gain by one side is loss for the other side --
   will return a higher positive number the better the game is
   for the maximizing player, and a lower negative number the better
   the game is for the minimizing player.

   Specifically, this concrete function will take as input
   1. An instance of the class "State" -- that is, a description of
      the current state of the board.
   2. The current player who is the maximizing player -- the one who
      is currently trying to maximize the score, unlike the other
      who is trying to minimize.  This will either be an 'x' string
      or an 'o' string.

      It will return a positive or negative number. 
 */
describe("Testing some basic functionality for the heuristics", function(){

	/*First off, this function should return some kind of number.*/
	it("Returns a number after being given a state", function(){
		const s = new State();
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
		for(let x = 0; x < 100; x++){
			let s = new State();
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
		let s = new State();
		s = s.move(1)  //X moves
		s = s.move(5)  //O moves
		let lower = heuristic(s, 'x')
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		let higher = heuristic(s, 'x')
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has three in a single line, and 'o' has two connected, and one not connected", function(){
		let s = new State();
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		s = s.move(1)  //X moves
		s = s.move(0)  //O moves
		let lower = heuristic(s, 'x')
		s = s.move(1)  //X moves
		s = s.move(5)  //O moves
		let higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has four in a single line, and 'o' doens'true", function(){
		//Make a new game state
		let s = new State();
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		let lower = heuristic(s, 'x')
		s = s.move(0)  //X moves
		let higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

});


describe('"isBaseCase" returns the correct values', function(){

    it('Returns "true" when depth is zero, false otherwise', function(){
        let s = new State();  //Make a new game state
        expect(isBaseCase(s, 0)).to.equal(true);
        expect(isBaseCase(s, 1)).to.equal(false);
        expect(isBaseCase(s, 2)).to.equal(false);
    });

    it('Returns "true" when someone has won, false otherwise', function() {
		//Make a new game state
		let s = new State();
        // Build a game state like this
        // _ _ _ _ _ _ _
        // x _ _ _ _ _ _
        // x _ _ _ _ _ _
        // x _ _ _ _ _ _
        // x o o o _ _ _
		s = s.move(0)  //X moves
		s = s.move(1)  //O moves
		s = s.move(0)  //X moves
		s = s.move(2)  //O moves
		s = s.move(0)  //X moves
		const noVictory = s.move(3)  //O moves
		const victory = noVictory.move(0)  //X moves
        expect(isBaseCase(noVictory, 2)).to.equal(false);
        expect(isBaseCase(victory, 2)).to.equal(true);
    });

});



describe('"minimax" returns the correct values', function(){

	/* The depth which is passed to the minimax function tells it how many 
	   layers down to go.

	   So when it is called with a depth of zero, it should
	   simply be calling the heuristic function and never call itself recursivly. */

	it('Returns simply the value of the heuristic function when depth is set to 0', function(){
		for(let x = 0; x < 10; x++){
			let s = new State();  //Make a new game state
			for(let z = 0; z < 7; z++){  //Make some random moves
				s = s.move( Math.floor(Math.random() * s.width ) )
			}
			let heuristicValue = heuristic(s, 'x');
			let minimaxValue = minimax(s, 0, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue).to.equal(true);
		}
	});

	/* When there are no more moves which can be made, then the
	   minimax function should also return merely the value of the
	   heuristic function, because there are no child states to
	   call itself recursively on. */
	it('Returns simply the value of the heuristic function when there are no moves left to make', function(){
		for(let x = 0; x < 5; x++){
			//Make a new game state, with a board height of 1 so
			//that s.nextStates or s.legalMoves returns an array 
			//of length zero after we've filled the first 
			//and last row entirely.
			let s = new State({height: 1});
			s = s.move(0)
			s = s.move(1)
			s = s.move(2)
			s = s.move(3)
			s = s.move(4)
			s = s.move(5)
			s = s.move(6)
			let heuristicValue = heuristic(s, 'x');
			let minimaxValue = minimax(s, 32, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue).to.equal(true);;
		}
	});


    /* It returns numeric values when depth is involved */
    it("Returns numeric values of some kind when there's depth involved", function(){

		for(let x = 0; x < 3; x++){
			let s = new State();
			for(var m = 0; m < 6; m++){
				s = s.move(Math.floor(Math.random()*7));
			}
			let val = minimax(s, Math.floor(Math.random()*2), 'x');
			expect(typeof val == 'number').to.equal(true);;
		}
	});
    
    /* This should pass if your logic is correct,
     * although reading this won't help you with the logic. */
	it("Returns correct values for specific cases, starting in the beginning", function(){
        
        let s = new State();
        s = s.move(2)
        expect(minimax(s,1,'x')).to.equal(0);
        expect(minimax(s,2,'x')).to.equal(10000);

	});
    
    /* This should pass if your logic is correct, 
     * although reading the spec probably won't
     * help you with the logic. */
    it("Returns correct values for specific cases, starting in the middle", function(){
        let s = new State();
        s = s.move(2);
        s = s.move(3);
        s = s.move(3);
        s = s.move(4);
        expect(minimax(s,1,'x')).to.equal(20000);
        expect(minimax(s,2,'x')).to.equal(-20000);
	});

});
