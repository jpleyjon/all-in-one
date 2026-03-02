import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Converts UTC date components to local-time date.
 *
 * @param date Date input.
 * @returns Local-time adjusted date.
 */
export function toLocalTime(date: DateInput): Date {
  const current = requireDate(date, 'date');

  return new Date(
    current.getUTCFullYear(),
    current.getUTCMonth(),
    current.getUTCDate(),
    current.getUTCHours(),
    current.getUTCMinutes(),
    current.getUTCSeconds(),
    current.getUTCMilliseconds(),
  );
}
