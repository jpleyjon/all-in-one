import type { TicTacToePlayer, TicTacToeState } from './types';

const WINNING_LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns the winning player when the board contains a winning line.
 *
 * @param state Current game state.
 * @returns Winning player or `null`.
 */
export function getTicTacToeWinner(state: TicTacToeState): TicTacToePlayer | null {
  for (const [left, middle, right] of WINNING_LINES) {
    const mark = state.board[left];

    if (mark !== null && mark === state.board[middle] && mark === state.board[right]) {
      return mark;
    }
  }

  return null;
}
