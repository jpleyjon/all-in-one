import { roundTo } from './round-to';

/**
 * Computes percentage change from `previous` to `current`.
 *
 * @param previous Baseline value.
 * @param current Current value.
 * @param precision Decimal precision in the resulting percentage.
 * @returns Percentage change value.
 * @throws {RangeError} If inputs are invalid or baseline is zero with non-zero current.
 */
export function percentChange(previous: number, current: number, precision = 2): number {
  if (!Number.isFinite(previous)) {
    throw new RangeError('previous must be a finite number.');
  }

  if (!Number.isFinite(current)) {
    throw new RangeError('current must be a finite number.');
  }

  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError('precision must be a non-negative integer.');
  }

  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    throw new RangeError('previous must not be zero when current is non-zero.');
  }

  return roundTo(((current - previous) / previous) * 100, precision);
}
