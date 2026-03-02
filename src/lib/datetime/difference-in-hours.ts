import type { DateInput } from './types';
import { differenceInMilliseconds } from './difference-in-milliseconds';

const MS_IN_HOUR = 60 * 60 * 1000;

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
