(function(){

	var r = Math.round(Math.random() * 10000).toString();
	var libName = '__LIB_' + r + '__';
	window[libName] = {};

	window.set = function(place, value){
		place = place.toLowerCase();
		if(window[libName][place]){
			throw new Error("Already exists.")
		}else{
			window[libName][place] = value;
		}
	}

	window.get = function(place){
		place = place.toLowerCase();
		var gotten = window[libName][place]
		if (gotten === undefined){
			throw new Error('Attempted to access non-existing resource: ' + place)
		} 
		return gotten;
	}

})();