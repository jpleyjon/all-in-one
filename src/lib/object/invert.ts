import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Inverts keys and values.
 *
 * @param input Plain object to invert.
 * @returns A new object where each original value maps to its key.
 * @throws If `input` is not a plain object.
 */
export function invert(input: ObjectRecord): ObjectRecord {
  assertPlainObject(input);

  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input)) {
    output[String(value)] = key;
  }

  return output;
}
