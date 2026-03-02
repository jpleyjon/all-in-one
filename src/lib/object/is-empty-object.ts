import { assertPlainObject } from './assert-plain-object';
import type { ObjectRecord } from './types';

/**
 * Checks whether a plain object has no own enumerable keys.
 *
 * @param input Plain object to inspect.
 * @returns `true` when `input` has no own enumerable keys, otherwise `false`.
 * @throws {TypeError} If `input` is not a plain object.
 */
export function isEmptyObject(input: ObjectRecord): boolean {
  assertPlainObject(input);
  return Object.keys(input).length === 0;
}
