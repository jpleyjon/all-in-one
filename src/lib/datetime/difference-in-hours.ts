import type { DateInput } from './types';
import { differenceInMilliseconds, MS_IN_HOUR } from './internal';

/**
 * Returns signed whole-hour difference between two dates.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns Signed hour difference.
 */
export function differenceInHours(a: DateInput, b: DateInput): number {
  return Math.trunc(differenceInMilliseconds(a, b) / MS_IN_HOUR);
}
