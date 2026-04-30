import { isTicTacToeGameOver } from './is-tic-tac-toe-game-over';
import type { TicTacToePosition, TicTacToeState } from './types';

/**
 * Lists all currently available moves.
 *
 * @param state Current game state.
 * @returns Empty board positions in row-major order.
 */
export function listTicTacToeMoves(state: TicTacToeState): TicTacToePosition[] {
  if (isTicTacToeGameOver(state)) {
    return [];
  }

  const positions: TicTacToePosition[] = [];

  state.board.forEach((cell, index) => {
    if (cell !== null) {
      return;
    }

    positions.push({
      row: Math.trunc(index / 3),
      column: index % 3,
    });
  });

  return positions;
}
