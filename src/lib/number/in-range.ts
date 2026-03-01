/**
 * Checks whether a number is within a range.
 *
 * @param value Number to check.
 * @param min Lower bound.
 * @param max Upper bound.
 * @param inclusive Whether range boundaries are inclusive.
 * @returns `true` when the value is inside the range.
 * @throws {RangeError} If values are not finite or `min` is greater than `max`.
 * @throws {TypeError} If `inclusive` is not a boolean.
 */
export function inRange(value: number, min: number, max: number, inclusive = true): boolean {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(min)) {
    throw new RangeError('min must be a finite number.');
  }

  if (!Number.isFinite(max)) {
    throw new RangeError('max must be a finite number.');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max.');
  }

  if (typeof inclusive !== 'boolean') {
    throw new TypeError('inclusive must be a boolean.');
  }

  return inclusive ? value >= min && value <= max : value > min && value < max;
}
