import type { RoundingMode } from './multiply-cents';
import { multiplyCents } from './multiply-cents';
import { sumCents } from './sum-cents';

/**
 * Computes the average cents value with configurable rounding.
 *
 * @param values Cent values.
 * @param mode Rounding mode.
 * @returns Rounded average cents.
 * @throws {RangeError} If inputs are invalid.
 */
export function averageCents(values: readonly number[], mode: RoundingMode = 'half-up'): number {
  if (values.length === 0) {
    return 0;
  }

  const total = sumCents(values);
  return multiplyCents(total, 1 / values.length, mode);
}
