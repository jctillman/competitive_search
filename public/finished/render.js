(function(){

	var red = '#FF9999'
	var blue = '#9999FF'

	var render = function(state, element, canMove, cb, thisPlayer){

		//Get rid of all current children in the element.
		//This is a common pattern for me, I note. 
		//I should build an engine to do this.
		while(element.childNodes.length){
			element.removeChild(element.childNodes[0])
		}

		var top = document.createElement('table');
		var board = state.board;

		var head = document.createElement('tr');
		for(var x = 0; x < board[0].length; x++){
			var cell = document.createElement('th');
			cell.innerHTML = "(drop)";
			cell.onclick = (function(){
				if(canMove){
					var moveSpot = x;
					return function(){
						cb(moveSpot)
					}
				}
			})();
			head.appendChild(cell)
		}
		top.appendChild(head);

		for(var y = 0; y < board.length; y++){
			var row = document.createElement('tr');
			for(var x = 0; x < board[0].length; x++){
				var cell = document.createElement('td');
				if (board[y][x] != 0){
					cell.style.backgroundColor = (board[y][x] == 'x') ? 'red' : 'blue';
				}

				row.appendChild(cell)
			}
			top.appendChild(row);
		}
		element.appendChild(top);

		var bottom = document.createElement('div')
		var color = (state.nextMovePlayer == 'x') ? red : blue ;
		var colorName = (state.nextMovePlayer == 'x') ? 'red' : 'blue'
		bottom.style.backgroundColor = color;
		bottom.innerHTML = "It is the turn of " + state.nextMovePlayer + ", or " + colorName + "."
		bottom.style.width = '100%'
		element.appendChild(bottom)

		var player = document.createElement('div');
		var color = (thisPlayer == 'x') ? red : blue ;
		var colorName = (thisPlayer == 'x') ? 'red' : 'blue'
		player.style.backgroundColor = color;
		player.innerHTML = "You are playing as " + thisPlayer + ", or " + colorName + "."
		player.style.width = '100%'
		element.appendChild(player)


	}
	
	set('render', render);		

})();