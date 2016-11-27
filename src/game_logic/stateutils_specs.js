var expect = require('chai').expect;
var su = require('./stateutils.js')

describe('All the tests', function(){

	it('Has a num-lines function, which works on arbitrary things', function(){

		var board = [
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0],
			[0,0,0,1,0,0,0],
			[0,0,1,0,0,0,0],
			[0,1,0,0,0,0,0]
		]
		expect(su.numLines(board,4,1)).to.equal(1)

		board = [
			[0,0,0,0,0,0,0],
			[0,0,0,1,0,0,0],
			[0,0,1,0,0,0,0],
			[0,1,0,0,0,0,0],
			[1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0]
		]
		expect(su.numLines(board,4,1)).to.equal(1)

		board = [
			[0,0,0,0,0,0,0],
			[1,0,0,1,0,0,0],
			[1,0,1,0,0,0,1],
			[1,1,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[0,1,1,1,1,0,1]
		]
		expect(su.numLines(board,4,1)).to.equal(4)

		board = [
			[1,0,1,0,1,0,1],
			[1,0,0,1,0,0,1],
			[1,0,1,0,1,0,1],
			[1,1,0,0,0,1,1],
			[0,0,0,0,0,0,0],
			[0,1,1,1,1,0,0]
		]
		expect(su.numLines(board,4,1)).to.equal(5)

		board = [
			[1,0,0,1,1,1,1],
			[1,0,0,0,0,0,0],
			[1,0,0,0,0,0,1],
			[1,0,0,0,0,0,1],
			[0,0,0,0,0,0,1],
			[1,1,1,1,0,0,1]
		]
		expect(su.numLines(board,4,1)).to.equal(4)

		board = [
			[1,1,0,1,1,0,1],
			[0,0,0,0,0,0,1],
			[0,1,0,1,0,0,0],
			[0,0,1,0,1,1,0],
			[1,0,0,0,0,0,0],
			[1,0,1,1,0,1,1]
		]
		expect(su.numLines(board,2,1)).to.equal(10)

		board = [
			[1,0,0,0,0,0,1],
			[0,1,0,0,0,1,0],
			[0,0,1,1,1,0,0],
			[0,0,1,1,1,0,0],
			[0,1,0,0,0,1,0],
			[1,0,0,0,0,0,1]
		]
		expect(su.numLines(board,4,1)).to.equal(4)

		board = [
			[0,0,0,1,0,0,0],
			[0,0,1,0,1,0,0],
			[1,1,0,0,0,1,1],
			[1,1,0,0,0,1,1],
			[0,0,1,0,1,0,0],
			[0,0,0,1,0,0,0]
		]
		expect(su.numLines(board,4,1)).to.equal(4)


	})

});