/**
 * Checks whether a finite integer is even.
 *
 * @param value Number to evaluate.
 * @returns `true` for even integers.
 * @throws {RangeError} If `value` is not finite.
 */
export function isEven(value: number): boolean {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  return Number.isInteger(value) && value % 2 === 0;
}
