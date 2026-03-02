import type { DateInput } from './types';
import { requireDate } from './require-date';

/**
 * Returns the ISO date portion (YYYY-MM-DD).
 *
 * @param date Date input.
 * @returns ISO date string.
 */
export function toISODate(date: DateInput): string {
  return requireDate(date, 'date').toISOString().slice(0, 10);
}
