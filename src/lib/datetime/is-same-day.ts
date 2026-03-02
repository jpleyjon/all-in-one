import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Checks whether two dates are in the same local calendar day.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns True if same day.
 */
export function isSameDay(a: DateInput, b: DateInput): boolean {
  const left = requireDate(a, 'a');
  const right = requireDate(b, 'b');

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}
