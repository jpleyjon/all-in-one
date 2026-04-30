import { getTicTacToeStatus } from './get-tic-tac-toe-status';
import type { TicTacToeState } from './types';

/**
 * Checks whether a tic-tac-toe game has finished.
 *
 * @param state Current game state.
 * @returns `true` when the game is no longer in progress.
 */
export function isTicTacToeGameOver(state: TicTacToeState): boolean {
  return getTicTacToeStatus(state) !== 'in_progress';
}
