import type { DateInput } from './types';
import { pad } from './pad';
import { requireDate } from './require-date';

/**
 * Formats a date using simple tokens.
 * Supported tokens: YYYY, MM, DD, HH, mm, ss, SSS.
 *
 * @param date Date input.
 * @param pattern Output pattern.
 * @returns Formatted date string.
 */
export function formatDate(date: DateInput, pattern: string): string {
  const parsed = requireDate(date, 'date');

  const tokens: Record<string, string> = {
    YYYY: String(parsed.getFullYear()),
    MM: pad(parsed.getMonth() + 1, 2),
    DD: pad(parsed.getDate(), 2),
    HH: pad(parsed.getHours(), 2),
    mm: pad(parsed.getMinutes(), 2),
    ss: pad(parsed.getSeconds(), 2),
    SSS: pad(parsed.getMilliseconds(), 3),
  };

  return pattern.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (token) => tokens[token]);
}
