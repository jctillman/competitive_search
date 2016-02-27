var expect = require('chai').expect;
var util = require('../utils.js');

describe('Testing all utility functions', function(){
	it('Tests the shuffle', function(){
		var arr = [1,2,3,4,5,6,7,8,9,10];
		var shuffled = util.shuffle(arr);
		var times = 0
		for(var x = 0; x < 10; x++){
			times = (arr[x] == shuffled[x]) ? times + 1 : times;
		}
		expect(times < 5).to.equal(true);
	})

	it('Tests the remove', function(){
		var arr = [1,2,3,4,5,6,7,8,9,10];
		var removed = util.remove(arr, 5);
		expect(removed[4]).to.equal(6);
	})


	it('Tests the indexMatching', function(){

		var arr = [1,2,3,4,5,6]
		var dex = util.indexMatching(arr, function(n){
			return n == 4
		});
		expect(dex).to.equal(3);
	})

	it('Tests the now', function(){
		expect(util.now()).to.equal((new Date()).getTime());
	});

	it('Tests that time thing', function(done){
		var now = util.now();
		setTimeout(function(){
			var newNow = util.now();
			expect(newNow > now);
			done();
		}, 100)

	})

})