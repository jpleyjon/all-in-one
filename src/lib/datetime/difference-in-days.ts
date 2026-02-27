import type { DateInput } from './types';
import { differenceInMilliseconds, MS_IN_DAY } from './internal';

/**
 * Returns signed whole-day difference between two dates.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns Signed day difference.
 */
export function differenceInDays(a: DateInput, b: DateInput): number {
  return Math.trunc(differenceInMilliseconds(a, b) / MS_IN_DAY);
}
