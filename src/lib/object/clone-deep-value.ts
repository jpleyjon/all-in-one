import type { ObjectRecord } from './types';
import { isNonNullObject } from './is-non-null-object';
import { isPlainObject } from './is-plain-object';

/**
 * Deep-clones supported JSON-like values and dates.
 *
 * @param input Value to clone.
 * @param seen Internal map for circular reference handling.
 * @returns A deep clone of `input`.
 */
export function cloneDeepValue<T>(input: T, seen = new WeakMap<object, unknown>()): T {
  if (!isNonNullObject(input)) {
    return input;
  }

  if (input instanceof Date) {
    return new Date(input.getTime()) as T;
  }

  if (seen.has(input)) {
    return seen.get(input) as T;
  }

  if (Array.isArray(input)) {
    const output: unknown[] = [];
    seen.set(input, output);

    for (const item of input) {
      output.push(cloneDeepValue(item, seen));
    }

    return output as T;
  }

  if (!isPlainObject(input)) {
    return input;
  }

  const output: ObjectRecord = {};
  seen.set(input, output);

  for (const [key, value] of Object.entries(input)) {
    output[key] = cloneDeepValue(value, seen);
  }

  return output as T;
}
