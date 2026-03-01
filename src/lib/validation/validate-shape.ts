import type { ValidationShape } from './types';

/**
 * Validates that an object matches a field-validator shape.
 *
 * @param value Value to validate.
 * @param shape Field validators indexed by key.
 * @returns `true` when value satisfies all field validators.
 * @throws {TypeError} If `shape` is invalid.
 */
export function validateShape<T>(value: unknown, shape: ValidationShape): value is T {
  if (typeof shape !== 'object' || shape === null || Array.isArray(shape)) {
    throw new TypeError('shape must be an object of validator functions.');
  }

  const entries = Object.entries(shape);

  for (const [key, validator] of entries) {
    if (typeof validator !== 'function') {
      throw new TypeError(`shape["${key}"] must be a function.`);
    }
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  for (const [key, validator] of entries) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) {
      return false;
    }

    if (!validator(record[key])) {
      return false;
    }
  }

  return true;
}
