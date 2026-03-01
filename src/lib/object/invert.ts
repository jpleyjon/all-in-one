import { assertPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Inverts keys and values.
 */
export function invert(input: ObjectRecord): ObjectRecord {
  assertPlainObject(input);

  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input)) {
    output[String(value)] = key;
  }

  return output;
}
