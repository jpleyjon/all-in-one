import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Returns a new object containing only the provided keys.
 */
export function pick<T extends ObjectRecord, K extends keyof T>(
  input: T,
  keys: readonly K[],
): Pick<T, K> {
  assertPlainObject(input);

  const output = {} as Pick<T, K>;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      output[key] = input[key];
    }
  }

  return output;
}
