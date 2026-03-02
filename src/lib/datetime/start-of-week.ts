import type { DateInput } from './types';
import { assertWeekStartsOn } from './assert-week-starts-on';
import { startOfDay } from './start-of-day';

/**
 * Returns start of week.
 *
 * @param date Date input.
 * @param weekStartsOn Week start (0=Sunday ... 6=Saturday).
 * @returns Start-of-week date.
 */
export function startOfWeek(date: DateInput, weekStartsOn = 0): Date {
  assertWeekStartsOn(weekStartsOn);

  const output = startOfDay(date);
  const offset = (output.getDay() - weekStartsOn + 7) % 7;
  output.setDate(output.getDate() - offset);
  return output;
}
