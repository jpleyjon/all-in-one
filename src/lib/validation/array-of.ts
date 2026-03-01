import type { ValidationPredicate } from './types';

/**
 * Builds an array validator from an item validator.
 *
 * @param validator Item validator.
 * @returns Validator that accepts arrays with valid items.
 * @throws {TypeError} If `validator` is not a function.
 */
export function arrayOf<T>(validator: ValidationPredicate<T>): ValidationPredicate<T[]> {
  if (typeof validator !== 'function') {
    throw new TypeError('validator must be a function.');
  }

  return (value: unknown): value is T[] =>
    Array.isArray(value) && value.every((item) => validator(item));
}
