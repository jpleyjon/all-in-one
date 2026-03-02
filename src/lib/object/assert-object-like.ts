import { isNonNullObject } from './is-non-null-object';

/**
 * Asserts that an input is an object-like value (non-null object).
 *
 * @param input Value to validate.
 * @param name Parameter name used in error messages.
 * @throws If `input` is not a non-null object.
 */
export function assertObjectLike(input: unknown, name = 'input'): asserts input is object {
  if (!isNonNullObject(input)) {
    throw new TypeError(`${name} must be a non-null object.`);
  }
}
