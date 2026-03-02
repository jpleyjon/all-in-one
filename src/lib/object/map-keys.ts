import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Maps object keys while preserving values.
 */
export function mapKeys<T extends ObjectRecord>(
  input: T,
  mapper: (key: keyof T, value: T[keyof T], input: T) => string,
): ObjectRecord {
  assertPlainObject(input);

  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    output[mapper(key, value, input)] = value;
  }

  return output;
}
