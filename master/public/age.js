(function(){

	if(typeof window == 'undefined'){
		var utils = require('./utils.js')
	}else{
		var utils = get('utils');
	}

	function Age(){
		this.touched = utils.now();
	}

	Age.prototype.touch = function(){
		this.touched = utils.now();
	}

	Age.prototype.age = function(){
		return utils.now() - this.touched 
	}

	Age.prototype.olderThan = function(ago){
		return ago < this.age();
	}

	Age.prototype.youngerThan = function(ago){
		return ago > this.age();
	}

	if(typeof window == 'undefined'){
		module.exports = Age;
	}else{
		set('Age', Age)
	}

})();