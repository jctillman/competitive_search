var expect = require('chai').expect;
var Age = require('../age.js');

describe('Tests all of age', function(){

	it('Can be created, gives age in ms correctly', function(done){

		var a = new Age();
		expect(a.age()).to.equal(0);
		setTimeout(function(){
			expect(a.age() >= 20).to.equal(true);
			expect(a.age() <= 30).to.equal(true);

			expect(a.olderThan(18)).to.equal(true);
			expect(a.olderThan(28)).to.equal(false);
			expect(a.youngerThan(28)).to.equal(true);
			expect(a.youngerThan(18)).to.equal(false);

			done();
		},20)

	});

});