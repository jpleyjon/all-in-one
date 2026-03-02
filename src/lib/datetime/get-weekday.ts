import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Gets local weekday index.
 *
 * @param date Date input.
 * @returns Weekday index (0=Sunday ... 6=Saturday).
 */
export function getWeekday(date: DateInput): number {
  return requireDate(date, 'date').getDay();
}
