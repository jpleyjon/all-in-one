import { roundTo } from './round-to';

/**
 * Computes the percentage that `part` represents of `total`.
 *
 * @param part Portion value.
 * @param total Total value.
 * @param precision Decimal precision in the resulting percentage.
 * @returns Percentage value.
 * @throws {RangeError} If inputs are invalid or `total` is zero.
 */
export function percent(part: number, total: number, precision = 2): number {
  if (!Number.isFinite(part)) {
    throw new RangeError('part must be a finite number.');
  }

  if (!Number.isFinite(total)) {
    throw new RangeError('total must be a finite number.');
  }

  if (total === 0) {
    throw new RangeError('total must not be zero.');
  }

  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError('precision must be a non-negative integer.');
  }

  return roundTo((part / total) * 100, precision);
}
