import type { DateInput } from './types';
import { differenceInMilliseconds, MS_IN_MINUTE } from './internal';

/**
 * Returns signed whole-minute difference between two dates.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns Signed minute difference.
 */
export function differenceInMinutes(a: DateInput, b: DateInput): number {
  return Math.trunc(differenceInMilliseconds(a, b) / MS_IN_MINUTE);
}
