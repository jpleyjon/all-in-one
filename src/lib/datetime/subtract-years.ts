import type { DateInput } from './types';
import { addYears } from './add-years';

/**
 * Subtracts years from a date.
 *
 * @param date Date input.
 * @param amount Number of years.
 * @returns New adjusted date.
 */
export function subtractYears(date: DateInput, amount: number): Date {
  return addYears(date, -amount);
}
