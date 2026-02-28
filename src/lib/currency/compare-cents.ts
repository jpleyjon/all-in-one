/**
 * Compares two cent amounts.
 *
 * @param a Left amount in cents.
 * @param b Right amount in cents.
 * @returns -1 when a < b, 1 when a > b, 0 when equal.
 * @throws {RangeError} If inputs are not safe integers.
 */
export function compareCents(a: number, b: number): -1 | 0 | 1 {
  if (!Number.isSafeInteger(a)) {
    throw new RangeError('a must be a safe integer.');
  }

  if (!Number.isSafeInteger(b)) {
    throw new RangeError('b must be a safe integer.');
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}
