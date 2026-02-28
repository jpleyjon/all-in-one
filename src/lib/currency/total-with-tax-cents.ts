import type { RoundingMode } from './multiply-cents';
import { sumCents } from './sum-cents';
import { taxAmountCents } from './tax-amount-cents';

/**
 * Computes total cents including tax.
 *
 * @param subtotalCents Subtotal in cents.
 * @param taxRate Tax rate as decimal (for example 0.0825).
 * @param mode Rounding mode.
 * @returns Total including tax in cents.
 * @throws {RangeError} If inputs are invalid.
 */
export function totalWithTaxCents(
  subtotalCents: number,
  taxRate: number,
  mode: RoundingMode = 'half-up',
): number {
  const tax = taxAmountCents(subtotalCents, taxRate, mode);
  return sumCents([subtotalCents, tax]);
}
