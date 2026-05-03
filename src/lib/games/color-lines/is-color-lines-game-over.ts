import type { ColorLinesState } from './types';

/**
 * Checks whether a Color Lines board has any empty cells left.
 *
 * @param state Current game state.
 * @returns `true` when the board is full.
 */
export function isColorLinesGameOver(state: ColorLinesState): boolean {
  return !state.board.includes(null);
}
