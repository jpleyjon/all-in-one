import type { DateInput } from './types';
import { startOfDay } from './start-of-day';

/**
 * Returns start of year.
 *
 * @param date Date input.
 * @returns Start-of-year date.
 */
export function startOfYear(date: DateInput): Date {
  const output = startOfDay(date);
  output.setMonth(0, 1);
  return output;
}
