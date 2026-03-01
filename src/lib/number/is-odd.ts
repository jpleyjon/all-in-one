/**
 * Checks whether a finite integer is odd.
 *
 * @param value Number to evaluate.
 * @returns `true` for odd integers.
 * @throws {RangeError} If `value` is not finite.
 */
export function isOdd(value: number): boolean {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  return Number.isInteger(value) && Math.abs(value % 2) === 1;
}
