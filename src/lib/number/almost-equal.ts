/**
 * Checks whether two numbers are within an epsilon distance.
 *
 * @param a Left value.
 * @param b Right value.
 * @param epsilon Allowed absolute difference.
 * @returns `true` when numbers are approximately equal.
 * @throws {RangeError} If any value is invalid.
 */
export function almostEqual(a: number, b: number, epsilon = Number.EPSILON): boolean {
  if (!Number.isFinite(a)) {
    throw new RangeError('a must be a finite number.');
  }

  if (!Number.isFinite(b)) {
    throw new RangeError('b must be a finite number.');
  }

  if (!Number.isFinite(epsilon) || epsilon < 0) {
    throw new RangeError('epsilon must be a non-negative finite number.');
  }

  return Math.abs(a - b) <= epsilon;
}
