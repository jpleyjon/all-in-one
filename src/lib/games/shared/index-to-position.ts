import { isInteger } from '../../number/is-integer';
import type { GameGridPosition } from './types';

/**
 * Converts a flat array index into a row/column position.
 *
 * @param index Flat array index.
 * @param columns Total column count.
 * @returns Grid position.
 */
export function indexToPosition(index: number, columns: number): GameGridPosition {
  if (!isInteger(index) || index < 0) {
    throw new TypeError('index must be a non-negative integer.');
  }

  if (!isInteger(columns) || columns <= 0) {
    throw new TypeError('columns must be a positive integer.');
  }

  return {
    row: Math.trunc(index / columns),
    column: index % columns,
  };
}
