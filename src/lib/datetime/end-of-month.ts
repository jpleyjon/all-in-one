import type { DateInput } from './types';
import { startOfMonth } from './start-of-month';

/**
 * Returns end of month.
 *
 * @param date Date input.
 * @returns End-of-month date.
 */
export function endOfMonth(date: DateInput): Date {
  const output = startOfMonth(date);
  output.setMonth(output.getMonth() + 1, 0);
  output.setHours(23, 59, 59, 999);
  return output;
}
