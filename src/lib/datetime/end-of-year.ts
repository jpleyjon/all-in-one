import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Returns end of year.
 *
 * @param date Date input.
 * @returns End-of-year date.
 */
export function endOfYear(date: DateInput): Date {
  const output = requireDate(date, 'date');
  output.setMonth(11, 31);
  output.setHours(23, 59, 59, 999);
  return output;
}
