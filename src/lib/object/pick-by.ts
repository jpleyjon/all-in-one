import { filterObject } from './filter-object';
import type { ObjectRecord } from './types';

/**
 * Picks object entries by predicate.
 */
export function pickBy<T extends ObjectRecord>(
  input: T,
  predicate: (value: T[keyof T], key: keyof T, input: T) => boolean,
): Partial<T> {
  return filterObject(input, predicate);
}
