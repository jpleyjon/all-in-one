import type { DateInput } from './types';
import { addDays } from './add-days';

/**
 * Subtracts days from a date.
 *
 * @param date Date input.
 * @param amount Number of days.
 * @returns New adjusted date.
 */
export function subtractDays(date: DateInput, amount: number): Date {
  return addDays(date, -amount);
}
