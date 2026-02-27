import type { DateInput } from './types';
import { isSameDay } from './is-same-day';

/**
 * Checks whether a date is today.
 *
 * @param date Date input.
 * @returns True if date is today.
 */
export function isToday(date: DateInput): boolean {
  return isSameDay(date, new Date());
}
