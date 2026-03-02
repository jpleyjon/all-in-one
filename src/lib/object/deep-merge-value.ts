import { cloneDeepValue } from './clone-deep-value';
import { isPlainObject } from './is-plain-object';
import type { ObjectRecord } from './types';

/**
 * Deep-merges two values, recursively merging plain objects.
 *
 * @param left Base value.
 * @param right Value to merge into `left`.
 * @returns Merged value where non-object branches are replaced by `right`.
 */
export function deepMergeValue(left: unknown, right: unknown): unknown {
  if (isPlainObject(left) && isPlainObject(right)) {
    const output: ObjectRecord = { ...left };

    for (const [key, value] of Object.entries(right)) {
      output[key] = key in output ? deepMergeValue(output[key], value) : cloneDeepValue(value);
    }

    return output;
  }

  return cloneDeepValue(right);
}
