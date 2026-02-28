import type { RoundingMode } from './multiply-cents';
import { multiplyCents } from './multiply-cents';

/**
 * Applies basis points to cents and rounds to integer cents.
 *
 * @param cents Amount in cents.
 * @param bps Basis points (1 bps = 0.01%).
 * @param mode Rounding mode.
 * @returns Adjusted cent amount.
 * @throws {RangeError} If inputs are invalid.
 */
export function applyBpsToCents(
  cents: number,
  bps: number,
  mode: RoundingMode = 'half-up',
): number {
  if (!Number.isFinite(bps)) {
    throw new RangeError('bps must be a finite number.');
  }

  return multiplyCents(cents, 1 + bps / 10000, mode);
}
