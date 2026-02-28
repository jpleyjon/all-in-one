import type { RoundingMode } from './multiply-cents';
import { multiplyCents } from './multiply-cents';

/**
 * Computes discount amount in cents from a subtotal and discount rate.
 *
 * @param subtotalCents Subtotal in cents.
 * @param discountRate Discount rate as decimal (for example 0.15).
 * @param mode Rounding mode.
 * @returns Discount amount in cents.
 * @throws {RangeError} If inputs are invalid.
 */
export function discountAmountCents(
  subtotalCents: number,
  discountRate: number,
  mode: RoundingMode = 'half-up',
): number {
  if (!Number.isFinite(discountRate) || discountRate < 0) {
    throw new RangeError('discountRate must be a non-negative finite number.');
  }

  return multiplyCents(subtotalCents, discountRate, mode);
}
