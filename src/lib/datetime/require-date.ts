import type { DateInput } from './types';
import { parseDate } from './parse-date';

/**
 * Parses a date input and throws when invalid.
 *
 * @param value Date input to parse.
 * @param name Parameter name used in error messages.
 * @returns Parsed date instance.
 * @throws If `value` is not a valid date input.
 */
export function requireDate(value: DateInput, name: string): Date {
  const parsed = parseDate(value);

  if (parsed === null) {
    throw new RangeError(`${name} must be a valid date.`);
  }

  return parsed;
}
