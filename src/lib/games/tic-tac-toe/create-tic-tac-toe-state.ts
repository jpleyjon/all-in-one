import type { TicTacToeState } from './types';

/**
 * Creates an empty tic-tac-toe game state.
 *
 * @returns Fresh game state with player `X` to move.
 */
export function createTicTacToeState(): TicTacToeState {
  return {
    board: new Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    status: 'in_progress',
    movesPlayed: 0,
  };
}
