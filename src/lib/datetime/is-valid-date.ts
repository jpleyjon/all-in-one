import type { DateInput } from './types';
import { parseDate } from './parse-date';

/**
 * Checks whether a value can be parsed as a valid date.
 *
 * @param value Date input.
 * @returns True if the value is a valid date input.
 */
export function isValidDate(value: DateInput): boolean {
  return parseDate(value) !== null;
}
