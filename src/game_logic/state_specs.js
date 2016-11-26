var expect = require('chai').expect;
var State = require('../state.js')

describe('All the tests', function(){

	it('Enables you to make a state and move', function(){

		var temp = new State();
		expect(temp.lastMovePlayer).to.equal(undefined);
		expect(temp.nextMovePlayer).to.equal('x');
		temp = temp.move(0);
		expect(temp.lastMovePlayer).to.equal('x');
		expect(temp.nextMovePlayer).to.equal('o');
		temp = temp.move(0);
		expect(temp.lastMovePlayer).to.equal('o');
		expect(temp.nextMovePlayer).to.equal('x');
		
	});

	it('Stops you when the game is over--vertical', function(){
		//Set up a game which is over.
		var temp = new State();
		for(var x = 0; x < 3; x++){
			temp = temp.move(0);
			temp = temp.move(2);
			expect(temp.someoneWon()).to.equal(false);
			expect(temp.nextStates().length).to.equal(7);
			expect(temp.legalMoves().length).to.equal(7);
		}

		expect(temp.numLines(3,'x')).to.equal(1)
		expect(temp.numLines(3,'o')).to.equal(1)
		expect(temp.numLines(2,'x')).to.equal(2)
		expect(temp.numLines(2,'o')).to.equal(2)

		temp = temp.move(0);
		expect(temp.someoneWon()).to.equal(true);
		expect(temp.legalMoves().length).to.equal(0);
		expect(temp.legalMoves().length).to.equal(0);
	});

	it('Stops you when the game is over--horizontal', function(){
		//Set up a game which is over.
		var temp = new State();
		for(var x = 0; x < 3; x++){
			temp = temp.move(x);
			temp = temp.move(x);
			expect(temp.someoneWon()).to.equal(false);
			expect(temp.nextStates().length).to.equal(7);
			expect(temp.legalMoves().length).to.equal(7);
		}

		expect(temp.numLines(3,'x')).to.equal(1)
		expect(temp.numLines(3,'o')).to.equal(1)
		expect(temp.numLines(2,'x')).to.equal(2)
		expect(temp.numLines(2,'o')).to.equal(2)

		temp = temp.move(3);
		expect(temp.someoneWon()).to.equal(true);
		expect(temp.legalMoves().length).to.equal(0);
		expect(temp.legalMoves().length).to.equal(0);
	});

	it('Stops you when the game is over--diagonal, one angle', function(){
		//Set up a game which is over.
		var temp = new State();
		temp = temp.move(0); //x
		temp = temp.move(1);
		temp = temp.move(1); //x
		temp = temp.move(2);
		temp = temp.move(6); //x
		temp = temp.move(2);
		temp = temp.move(2); //x
		temp = temp.move(3);
		temp = temp.move(6); //x
		temp = temp.move(3); 
		temp = temp.move(6); //x
		temp = temp.move(3);
		//console.log(temp.board)
		expect(temp.someoneWon()).to.equal(false);
		expect(temp.nextStates().length).to.equal(7);
		expect(temp.legalMoves().length).to.equal(7);
		temp = temp.move(3); //x
		//console.log(temp.board);
		expect(temp.someoneWon()).to.equal(true);
		expect(temp.winner()).to.equal('x')
		expect(temp.legalMoves().length).to.equal(0);
		expect(temp.legalMoves().length).to.equal(0);
	});

	it('Stops you when the game is over--diagonal, other angle', function(){
		//Set up a game which is over.
		var temp = new State();
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(0); //x, first place
		temp = temp.move(1);
		temp = temp.move(5); //x
		temp = temp.move(1); 
		temp = temp.move(1); //x, second place
		temp = temp.move(2);
		temp = temp.move(2); //x, third place
		temp = temp.move(5); //o,

		expect(temp.numLines(2,'x')).to.equal(6)
		expect(temp.numLines(2,'o')).to.equal(10)
		expect(temp.numLines(3,'x')).to.equal(2)
		expect(temp.numLines(3,'o')).to.equal(3)

		expect(temp.someoneWon()).to.equal(false);
		expect(temp.nextStates().length).to.equal(7);
		expect(temp.legalMoves().length).to.equal(7);
		temp = temp.move(3); //x

		expect(temp.someoneWon()).to.equal(true);
		expect(temp.winner()).to.equal('x')
		expect(temp.legalMoves().length).to.equal(0);
		expect(temp.legalMoves().length).to.equal(0);
	});

	it('Throws an error when you try an illegal move--because game is over', function(){
		//Set up a game which is over.
		var temp = new State();
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(0); //x, first place
		temp = temp.move(1);
		temp = temp.move(5); //x
		temp = temp.move(1); 
		temp = temp.move(1); //x, second place
		temp = temp.move(2);
		temp = temp.move(2); //x, third place
		temp = temp.move(5); //o,
		temp = temp.move(3); //x
		var fn = function(){
			temp.move(3);
		}
		expect(fn).to.throw(Error);
	});

	it('Throws an error when you try an illegal move--because game is over', function(){
		//Set up a game which is over.
		var temp = new State();
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(6); //x
		temp = temp.move(0);
		temp = temp.move(0); //x, first place
		temp = temp.move(1);
		temp = temp.move(5); //x
		temp = temp.move(1); 
		temp = temp.move(1); //x, second place
		temp = temp.move(2);
		temp = temp.move(2); //x, third place
		temp = temp.move(5); //o,
		temp = temp.move(3); //x
		var fn = function(){
			temp.move(3);
		}
		expect(fn).to.throw(Error);
	});

	it('Throws an error when you try an illegal move--beause theres no space', function(){
		//Set up a game which is over.
		var temp = new State();
		temp = temp.move(0); //x
		temp = temp.move(0);
		temp = temp.move(0); //x
		temp = temp.move(0);
		temp = temp.move(0); //x
		temp = temp.move(0); 
		var fn = function(){
			temp.move(0);
		}
		expect(fn).to.throw(Error);
	});

});