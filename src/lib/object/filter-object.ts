import { assertPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Filters object entries by predicate.
 */
export function filterObject<T extends ObjectRecord>(
  input: T,
  predicate: (value: T[keyof T], key: keyof T, input: T) => boolean,
): Partial<T> {
  assertPlainObject(input);

  const output: Partial<T> = {};

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    if (predicate(value, key, input)) {
      output[key] = value;
    }
  }

  return output;
}
