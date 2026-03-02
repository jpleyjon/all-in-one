import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Shallow merges plain objects from left to right.
 */
export function merge<T extends ObjectRecord>(...inputs: T[]): ObjectRecord {
  const output: ObjectRecord = {};

  for (const [index, input] of inputs.entries()) {
    assertPlainObject(input, `inputs[${index}]`);
    Object.assign(output, input);
  }

  return output;
}
