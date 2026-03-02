import { assertPlainObject } from './assert-plain-object';
import { cloneDeepValue } from './clone-deep-value';
import type { MergeWithResolver, ObjectRecord } from './types';

/**
 * Shallow merges objects and resolves key conflicts with a custom resolver.
 *
 * @param resolver Conflict resolver called when a key already exists in the output.
 * @param inputs Plain objects to merge from left to right.
 * @returns A new merged object.
 * @throws {TypeError} If `resolver` is not a function or an input is not a plain object.
 */
export function mergeWith(resolver: MergeWithResolver, ...inputs: ObjectRecord[]): ObjectRecord {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function.');
  }

  const output: ObjectRecord = {};

  for (const [index, input] of inputs.entries()) {
    assertPlainObject(input, `inputs[${index}]`);

    for (const [key, value] of Object.entries(input)) {
      if (Object.prototype.hasOwnProperty.call(output, key)) {
        output[key] = cloneDeepValue(resolver(output[key], value, key));
      } else {
        output[key] = cloneDeepValue(value);
      }
    }
  }

  return output;
}
