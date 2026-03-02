import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Computes the millisecond difference between two date inputs.
 *
 * @param a Left date input.
 * @param b Right date input.
 * @returns Difference in milliseconds (`a - b`).
 * @throws If either date input is invalid.
 */
export function differenceInMilliseconds(a: DateInput, b: DateInput): number {
  return requireDate(a, 'a').getTime() - requireDate(b, 'b').getTime();
}
