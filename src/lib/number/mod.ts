/**
 * Computes mathematical modulo with non-negative result.
 *
 * @param value Dividend.
 * @param divisor Divisor.
 * @returns Non-negative modulo result.
 * @throws {RangeError} If inputs are invalid.
 */
export function mod(value: number, divisor: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(divisor) || divisor === 0) {
    throw new RangeError('divisor must be a non-zero finite number.');
  }

  const base = Math.abs(divisor);
  const result = ((value % base) + base) % base;
  return result === 0 ? 0 : result;
}
