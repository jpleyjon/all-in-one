import type { ValidationPredicate } from './types';

/**
 * Builds a validator that accepts `undefined` in addition to the original predicate.
 *
 * @param validator Base validator.
 * @returns Composed optional validator.
 * @throws {TypeError} If `validator` is not a function.
 */
export function optional<T>(validator: ValidationPredicate<T>): ValidationPredicate<T | undefined> {
  if (typeof validator !== 'function') {
    throw new TypeError('validator must be a function.');
  }

  return (value: unknown): value is T | undefined => value === undefined || validator(value);
}
