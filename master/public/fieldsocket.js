(function(){

	if(typeof window == 'undefined'){
		var PlayingField = require('./playingfield.js');
	}else{
		PlayingField = get('PlayingField')
	}
	
	var FieldSocket = function(options){
		this.pf = new PlayingField(options);
	}

	//Returns true if succesfuly, false otherwise.
	FieldSocket.prototype.joinField = function(id, name){
		if(id && name && this.pf.isNewId(id)){
			this.pf.addPlayer(id, name);
			return true;
		}else{
			return false
		}
	}

	//Returns state if success, otherwise false.
	FieldSocket.prototype.requestProblem = function(id){
		this.pf.cull();
		this.pf.matchUp();
		this.pf.touchPlayer(id);
		if(id && this.pf.canMove(id)){
			return this.pf.getStateByActivePlayerId(id);
		}else{
			return false;
		}
	}

	//Returns true if move made, otherwise false.
	FieldSocket.prototype.solveProblem = function(id, move){
		this.pf.cull();
		if (id && this.pf.canMove(id)){
			return this.pf.makeMove(id, move);
			return true;
		}else{
			return false;
		}
		
	}

	FieldSocket.prototype.leaderboard = function(){
		return this.pf.players.map(function(player){
			var temp = {}
			temp.name = player.name
			temp.wins = player.wins
			temp.losses = player.losses
			temp.draws = player.draws 
			temp.games = player.wins + player.losses + player.draws
			temp.ratio = temp.wins / temp.games;
			return temp
		}).sort(function(a,b){
			return b.ratio - a.ratio;
		});
	}

	if(typeof window == 'undefined'){
		module.exports = FieldSocket;
	}else{
		set('FieldSocket', FieldSocket)
	}

})();
