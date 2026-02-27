import type { DateInput } from './types';
import { startOfDay } from './start-of-day';

/**
 * Returns start of month.
 *
 * @param date Date input.
 * @returns Start-of-month date.
 */
export function startOfMonth(date: DateInput): Date {
  const output = startOfDay(date);
  output.setDate(1);
  return output;
}
