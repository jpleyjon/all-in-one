/**
 * Divides two numbers with zero-denominator fallback.
 *
 * @param numerator Dividend.
 * @param denominator Divisor.
 * @param fallback Returned when denominator is zero.
 * @returns Division result or `fallback`.
 * @throws {RangeError} If values are not finite numbers.
 */
export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  if (!Number.isFinite(numerator)) {
    throw new RangeError('numerator must be a finite number.');
  }

  if (!Number.isFinite(denominator)) {
    throw new RangeError('denominator must be a finite number.');
  }

  if (!Number.isFinite(fallback)) {
    throw new RangeError('fallback must be a finite number.');
  }

  if (denominator === 0) {
    return fallback;
  }

  return numerator / denominator;
}
