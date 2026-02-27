import type { DateInput } from './types';
import { isSameDay } from './is-same-day';
import { subtractDays } from './subtract-days';

/**
 * Checks whether a date is yesterday.
 *
 * @param date Date input.
 * @returns True if date is yesterday.
 */
export function isYesterday(date: DateInput): boolean {
  return isSameDay(date, subtractDays(new Date(), 1));
}
