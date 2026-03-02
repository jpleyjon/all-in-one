import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Reduces object entries into a single value.
 */
export function reduceObject<T extends ObjectRecord, R>(
  input: T,
  reducer: (accumulator: R, value: T[keyof T], key: keyof T, input: T) => R,
  initialValue: R,
): R {
  assertPlainObject(input);

  let accumulator = initialValue;

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    accumulator = reducer(accumulator, value, key, input);
  }

  return accumulator;
}
