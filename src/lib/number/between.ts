/**
 * Checks whether a value lies between two bounds, regardless of bound order.
 *
 * @param value Value to evaluate.
 * @param a First bound.
 * @param b Second bound.
 * @param inclusive Whether boundaries are inclusive.
 * @returns `true` when value is within the interval.
 * @throws {RangeError} If numeric inputs are invalid.
 * @throws {TypeError} If `inclusive` is not a boolean.
 */
export function between(value: number, a: number, b: number, inclusive = true): boolean {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(a)) {
    throw new RangeError('a must be a finite number.');
  }

  if (!Number.isFinite(b)) {
    throw new RangeError('b must be a finite number.');
  }

  if (typeof inclusive !== 'boolean') {
    throw new TypeError('inclusive must be a boolean.');
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return inclusive ? value >= lower && value <= upper : value > lower && value < upper;
}
