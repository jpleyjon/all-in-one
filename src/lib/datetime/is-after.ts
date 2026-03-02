import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Checks whether a date occurs after another.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns True if a is after b.
 */
export function isAfter(a: DateInput, b: DateInput): boolean {
  return requireDate(a, 'a').getTime() > requireDate(b, 'b').getTime();
}
