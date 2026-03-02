import { assertPlainObject } from './assert-plain-object';
import { deepMergeValue } from './deep-merge-value';
import type { ObjectRecord } from './types';

/**
 * Deep merges plain objects from left to right.
 */
export function deepMerge<T extends ObjectRecord>(...inputs: T[]): ObjectRecord {
  if (inputs.length === 0) {
    return {};
  }

  let output: ObjectRecord = {};

  for (const [index, input] of inputs.entries()) {
    assertPlainObject(input, `inputs[${index}]`);
    output = deepMergeValue(output, input) as ObjectRecord;
  }

  return output;
}
