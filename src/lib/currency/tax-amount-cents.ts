import type { RoundingMode } from './multiply-cents';
import { multiplyCents } from './multiply-cents';

/**
 * Computes tax amount in cents from a subtotal and tax rate.
 *
 * @param subtotalCents Subtotal in cents.
 * @param taxRate Tax rate as decimal (for example 0.0825).
 * @param mode Rounding mode.
 * @returns Tax amount in cents.
 * @throws {RangeError} If inputs are invalid.
 */
export function taxAmountCents(
  subtotalCents: number,
  taxRate: number,
  mode: RoundingMode = 'half-up',
): number {
  if (!Number.isFinite(taxRate) || taxRate < 0) {
    throw new RangeError('taxRate must be a non-negative finite number.');
  }

  return multiplyCents(subtotalCents, taxRate, mode);
}
