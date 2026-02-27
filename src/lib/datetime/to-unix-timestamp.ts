import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Converts a date to UNIX timestamp in seconds.
 *
 * @param date Date input.
 * @returns UNIX timestamp in seconds.
 */
export function toUnixTimestamp(date: DateInput): number {
  return Math.floor(requireDate(date, 'date').getTime() / 1000);
}
