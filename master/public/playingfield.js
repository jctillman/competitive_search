(function(){

	if(typeof window == 'undefined'){
		var State = require('./state.js');
		var utils = require('./utils.js');
		var Age = require('./age.js');
	}else{
		var State = get('State');
		var utils = get('utils');
		var Age = get('Age');
	}


	var PlayingField = function(options){

		options = options || {};
		//By default remove from 
		//game after 15 seconds and from 
		//everything after one minute.
		this.removeFromMatch = options.removeFromMatch || 15 * 1000;
		this.removeFromAll = options.removeFromAll || 60 * 1000;

		//Members should be objects like this:
		//{	id: Int,
		//	name: String,
		//  age: Age,
		//	prior: {x: Int, o: Int},
		//	wins: Int,
		// 	losses: Int,
		//	draws: Int,
		//}
		this.players = [];
		//Members should be objects like this
		//{ x: [player],
		//	y: [player],
		//	state: State
		//}
		this.pairs = [];

	}


	//STUFF WHICH RETURNS STUFF WITHOUT CHANGING ANYTHING
	PlayingField.prototype.getPlayerById = function(id){
		return this.players.find(function(player){
			return player.id == id;
		});
	}

	PlayingField.prototype.inGame = function(id){
		var self = this;
		var player = self.getPlayerById(id);
		return self.pairs.some(function(pair){
				return pair.x == player || pair.o == player;}
	)}

	PlayingField.prototype.notInGame = function(id){
		var self = this;
		return !self.inGame(id);
	}

	PlayingField.prototype.tooOldForMatch = function(id){
		return this.getPlayerById(id).age.olderThan(this.removeFromMatch);
	}

	PlayingField.prototype.tooOldForAll= function(id){
		return this.getPlayerById(id).age.olderThan(this.removeFromAll);
	}

	PlayingField.prototype.isReady = function(id){
		return !this.tooOldForMatch(id) && this.notInGame(id);
	}

	PlayingField.prototype.allIdlePlayers = function(){
		var self = this;
		return self.players.filter(function(player){
			return self.isReady(player.id);
		});
	}

	PlayingField.prototype.allPlayersInGame = function(){
		var self = this;
		return self.players.filter(function(player){
			return self.inGame(player.id);
		});
	}

	PlayingField.prototype.getPlayerIndexById = function(id){
		return utils.indexMatching(this.players, function(player){
			return player.id == id;
		});
	}

	PlayingField.prototype.getGameIndexByPlayerId = function(id){
		return indexMatching(this.pairs, function(pair){
			return id == pair.x.id || id == pair.o.id;
		});
	}

	PlayingField.prototype.getGameByActivePlayerId = function(id){
		return this.pairs.find(function(n){
			return id == n[n.state.nextMovePlayer].id
		});
	}

	PlayingField.prototype.getStateByActivePlayerId = function(id){
		return this.getGameByActivePlayerId(id).state;
	}

	PlayingField.prototype.availableToPlayAs = function(char){
		var self = this;
		return this.allIdlePlayers().filter(function(player){
			return player.prior[char] <= player.prior[(char == 'x') ? 'o' : 'x'];
		}).map(function(player){
			return player.id;
		}).filter(function(playerId){
			return self.isReady(playerId);
		})
	}

	//These all change things
	PlayingField.prototype.touchPlayer = function(id){
		var player = this.getPlayerById(id)
		player && player.age.touch();
	}


	//Int, Int => null;
	PlayingField.prototype.startGame = function(oneId, twoId){
		var playerOne = this.getPlayerById(oneId);
		var playerTwo = this.getPlayerById(twoId);
		if (playerOne && playerTwo){
			this.pairs.push({
				x: playerOne,
				o: playerTwo,
				state: new State()
			})
		}
	}

	PlayingField.prototype.endGameWithPlayer = function(id){
		var indexOfPair = this.getGameIndexByPlayerId(id);
		var deadGame = this.pairs.splice(indexOfPair, 1)[0];
		deadGame['x'].prior.x++;
		deadGame['o'].prior.o++;
		return deadGame;
	}

	//Only should be used with playerWins and playerLoses
	PlayingField.prototype.accountWins = function(playerId, winningFunc){
		if (this.inGame(playerId)){
			var deadGame = this.endGameWithPlayer(playerId);
			var winSide = winningFunc(deadGame, playerId);
			var losSide = winSide == 'x' ? 'o' : 'x';
			deadGame[winSide].wins++;
			deadGame[losSide].losses++;
		};
	}

	PlayingField.prototype.playerWins = function(playerId){
		this.accountWins(playerId, function(deadGame, otherId){
			return (deadGame.x.id == otherId) ? 'x' : 'o';
		});
	}

	PlayingField.prototype.playerLoses = function(playerId){
		this.accountWins(playerId, function(deadGame){
			return (deadGame.o.id == playerId) ? 'x' : 'o';
		})
	}

	PlayingField.prototype.isNewId = function(id){
		return this.players.every(function(player){
			return id != player.id;
		})
	}

	//Int, String => null
	PlayingField.prototype.addPlayer = function(id, name){
		if (id && name && this.isNewId(id)){
			this.players.push({
				id: id,
				name: name,
				age: new Age(),
				prior: {x: 0, o: 0},
				wins: 0,
				losses: 0,
				draws: 0,
			});
		}
	}

	//No side effects, not functional.
	PlayingField.prototype.canMove = function(id){
		var player = this.getPlayerById(id)
		return this.pairs.some(function(pair){
			var nextMovePlayer = pair.state.nextMovePlayer;
			return player == pair[nextMovePlayer];
		});
	}

	PlayingField.prototype.cullFromGames = function(){
		var self = this;
		this.allPlayersInGame().forEach(function(player){
			if(self.canMove(player.id) && self.tooOldForMatch(player.id)){
				self.playerLoses(player.id);
			}
		})
	}

	PlayingField.prototype.cullFromAll = function(){
		var self = this;
		this.players = this.players.filter(function(player){
			return !self.tooOldForAll(player.id)
		});
	}

	PlayingField.prototype.cull = function(){
		var self = this;
		this.cullFromGames();
		this.cullFromAll();
	}

	PlayingField.prototype.matchUp = function(){
		var self = this;
		var xs = shuffle(this.availableToPlayAs('x'));
		var os = shuffle(this.availableToPlayAs('o'));
		var numNewGames = Math.min(xs.length, os.length);
		for(var x = 0; x < numNewGames; x++){
			var firstPlayer = xs[x];
			var secondPlayer = os.find(function(n){
				return n != firstPlayer
			});
			if (secondPlayer && firstPlayer){
				this.startGame(firstPlayer, secondPlayer)
				xs = remove(xs, firstPlayer);
				xs = remove(xs, secondPlayer);
				os = remove(os, firstPlayer);
				os = remove(os, secondPlayer);
			}
		}
	}

	PlayingField.prototype.makeMove = function(id, move){
		this.touchPlayer(id);
		var move = parseInt(move);		

		//If we aren't in a position to make a move, we fail.
		if(!this.canMove(id)){
			return false;
		}

		//Grab new state.
		var newState = this.getStateByActivePlayerId(id).move(move)
		var localGame;
		for(var x = 0; x < this.pairs.length; x++){
			if (id == this.pairs[x].x.id || id == this.pairs[x].o.id){
				this.pairs[x].state = newState;
				localGame = this.pairs[x];
				break;}}

		if(newState.someoneWon()){
			var winSide = newState.winner();
			this.playerWins(localGame[winSide].id);}

		if(newState.isDraw()){
			var done = this.endGameWithPlayer(id);
			this.getPlayerById(done['x']).draws++;
			this.getPlayerById(done['o']).draws++;}

		return true;
	}

	if(typeof window == 'undefined'){
		module.exports = PlayingField;
	}else{
		set('PlayingField', PlayingField)
	}

})();