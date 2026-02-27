import type { DateInput } from './types';
import { differenceInMilliseconds, MS_IN_SECOND } from './internal';

/**
 * Returns signed whole-second difference between two dates.
 *
 * @param a Left date.
 * @param b Right date.
 * @returns Signed second difference.
 */
export function differenceInSeconds(a: DateInput, b: DateInput): number {
  return Math.trunc(differenceInMilliseconds(a, b) / MS_IN_SECOND);
}
