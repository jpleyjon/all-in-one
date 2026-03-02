import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Checks whether two dates are in the same local month.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns True if same month.
 */
export function isSameMonth(a: DateInput, b: DateInput): boolean {
  const left = requireDate(a, 'a');
  const right = requireDate(b, 'b');

  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}
