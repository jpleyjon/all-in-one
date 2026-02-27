import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Returns start of day (00:00:00.000).
 *
 * @param date Date input.
 * @returns Start-of-day date.
 */
export function startOfDay(date: DateInput): Date {
  const output = requireDate(date, 'date');
  output.setHours(0, 0, 0, 0);
  return output;
}
