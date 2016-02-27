(function(){

	//Arr => Arr
	shuffle = function(arr){
		var ret = [];
		while(arr.length){
			ret.push(arr.splice(Math.floor(arr.length*Math.random()), 1)[0]);
		}
		return ret;
	},

	//Arr, T => Arr
	remove = function(arr, inst){
		var ind = arr.indexOf(inst)
		return (ind != -1)
			? arr.slice(0, ind).concat(arr.slice(ind+1, arr.length))
			: arr.slice();
	},

	//Arr, Function => Int
	indexMatching = function(arr, pred){
		for(var x = 0; x < arr.length; x++){
			if (pred(arr[x])){
				return x;
			}
		}
		return -1;
	},

	//Null => Int
	now = function(){
		return (new Date()).getTime();
	}

	dly = function(func){
		setTimeout(func,100);
	}

	var all = {
		shuffle: shuffle,
		remove: remove,
		indexMatching: indexMatching,
		now: now,
		dly: dly
	}

	if(typeof window == 'undefined'){
		module.exports = all;
	}else{
		set('utils', all)
	}

})();

