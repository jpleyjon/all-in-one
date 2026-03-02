import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Returns end of day (23:59:59.999).
 *
 * @param date Date input.
 * @returns End-of-day date.
 */
export function endOfDay(date: DateInput): Date {
  const output = requireDate(date, 'date');
  output.setHours(23, 59, 59, 999);
  return output;
}
