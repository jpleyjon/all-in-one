import { isInteger } from '../../number/is-integer';
import type { GameGridPosition } from './types';

/**
 * Converts a row/column position into a flat array index.
 *
 * @param position Grid position.
 * @param columns Total column count.
 * @returns Flat array index.
 */
export function positionToIndex(position: GameGridPosition, columns: number): number {
  if (!isInteger(columns) || columns <= 0) {
    throw new TypeError('columns must be a positive integer.');
  }

  return position.row * columns + position.column;
}
