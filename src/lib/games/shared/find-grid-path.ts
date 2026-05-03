import { assertGridPosition } from './assert-grid-position';
import { getOrthogonalNeighbors } from './get-orthogonal-neighbors';
import { indexToPosition } from './index-to-position';
import { positionToIndex } from './position-to-index';
import type { GameGridPosition } from './types';

/**
 * Finds a shortest orthogonal path through traversable cells.
 *
 * @param board Flat board representation.
 * @param rows Total row count.
 * @param columns Total column count.
 * @param from Source position.
 * @param to Destination position.
 * @param canTraverse Predicate for traversable cells.
 * @returns Path including source and destination, or `null` when unreachable.
 */
export function findGridPath<T>(
  board: readonly T[],
  rows: number,
  columns: number,
  from: GameGridPosition,
  to: GameGridPosition,
  canTraverse: (cell: T | undefined, index: number) => boolean,
): GameGridPosition[] | null {
  assertGridPosition(from, rows, columns);
  assertGridPosition(to, rows, columns);

  if (typeof canTraverse !== 'function') {
    throw new TypeError('canTraverse must be a function.');
  }

  const fromIndex = positionToIndex(from, columns);
  const toIndex = positionToIndex(to, columns);

  if (fromIndex === toIndex) {
    return [from];
  }

  const queue = [fromIndex];
  const visited = new Set<number>([fromIndex]);
  const previous = new Map<number, number>();

  while (queue.length > 0) {
    const currentIndex = queue.shift() as number;
    const currentPosition = indexToPosition(currentIndex, columns);

    for (const neighbor of getOrthogonalNeighbors(currentPosition, rows, columns)) {
      const neighborIndex = positionToIndex(neighbor, columns);

      if (visited.has(neighborIndex)) {
        continue;
      }

      if (!canTraverse(board[neighborIndex], neighborIndex)) {
        continue;
      }

      visited.add(neighborIndex);
      previous.set(neighborIndex, currentIndex);

      if (neighborIndex === toIndex) {
        const pathIndexes = [toIndex];
        let cursor = currentIndex;

        while (cursor !== fromIndex) {
          pathIndexes.push(cursor);
          cursor = previous.get(cursor) as number;
        }

        pathIndexes.push(fromIndex);
        pathIndexes.reverse();

        return pathIndexes.map((index) => indexToPosition(index, columns));
      }

      queue.push(neighborIndex);
    }
  }

  return null;
}
