import type { DateInput } from './types';
import { startOfWeek } from './start-of-week';

/**
 * Returns end of week.
 *
 * @param date Date input.
 * @param weekStartsOn Week start (0=Sunday ... 6=Saturday).
 * @returns End-of-week date.
 */
export function endOfWeek(date: DateInput, weekStartsOn = 0): Date {
  const output = startOfWeek(date, weekStartsOn);
  output.setDate(output.getDate() + 6);
  output.setHours(23, 59, 59, 999);
  return output;
}
