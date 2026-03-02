import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Converts local date components to a UTC-based date.
 *
 * @param date Date input.
 * @returns UTC-adjusted date.
 */
export function toUTC(date: DateInput): Date {
  const current = requireDate(date, 'date');

  return new Date(
    Date.UTC(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      current.getHours(),
      current.getMinutes(),
      current.getSeconds(),
      current.getMilliseconds(),
    ),
  );
}
