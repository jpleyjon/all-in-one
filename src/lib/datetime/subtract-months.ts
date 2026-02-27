import type { DateInput } from './types';
import { addMonths } from './add-months';

/**
 * Subtracts months from a date.
 *
 * @param date Date input.
 * @param amount Number of months.
 * @returns New adjusted date.
 */
export function subtractMonths(date: DateInput, amount: number): Date {
  return addMonths(date, -amount);
}
