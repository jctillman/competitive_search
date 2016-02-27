var expect = require('chai').expect;
var PF = require('../playingField.js');

var xor = function(a,b) {
		return ( a || b ) && !( a && b );
}

describe('All the tests for playing field', function(){

	describe('Basic functionality', function(){

		it('Lets you add a player', function(){
			var pf = new PF();
			pf.addPlayer(1212,'Bob');
			expect(pf.players.length == 1).to.equal(true)
			expect(pf.players[0].id == 1212).to.equal(true);
			expect(pf.pairs.length == 0).to.equal(true)
			pf.matchUp();
			expect(pf.pairs.length == 0).to.equal(true);
		});

		it('Doesnt add a player with anothers id', function(){
			var pf = new PF();
			pf.addPlayer(1212,'Bob');
			pf.addPlayer(1212,'Fred');
			expect(pf.players.length == 1).to.equal(true)
		});

		it('Lets you add two players', function(){
			var pf = new PF();
			pf.addPlayer(1212,'Bob');
			pf.addPlayer(1213,'Fred');
			expect(pf.players.length == 2).to.equal(true)
			expect(pf.players[0].id == 1212).to.equal(true);
			expect(pf.players[1].id == 1213).to.equal(true);
			expect(pf.pairs.length == 0).to.equal(true)
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
			pf.matchUp();
			expect(pf.pairs.length).to.equal(1);
			expect(pf.availableToPlayAs('x').length).to.equal(0)
			expect(pf.availableToPlayAs('o').length).to.equal(0)
			pf.matchUp();
			expect(pf.pairs.length).to.equal(1);
			pf.matchUp();
			expect(pf.pairs.length).to.equal(1);
		});

		it('Lets two players exchange moves in an intelligible fashion', function(){
			var xor = function(a,b) {
	  			return ( a || b ) && !( a && b );
			}
			var pf = new PF();
			pf.addPlayer(1212,'Bob');
			pf.addPlayer(1213,'Fred');
			pf.matchUp();
			expect(pf.availableToPlayAs('x').length).to.equal(0);
			expect(pf.availableToPlayAs('o').length).to.equal(0);
			expect(xor(pf.canMove(1212), pf.canMove(1213))).to.equal(true);
			if(pf.canMove(1212)){
				expect(pf.makeMove(1212, 0)).to.equal(true)
				expect(pf.makeMove(1212, 0)).to.equal(false)
				expect(pf.makeMove(1213, 0)).to.equal(true)
				expect(pf.makeMove(1213, 0)).to.equal(false)
			}else{
				expect(pf.makeMove(1213, 0)).to.equal(true)
				expect(pf.makeMove(1213, 0)).to.equal(false)
				expect(pf.makeMove(1212, 0)).to.equal(true)
				expect(pf.makeMove(1212, 0)).to.equal(false)
			}
		});

	it('Handles a win in an intelligible fashion', function(){

			var pf = new PF();
			pf.addPlayer(1212,'Bob');
			pf.addPlayer(1213,'Fred');
			pf.matchUp();
			expect(pf.availableToPlayAs('x').length).to.equal(0);
			expect(pf.availableToPlayAs('o').length).to.equal(0);
			expect(xor(pf.canMove(1212), pf.canMove(1213))).to.equal(true);
			if(pf.canMove(1212)){
				for(var x = 0; x < 3; x++){
					pf.makeMove(1212, 0, function(result){
						expect(result).to.equal('success')
					});
					pf.makeMove(1213, 1, function(result){
						expect(result).to.equal('success');
					});
				}
				pf.makeMove(1212, 0, function(result){
					expect(result).to.equal('success');
				})
				expect(pf.availableToPlayAs('x').length).to.equal(1);
				expect(pf.availableToPlayAs('o').length).to.equal(1);
				expect(pf.getPlayerById(1212).wins).to.equal(1)
				expect(pf.getPlayerById(1213).wins).to.equal(0)
				//expect(pf.leaderboard()[0].name).to.equal('Bob')
			}else{
				for(var x = 0; x < 3; x++){
					pf.makeMove(1213, 0, function(result){
						expect(result).to.equal('success')
					});
					pf.makeMove(1212, 1, function(result){
						expect(result).to.equal('success');
					});
				}
				pf.makeMove(1213, 0, function(result){
					expect(result).to.equal('success');
				})
				expect(pf.availableToPlayAs('x').length).to.equal(1);
				expect(pf.availableToPlayAs('o').length).to.equal(1);
				expect(pf.getPlayerById(1212).wins).to.equal(0)
				expect(pf.getPlayerById(1213).wins).to.equal(1)
				//expect(pf.leaderboard()[0].name).to.equal('Fred')
			}
		})

	});

	describe('More unit-like unit tests', function(){

		it('Gets players', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			var player = pf.getPlayerById(123)
			expect(player.prior.x).to.equal(0)
			expect(player.prior.o).to.equal(0)
			expect(player.wins).to.equal(0)
			expect(player.losses).to.equal(0)
			expect(player.draws).to.equal(0)
		});

		it('Detects in-gameness accurately', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			expect(pf.notInGame(123)).to.equal(true);
			expect(pf.inGame(123)).to.equal(false);
			pf.addPlayer(124,"Fred");
			expect(pf.notInGame(124)).to.equal(true);
			pf.matchUp();
			expect(pf.inGame(123)).to.equal(true);
			expect(pf.inGame(124)).to.equal(true);
			expect(pf.notInGame(124)).to.equal(false);
		});

		it('Detects being too old for match and all', function(done){
			var pf = new PF({
				removeFromMatch: 20,
				removeFromAll: 40
			});
			pf.addPlayer(123, "Bob")
			expect(pf.tooOldForMatch(123)).to.equal(false);
			expect(pf.tooOldForAll(123)).to.equal(false);
			setTimeout(function(){
				expect(pf.tooOldForMatch(123)).to.equal(true);
				expect(pf.tooOldForAll(123)).to.equal(false);
				setTimeout(function(){
					expect(pf.tooOldForAll(123)).to.equal(true);
					done();
				},20)
			},30)
		});

		it('Detects idleness accurately, and gets all idle players', function(done ){
			var pf = new PF({
				removeFromMatch: 20
			});
			pf.addPlayer(123, "Bob")
			expect(pf.isReady(123)).to.equal(true);
			expect(pf.allIdlePlayers().length).to.equal(1)
			setTimeout(function(){
				expect(pf.isReady(123)).to.equal(false);
				expect(pf.allIdlePlayers().length).to.equal(0)
				done();
			},30)
		});

		it('Can get the index of a player', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			pf.addPlayer(124, "Fred");
			expect(pf.getPlayerIndexById(123)).to.equal(0)
			expect(pf.getPlayerIndexById(124)).to.equal(1)
		});

		it('Can get the game index by player id', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			pf.addPlayer(125, "Sarah")
			pf.addPlayer(126, "Rachel");
			pf.matchUp();
			expect(pf.getGameIndexByPlayerId(123)).to.equal(0)
			expect(pf.getGameIndexByPlayerId(124)).to.equal(0)
			expect(pf.getGameIndexByPlayerId(125)).to.equal(1)
			expect(pf.getGameIndexByPlayerId(126)).to.equal(1)
		} );

		it('Can get the game by active player id', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			var byOne = pf.getGameByActivePlayerId(123)
			var byTwo = pf.getGameByActivePlayerId(124)
			expect(xor(byOne,byTwo)).to.equal(true)
		});

		it('Can get state by active player id', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			var byOne = pf.getGameByActivePlayerId(123)
			var byTwo = pf.getGameByActivePlayerId(124)
			expect(xor(byOne,byTwo)).to.equal(true)
		});

		it('Can detect when you are able to play as', function(done){
			var pf = new PF({
				removeFromMatch: 20
			});
			expect(pf.availableToPlayAs('x').length).to.equal(0)
			expect(pf.availableToPlayAs('x').length).to.equal(0)
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
			pf.matchUp();
			expect(pf.availableToPlayAs('x').length).to.equal(0)
			expect(pf.availableToPlayAs('o').length).to.equal(0)
			pf.addPlayer(125, "Bob");
			pf.addPlayer(126, "Fred");
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
			setTimeout(function(){
				expect(pf.availableToPlayAs('x').length).to.equal(0)
				expect(pf.availableToPlayAs('o').length).to.equal(0)
				done();
			},40);
		});

		it('Lets you touch players', function(done){
			var pf = new PF({
				removeFromMatch: 20
			});
			pf.addPlayer(123, "Bob");
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			setTimeout(function(){
				expect(pf.availableToPlayAs('x').length).to.equal(0)
				pf.touchPlayer(123);
				expect(pf.availableToPlayAs('x').length).to.equal(1)
				done();
			},40)
		});

		it('Lets you start and end games with players', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.startGame(123,124)
			expect(pf.availableToPlayAs('x').length).to.equal(0)
			expect(pf.availableToPlayAs('o').length).to.equal(0)
			pf.endGameWithPlayer(123)
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
		});

		it('Lets you win a game with players', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			pf.playerWins(123);
			var player = pf.getPlayerById(123);
			var playerTwo = pf.getPlayerById(124);
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
			expect(player.wins).to.equal(1)
			expect(player.losses).to.equal(0)
			expect(playerTwo.losses).to.equal(1)
			expect(playerTwo.wins).to.equal(0)
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
		});

		it('Lets you lose a game with players', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			pf.playerLoses(124);
			var player = pf.getPlayerById(123);
			var playerTwo = pf.getPlayerById(124);
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
			expect(player.wins).to.equal(1)
			expect(player.losses).to.equal(0)
			expect(playerTwo.losses).to.equal(1)
			expect(playerTwo.wins).to.equal(0)
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
		});

		it("Lets no pushing of player under bad circum.", function(){
			var pf = new PF();
			pf.addPlayer(123);
			expect(pf.players.length).to.equal(0)
			pf.addPlayer(123, "Bob");
			pf.addPlayer(123, "Bob");
			expect(pf.players.length).to.equal(1)
		})

		it('Implicitly already tested matchUp a bunch', function(){
			//ok.
		})

		it('Detects being able to move accurately', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			expect(pf.canMove(123)).to.equal(false);
			pf.addPlayer(124,"Fred");
			expect(pf.canMove(124)).to.equal(false);
			pf.matchUp();
			expect(xor(pf.canMove(123), pf.canMove(124))).to.equal(true);
		})

		it('Gets players.', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			expect(pf.getPlayerById(123).name).to.equal("Bob")
			expect(pf.getPlayerById(123).id).to.equal(123)
			expect(pf.getPlayerById(123).losses).to.equal(0)
			expect(pf.getPlayerById(123).wins).to.equal(0)
			expect(pf.getPlayerById(123).draws).to.equal(0)
		});

		it('Gets players who are available.', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
			pf.addPlayer(1234, "Bob")
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
			pf.addPlayer(12345, "Bob")
			expect(pf.availableToPlayAs('x').length).to.equal(3)
			expect(pf.availableToPlayAs('o').length).to.equal(3)
			pf.matchUp();
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
			pf.endGameWithPlayer(123);
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
		});

		it('Removes games with players successfully.', function(){
			var pf = new PF();
			pf.addPlayer(123, "Bob")
			expect(pf.availableToPlayAs('x').length).to.equal(1)
			expect(pf.availableToPlayAs('o').length).to.equal(1)
			pf.addPlayer(1234, "Bob")
			expect(pf.availableToPlayAs('x').length).to.equal(2)
			expect(pf.availableToPlayAs('o').length).to.equal(2)
			pf.matchUp();
			pf.endGameWithPlayer(123);
			expect(pf.availableToPlayAs('x').length).to.equal(1);
			expect(pf.availableToPlayAs('o').length).to.equal(1);
			expect(pf.getPlayerById(123).prior.x+pf.getPlayerById(123).prior.o).to.equal(1)
			expect(pf.getPlayerById(1234).prior.x+pf.getPlayerById(1234).prior.o).to.equal(1)
		});

	});

	describe('Actually a new set of tests I wrote later', function(){

		it('Removes someone from a game after an elapsed period of time', function(done){
			var pf = new PF({
				removeFromAll: 1500,
				removeFromMatch: 75,
			});
			pf.addPlayer(123, "Bob")
			pf.addPlayer(124, "Fred")
			pf.matchUp();
			if(pf.canMove(123)){
				setTimeout(function(){
					pf.cull();
					pf.makeMove(123,0)
					setTimeout(function(){
						pf.cull();
						expect(pf.availableToPlayAs('o').length).to.equal(1)
						pf.touchPlayer(123);
						pf.touchPlayer(124);
						expect(pf.availableToPlayAs('x').length).to.equal(1)
						expect(pf.availableToPlayAs('o').length).to.equal(1)
						expect(pf.getPlayerById(123).wins).to.equal(1)
						expect(pf.getPlayerById(123).losses).to.equal(0)
						expect(pf.getPlayerById(124).losses).to.equal(1)
						expect(pf.getPlayerById(124).wins).to.equal(0)
						done();
					},50)
				},50);
			}else{
				setTimeout(function(){
					pf.cull();
					pf.makeMove(124,0)
					setTimeout(function(){
						pf.cull();
						expect(pf.availableToPlayAs('o').length).to.equal(1)
						pf.touchPlayer(123);
						pf.touchPlayer(124);
						expect(pf.availableToPlayAs('x').length).to.equal(1)
						expect(pf.availableToPlayAs('o').length).to.equal(1)
						expect(pf.getPlayerById(124).wins).to.equal(1)
						expect(pf.getPlayerById(124).losses).to.equal(0)
						expect(pf.getPlayerById(123).losses).to.equal(1)
						expect(pf.getPlayerById(123).wins).to.equal(0)
						done();
					}, 50)
				}, 50)
			}
		})


		it('Removes someone from memory after an elapsed period of time', function(done){
			var pf = new PF({
				removeFromMatch: 50,
				removeFromAll: 70
			});
			pf.addPlayer(123, "Bob")
			setTimeout(function(){
				expect(pf.players.length).to.equal(1);
				pf.cull()
				expect(pf.players.length).to.equal(0);
				pf.addPlayer(123, "Leroy")
				expect(pf.players.length).to.equal(1);
				done();
			}, 75)
		});

		it("Doesn't match you with people who have been idle for too long", function(done){
			var pf = new PF({
				removeFromMatch: 10
			});
			pf.addPlayer(123, 'Fred');
			setTimeout(function(){
				pf.cull();
				expect(pf.availableToPlayAs('x').length).to.equal(0)
				expect(pf.availableToPlayAs('o').length).to.equal(0)
				pf.addPlayer(132, 'Fred')
				pf.matchUp();
				expect(pf.pairs.length).to.equal(0);
				expect(pf.availableToPlayAs('x').length).to.equal(1)
				expect(pf.availableToPlayAs('o').length).to.equal(1)
				pf.touchPlayer(123);
				expect(pf.availableToPlayAs('x').length).to.equal(2)
				expect(pf.availableToPlayAs('o').length).to.equal(2)
				pf.matchUp();
				expect(pf.availableToPlayAs('x').length).to.equal(0)
				expect(pf.availableToPlayAs('o').length).to.equal(0)
				done()
			}, 20)
		});

		it("Drops you from a game if you take too long, lets you rejoin, tracks wins.", function(done){
			var pf = new PF({
				removeFromMatch: 50,
				removeFromAll: 100
			});
			pf.addPlayer(123, "Bob");
			pf.addPlayer(124, "Fred");
			pf.matchUp();
			var first = pf.canMove(123) ? 123 : 124;
			var second = first == 123 ? 124 : 123;
			pf.matchUp();
			setTimeout(function(){
				pf.makeMove(first, 0);
				setTimeout(function(){
					pf.cull();
					expect(pf.getPlayerById(first).wins).to.equal(1);
					expect(pf.getPlayerById(second).losses).to.equal(1);
					expect(pf.availableToPlayAs('x').length+pf.availableToPlayAs('o').length).to.equal(1)
					pf.touchPlayer(second);
					expect(pf.availableToPlayAs('x').length).to.equal(1);
					expect(pf.availableToPlayAs('o').length).to.equal(1);
					pf.matchUp();
					expect(pf.availableToPlayAs('x').length).to.equal(0);
					expect(pf.availableToPlayAs('o').length).to.equal(0);
					done();
				},30);
			}, 30)
		});
	});
});