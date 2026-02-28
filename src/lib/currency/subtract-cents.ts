/**
 * Subtracts one cent amount from another.
 *
 * @param a Left amount in cents.
 * @param b Right amount in cents.
 * @returns Difference in cents.
 * @throws {RangeError} If inputs are not safe integers.
 */
export function subtractCents(a: number, b: number): number {
  if (!Number.isSafeInteger(a)) {
    throw new RangeError('a must be a safe integer.');
  }

  if (!Number.isSafeInteger(b)) {
    throw new RangeError('b must be a safe integer.');
  }

  const result = a - b;

  if (!Number.isSafeInteger(result)) {
    throw new RangeError('result is out of safe integer range.');
  }

  return result;
}
