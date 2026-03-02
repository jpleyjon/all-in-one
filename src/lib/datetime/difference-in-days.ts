import type { DateInput } from './types';
import { differenceInMilliseconds } from './difference-in-milliseconds';

const MS_IN_DAY = 24 * 60 * 60 * 1000;

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
