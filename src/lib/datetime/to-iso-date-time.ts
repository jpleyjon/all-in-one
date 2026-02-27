import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Returns ISO date-time string.
 *
 * @param date Date input.
 * @returns ISO date-time string.
 */
export function toISODateTime(date: DateInput): string {
  return requireDate(date, 'date').toISOString();
}
