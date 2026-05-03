import { inRange } from '../../number/in-range';
import { isInteger } from '../../number/is-integer';
import type { GameGridPosition } from './types';

/**
 * Validates a grid position against board dimensions.
 *
 * @param position Position to validate.
 * @param rows Total row count.
 * @param columns Total column count.
 * @throws {TypeError} If the position or dimensions are malformed.
 * @throws {RangeError} If the position is outside the board.
 */
export function assertGridPosition(
  position: GameGridPosition,
  rows: number,
  columns: number,
): void {
  if (!isInteger(rows) || rows <= 0) {
    throw new TypeError('rows must be a positive integer.');
  }

  if (!isInteger(columns) || columns <= 0) {
    throw new TypeError('columns must be a positive integer.');
  }

  if (typeof position !== 'object' || position === null) {
    throw new TypeError('position must be an object.');
  }

  if (!('row' in position) || !('column' in position)) {
    throw new TypeError('position must include row and column.');
  }

  if (!isInteger(position.row)) {
    throw new TypeError('position.row must be an integer.');
  }

  if (!isInteger(position.column)) {
    throw new TypeError('position.column must be an integer.');
  }

  if (!inRange(position.row, 0, rows - 1)) {
    throw new RangeError(`position.row must be between 0 and ${rows - 1}.`);
  }

  if (!inRange(position.column, 0, columns - 1)) {
    throw new RangeError(`position.column must be between 0 and ${columns - 1}.`);
  }
}
