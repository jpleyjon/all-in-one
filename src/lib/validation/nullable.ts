import type { ValidationPredicate } from './types';

/**
 * Builds a validator that accepts `null` in addition to the original predicate.
 *
 * @param validator Base validator.
 * @returns Composed nullable validator.
 * @throws {TypeError} If `validator` is not a function.
 */
export function nullable<T>(validator: ValidationPredicate<T>): ValidationPredicate<T | null> {
  if (typeof validator !== 'function') {
    throw new TypeError('validator must be a function.');
  }

  return (value: unknown): value is T | null => value === null || validator(value);
}
