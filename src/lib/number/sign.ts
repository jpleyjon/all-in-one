/**
 * Returns the sign of a finite number.
 *
 * @param value Input number.
 * @returns `-1` for negatives, `1` for positives, and `0` for zero values.
 * @throws {RangeError} If `value` is not finite.
 */
export function sign(value: number): -1 | 0 | 1 {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (value === 0) {
    return 0;
  }

  return value > 0 ? 1 : -1;
}
