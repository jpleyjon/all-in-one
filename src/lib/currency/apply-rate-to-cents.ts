import type { RoundingMode } from './multiply-cents';
import { multiplyCents } from './multiply-cents';

/**
 * Applies a rate to cents and rounds to integer cents.
 *
 * Examples: tax/fee/discount where `rate` can be positive or negative.
 *
 * @param cents Amount in cents.
 * @param rate Rate to apply (for example 0.0825 or -0.15).
 * @param mode Rounding mode.
 * @returns Adjusted cent amount.
 * @throws {RangeError} If inputs are invalid.
 */
export function applyRateToCents(
  cents: number,
  rate: number,
  mode: RoundingMode = 'half-up',
): number {
  if (!Number.isFinite(rate)) {
    throw new RangeError('rate must be a finite number.');
  }

  return multiplyCents(cents, 1 + rate, mode);
}
