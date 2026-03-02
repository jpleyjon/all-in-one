import type { ObjectRecord } from './types';
import { isNonNullObject } from './is-non-null-object';

/**
 * Checks whether a value is a plain object.
 *
 * @param value Value to evaluate.
 * @returns `true` when `value` is a plain object with `Object` or `null` prototype.
 */
export function isPlainObject(value: unknown): value is ObjectRecord {
  if (!isNonNullObject(value) || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
