/*
 * MINIMAX.JS
 *
 * This is the only file you need
 * to modify to pass the tests.
 *
 * Note that you should read
 * the pre-written functions.
 * 
 * Contents:
 * 1. minimaxWrapper:   Pre-written
 * 2. heuristic:        Pre-written
 * 3. baseCase:         Must complete
 * 4. minimax:          Must complete
 * 5. minimaxAlphaBeta: Must complete
 */

/*
 * minimaxWrapper
 *
 * This is the only function called when
 * playing against your algorithm.
 *
 * To switch from playing against the
 * 'minimax' to 'minimaxAlphaBeta'
 * algorithm, swap the function
 * called below.
 */
const DEPTH = 4;
const minimaxWrapper = (state, maximizingPlayer) =>
    minimaxAlphaBeta(state, DEPTH, maximizingPlayer);

/*
 * heuristic
 *
 * The 'heuristic' function returns a number
 * evaluating how good a state is, from the
 * perspective of the maximizing player.
 * You will need to invoke it in minimax.
 * Spend a little time trying to understand
 * it.
 *
 * Input:
 *  state: Object representing state.
 *  maximizingPlayer: 'x' or 'o'.
 * Output:
 *  Number evaluating how good state is,
 *  from perspective of maximizing
 *  player. Positive, if to the advantage
 *  of the maximizing player; negative,
 *  if to their disadvantage.
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
        total + state.numLines(numLines, player) * Math.pow(numLines, 10), 0);

    // Then for the heuristic, we just return the advantage
    // of the maximizing player, less the advantage of the
    // minimizing player.
    return advantageFunction(maximizingPlayer) - advantageFunction(minimizingPlayer);
}

/*
 * isBaseCase
 *
 * Should return true if we should no
 * longer recurse through minimax. So
 * if you have reached a depth of zero or
 * there are no possible successor states,
 * it should return true.
 *
 * ANY INFORMATION YOU NEED from
 * the "state" object is already pulled
 * from it.
 *
 */
const isBaseCase = (state, depth) => {
    const possibleSuccessorStates = state.nextStates();
    const numberPossibleSuccessorStates = possibleSuccessorStates.length;
    return depth === 0 || numberPossibleSuccessorStates === 0;
}

/*
 * minimax
 *
 * Input:
 *   state: Object representing state
 *   depth: How much deeper one should recurse
 *   maximizingPlayer: 'x' or 'o'
 * Output:
 *   Number evaluating state, just like
 *   heuristic does.
 */
const minimax = (state, depth, maximizingPlayer) => {
    if (isBaseCase(state, depth)) {
        return heuristic(state, maximizingPlayer);
    } else {
        const possibleStates = state.nextStates();
        const minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
        const currentPlayer = state.nextMovePlayer;

        const nextValues = possibleStates.map(s =>
            minimax(s, depth - 1, maximizingPlayer));

        const fnc = currentPlayer === maximizingPlayer ? Math.max : Math.min

        return fnc.apply(null, nextValues);
    }
}


/*
 * minimaxAlphaBeta
 *
 * Input and output are same as for minimax.
 */
const minimaxAlphaBeta = (state, depth, maximizingPlayer) => {

	const minimaxAlphaBetaInner = (state, depth, alpha, beta) => {
        
        if (isBaseCase(state, depth)) {
            return heuristic(state, maximizingPlayer);
        } else {

            const possibleStates = state.nextStates();
            const minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
            const currentPlayer = state.nextMovePlayer;

            if (currentPlayer === maximizingPlayer) {
                let currentValue = -10000000;
                for (let x = 0; x < possibleStates.length; x++) {
                    const value = minimaxAlphaBetaInner(possibleStates[x], depth - 1, alpha, beta);
                    alpha = Math.max(alpha, value);
                    currentValue = Math.max(currentValue, value);
                    if (alpha > beta) {
                        return alpha;
                    }
                }
                return currentValue;
            } else {
                let currentValue = 10000000;
                for (let x = 0; x < possibleStates.length; x++) {
                    const value = minimaxAlphaBetaInner(possibleStates[x], depth - 1, alpha, beta);
                    beta = Math.min(beta, value);
                    currentValue = Math.min(currentValue, value);
                    if (alpha > beta) {
                        return beta;
                    }
                }
                return currentValue;
            }

        }
	}

	return minimaxAlphaBetaInner(state, depth, -1000000000, 1000000000);
}

module.exports = {
    minimaxWrapper,
    minimax,
    minimaxAlphaBeta,
    isBaseCase,
    heuristic
};
