import type { DateInput } from './types';
import { addDays } from './add-days';
import { isSameDay } from './is-same-day';

/**
 * Checks whether a date is tomorrow.
 *
 * @param date Date input.
 * @returns True if date is tomorrow.
 */
export function isTomorrow(date: DateInput): boolean {
  return isSameDay(date, addDays(new Date(), 1));
}
