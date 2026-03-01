import type { DateInput } from './types';
import { assertInteger, requireDate } from './internal';

/**
 * Adds days to a date.
 *
 * @param date Date input.
 * @param amount Number of days.
 * @returns New adjusted date.
 * @throws {RangeError} If `date` is invalid or `amount` is not an integer.
 */
export function addDays(date: DateInput, amount: number): Date {
  assertInteger(amount, 'amount');

  const output = requireDate(date, 'date');
  output.setDate(output.getDate() + amount);
  return output;
}
