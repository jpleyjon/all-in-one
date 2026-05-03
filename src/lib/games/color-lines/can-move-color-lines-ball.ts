import { assertGridPosition } from '../shared/assert-grid-position';
import { findGridPath } from '../shared/find-grid-path';
import { positionToIndex } from '../shared/position-to-index';
import { isColorLinesGameOver } from './is-color-lines-game-over';
import type { ColorLinesPosition, ColorLinesState } from './types';

/**
 * Checks whether a ball can move from one cell to another.
 *
 * @param state Current game state.
 * @param from Source position.
 * @param to Destination position.
 * @returns `true` when the move is legal.
 */
export function canMoveColorLinesBall(
  state: ColorLinesState,
  from: ColorLinesPosition,
  to: ColorLinesPosition,
): boolean {
  assertGridPosition(from, state.config.rows, state.config.columns);
  assertGridPosition(to, state.config.rows, state.config.columns);

  if (isColorLinesGameOver(state)) {
    return false;
  }

  const fromIndex = positionToIndex(from, state.config.columns);
  const toIndex = positionToIndex(to, state.config.columns);

  if (fromIndex === toIndex) {
    return false;
  }

  if (typeof state.board[fromIndex] !== 'string') {
    return false;
  }

  if (state.board[toIndex] !== null) {
    return false;
  }

  return (
    findGridPath(
      state.board,
      state.config.rows,
      state.config.columns,
      from,
      to,
      (cell) => cell === null,
    ) !== null
  );
}
