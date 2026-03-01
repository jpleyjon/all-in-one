/**
 * Multiplies two finite numbers and validates the result.
 *
 * @param a Left operand.
 * @param b Right operand.
 * @returns Multiplication result.
 * @throws {RangeError} If inputs or result are not finite.
 */
export function safeMultiply(a: number, b: number): number {
  if (!Number.isFinite(a)) {
    throw new RangeError('a must be a finite number.');
  }

  if (!Number.isFinite(b)) {
    throw new RangeError('b must be a finite number.');
  }

  const result = a * b;

  if (!Number.isFinite(result)) {
    throw new RangeError('result must be a finite number.');
  }

  return result;
}
