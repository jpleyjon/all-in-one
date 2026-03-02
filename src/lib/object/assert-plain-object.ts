import type { ObjectRecord } from './types';
import { isPlainObject } from './is-plain-object';

/**
 * Asserts that an input is a plain object.
 *
 * @param input Value to validate.
 * @param name Parameter name used in error messages.
 * @throws If `input` is not a plain object.
 */
export function assertPlainObject(input: unknown, name = 'input'): asserts input is ObjectRecord {
  if (!isPlainObject(input)) {
    throw new TypeError(`${name} must be a plain object.`);
  }
}
