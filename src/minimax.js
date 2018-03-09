//
// MINIMAX.JS
// 
// Only file you need to modify to pass
// all tests.

// This is the actual point-of-entry.
// The game-playing functions call 
// "minimaxWrapper", and expect to get
// back a number evaluating how good a state is.

const DEPTH = 3;
const minimaxWrapper = (state, maximizingPlayer) =>
    minimax(state, DEPTH, maximizingPlayer);

// For the above to work, obviously we want
// to write minimax.  The following will guide
// you through the components of that.



/*
HEURISTIC FUNCTION

The "heuristic" function is pre-written.
Spend a little time to understand it.
You will need to unvoke it in "minimax" during
the base case.

Input: state, maximizingPlayer.

The state will be a state object.

The maximizingPlayer will be either an 'x' or an
'o', and is the player whose advantage
is signified by positive numbers.

Output: A number evaluating how good the state is from
the perspective of the player who is maximizing.
*/
const heuristic = (state, maximizingPlayer) => {

	//This is how you can retrieve the minimizing player.
    const minimizingPlayer = (maximizingPlayer == 'x') ? 'o' : 'x';

    // state.numLines(number, player) gives you the number
    // of lines of length "number" for that player.
    //
    // So for instance, for a state like this
    // _ _ _ _ _ _ _
    // _ _ _ _ _ _ _
    // _ _ _ _ x _ o
    // _ _ _ x o _ x
    // _ _ o x o _ x
    //
    // state.numLines(2,'o') would return 1
    // state.numLines(2,'x') would return 3
    //
    // The following function, sums up the number of lines
    // of lengths 2, 3, and 4, weighted very strongly according
    // to their length.
    const advantageFunction = player => [2,3,4].reduce((total, numLines) =>
        total + state.numLines(numLines, player) * Math.pow(100, numLines), 0);

    // Then for the heuristic, we just return the advantage of one player,
    // less the advantage of another.
    return advantageFunction(maximizingPlayer) - advantageFunction(minimizingPlayer);
}

/*
You must write the function "baseCase."

Minimax is recursive.  When do we stop
recursing or not?  

This takes a state, and a depth, and returns
true if you have reacted a depth of zero
or the state has no successor states.  It
returns false otherwise.
*/
const isBaseCase = (state, depth) => {
    const possibleStates = state.nextStates();
    // Your code here.
}

/*
You must write the function "minimax".

Input: state, depth, maximizingPlayer.

The state is an instance of a state object.

The depth is an integer greater than zero;
when it is zero, the minimax function should
return the value of the heuristic function.

Output: Returns a number evaluating the state, just
like heuristic does.

*/
const minimax = (state, depth, maximizingPlayer) => {
    if (isBaseCase(state, depth)) {
        // Invoke heuristic
    } else {
        const possibleStates = state.nextStates();
        // Reduce further
    }
}


const minimaxAlphaBeta = (state, depth, maximizingPlayer) => {

	const minimaxAlphaBetaInner = (state, depth, alpha, beta) => {
        
        if (isBaseCase(state, depth)) {
            // Invoke heuristic
        } else {
            // Reduce further.
        }
	}

	return minimaxAlphaBetaInner(state, depth, -100000,100000);
}

module.exports = {
    minimaxWrapper,
    minimax,
    minimaxAlphaBeta,
    isBaseCase,
    heuristic
};
