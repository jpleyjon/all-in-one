import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Returns a new object excluding the provided keys.
 *
 * @param input Plain object to copy from.
 * @param keys Keys to remove from the returned object.
 * @returns A new object without the excluded keys.
 * @throws {TypeError} If `input` is not a plain object.
 */
export function omit<T extends ObjectRecord, K extends keyof T>(
  input: T,
  keys: readonly K[],
): Omit<T, K> {
  assertPlainObject(input);

  const excluded = new Set<keyof T>(keys);
  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    if (!excluded.has(key)) {
      output[String(key)] = value;
    }
  }

  return output as Omit<T, K>;
}
