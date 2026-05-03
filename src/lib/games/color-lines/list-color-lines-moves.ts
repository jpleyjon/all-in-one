import { assertGridPosition } from '../shared/assert-grid-position';
import { findGridPath } from '../shared/find-grid-path';
import { indexToPosition } from '../shared/index-to-position';
import { positionToIndex } from '../shared/position-to-index';
import { isColorLinesGameOver } from './is-color-lines-game-over';
import type { ColorLinesPosition, ColorLinesState } from './types';

/**
 * Lists all reachable destinations for a selected source ball.
 *
 * @param state Current game state.
 * @param from Source position.
 * @returns Reachable empty positions in row-major order.
 */
export function listColorLinesMoves(
  state: ColorLinesState,
  from: ColorLinesPosition,
): ColorLinesPosition[] {
  assertGridPosition(from, state.config.rows, state.config.columns);

  if (isColorLinesGameOver(state)) {
    return [];
  }

  const fromIndex = positionToIndex(from, state.config.columns);

  if (typeof state.board[fromIndex] !== 'string') {
    return [];
  }

  return state.board
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell, index }) => cell === null && index !== fromIndex)
    .map(({ index }) => indexToPosition(index, state.config.columns))
    .filter(
      (to) =>
        findGridPath(
          state.board,
          state.config.rows,
          state.config.columns,
          from,
          to,
          (cell) => cell === null,
        ) !== null,
    );
}
