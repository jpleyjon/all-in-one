import { filterObject } from './filter-object';
import type { ObjectRecord } from './types';

/**
 * Omits object entries by predicate.
 */
export function omitBy<T extends ObjectRecord>(
  input: T,
  predicate: (value: T[keyof T], key: keyof T, input: T) => boolean,
): Partial<T> {
  return filterObject(input, (value, key, source) => !predicate(value, key, source));
}
