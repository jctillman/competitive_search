// Inject the minimax function
// into the makeMove function.
module.exports = (minimaxWrapper) => (state) => {

    // "state" is an object with a few methods 
    //
	// Find whose move it is; 'x' or 'o'
	const playerMoving = state.nextMovePlayer;

	// state.legalMoves returns an array of integer values,
	// which indicate the locations (0 through 6)
	// where one can currently legally drop a piece.
	const allLegalMoves = state.legalMoves();

	// To get a successor state following a move,
	// just call state.move(someMove).  This returns
	// the board state after that move has been made.
	// It autmatically switches the player whose
	// move it is, adds the piece to the board, etc.
	//
	// Note that state is immutable; invoking state.move
    // returns new state without altering the old one.
    const someNewState = state.move(allLegalMoves[0]);

	// The following is the guts of the make-move function.
	// It evaluates each possible successor state with
	// minimax, and move that leads to the best
	let bestMoveIndex = null;
	let bestMoveValue = null;
	allLegalMoves.forEach( (legalMove, i) => {

		const potentialState = state.move(legalMove)

		// Sets the playerMoving to be the maximizer.
        // Should be handed down by minimax UNCHANGED
		const stateValue = minimaxWrapper(potentialState, playerMoving);

		if (stateValue > bestMoveValue || bestMoveValue === null){
			bestMoveIndex = i;
			bestMoveValue = stateValue;
		}

	});
	return allLegalMoves[bestMoveIndex]
}


