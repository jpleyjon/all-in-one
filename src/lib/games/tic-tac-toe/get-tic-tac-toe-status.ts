import { getTicTacToeWinner } from './get-tic-tac-toe-winner';
import type { TicTacToeState, TicTacToeStatus } from './types';

/**
 * Returns the current game status.
 *
 * @param state Current game state.
 * @returns Current tic-tac-toe status.
 */
export function getTicTacToeStatus(state: TicTacToeState): TicTacToeStatus {
  if (getTicTacToeWinner(state) !== null) {
    return 'won';
  }

  if (state.movesPlayed === 9) {
    return 'draw';
  }

  return 'in_progress';
}
