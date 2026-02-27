import type { DateInput } from './types';
import { assertInteger, requireDate } from './internal';

/**
 * Adds years to a date.
 *
 * @param date Date input.
 * @param amount Number of years.
 * @returns New adjusted date.
 */
export function addYears(date: DateInput, amount: number): Date {
  assertInteger(amount, 'amount');

  const output = requireDate(date, 'date');
  output.setFullYear(output.getFullYear() + amount);
  return output;
}
