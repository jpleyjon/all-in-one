import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Checks whether a date occurs before another.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns True if a is before b.
 */
export function isBefore(a: DateInput, b: DateInput): boolean {
  return requireDate(a, 'a').getTime() < requireDate(b, 'b').getTime();
}
