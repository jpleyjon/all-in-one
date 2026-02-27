import type { DateInput } from './types';

/**
 * Parses a date-like input into a Date instance.
 *
 * @param value Date input.
 * @returns Parsed Date or null when invalid.
 */
export function parseDate(value: DateInput): Date | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return new Date(value.getTime());
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}
