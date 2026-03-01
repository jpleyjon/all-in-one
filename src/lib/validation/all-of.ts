import type { ValidationPredicate } from './types';

/**
 * Builds a validator that requires every predicate to pass.
 *
 * @param validators Validators to compose.
 * @returns Validator that passes when all predicates pass.
 * @throws {RangeError} If no validators are provided.
 * @throws {TypeError} If any validator is not a function.
 */
export function allOf(...validators: ValidationPredicate[]): ValidationPredicate {
  if (validators.length === 0) {
    throw new RangeError('at least one validator is required.');
  }

  if (validators.some((validator) => typeof validator !== 'function')) {
    throw new TypeError('validators must be functions.');
  }

  return (value: unknown): value is unknown => validators.every((validator) => validator(value));
}
