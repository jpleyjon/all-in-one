import { assertGridPosition } from './assert-grid-position';
import type { GameGridPosition } from './types';

/**
 * Returns orthogonally adjacent positions within board bounds.
 *
 * @param position Center position.
 * @param rows Total row count.
 * @param columns Total column count.
 * @returns Adjacent positions inside the board.
 */
export function getOrthogonalNeighbors(
  position: GameGridPosition,
  rows: number,
  columns: number,
): GameGridPosition[] {
  assertGridPosition(position, rows, columns);

  const neighbors: GameGridPosition[] = [];

  if (position.row > 0) {
    neighbors.push({ row: position.row - 1, column: position.column });
  }

  if (position.row < rows - 1) {
    neighbors.push({ row: position.row + 1, column: position.column });
  }

  if (position.column > 0) {
    neighbors.push({ row: position.row, column: position.column - 1 });
  }

  if (position.column < columns - 1) {
    neighbors.push({ row: position.row, column: position.column + 1 });
  }

  return neighbors;
}
