import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Maps object entries into new key/value pairs.
 */
export function mapEntries<T extends ObjectRecord>(
  input: T,
  mapper: (value: T[keyof T], key: keyof T, input: T) => readonly [string, unknown],
): ObjectRecord {
  assertPlainObject(input);

  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    const [nextKey, nextValue] = mapper(value, key, input);
    output[nextKey] = nextValue;
  }

  return output;
}
