import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Gets days in a date's month.
 *
 * @param date Date input.
 * @returns Number of days in month.
 */
export function getDaysInMonth(date: DateInput): number {
  const current = requireDate(date, 'date');
  return new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
}
