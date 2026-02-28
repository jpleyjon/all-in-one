import { allocateCents } from './allocate-cents';

/**
 * Splits cents evenly across parts while preserving total.
 *
 * @param totalCents Total amount in cents.
 * @param parts Number of parts.
 * @returns Array of allocated cent amounts.
 * @throws {RangeError} If inputs are invalid.
 */
export function splitEvenCents(totalCents: number, parts: number): number[] {
  return allocateCents(totalCents, parts);
}
