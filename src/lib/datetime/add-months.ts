import type { DateInput } from './types';
import { assertInteger, requireDate } from './internal';

/**
 * Adds months to a date.
 *
 * @param date Date input.
 * @param amount Number of months.
 * @returns New adjusted date.
 */
export function addMonths(date: DateInput, amount: number): Date {
  assertInteger(amount, 'amount');

  const output = requireDate(date, 'date');
  output.setMonth(output.getMonth() + amount);
  return output;
}
