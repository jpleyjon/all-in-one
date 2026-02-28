/**
 * Computes percentage that partCents represents of totalCents.
 *
 * @param partCents Partial amount in cents.
 * @param totalCents Total amount in cents.
 * @param precision Decimal places for output.
 * @returns Percentage value (0-100+ depending on input).
 * @throws {RangeError} If inputs are invalid.
 */
export function percentageOfTotal(partCents: number, totalCents: number, precision = 2): number {
  if (!Number.isSafeInteger(partCents)) {
    throw new RangeError('partCents must be a safe integer.');
  }

  if (!Number.isSafeInteger(totalCents)) {
    throw new RangeError('totalCents must be a safe integer.');
  }

  if (totalCents === 0) {
    throw new RangeError('totalCents must not be 0.');
  }

  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError('precision must be a non-negative integer.');
  }

  const factor = 10 ** precision;
  const value = Math.round(((partCents / totalCents) * 100 + Number.EPSILON) * factor) / factor;

  return Object.is(value, -0) ? 0 : value;
}
