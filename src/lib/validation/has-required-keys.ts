/**
 * Checks whether an object has all required own keys.
 *
 * @param value Value to inspect.
 * @param keys Required keys.
 * @returns `true` when all required keys exist as own properties.
 * @throws {TypeError} If `keys` is invalid.
 */
export function hasRequiredKeys(value: unknown, keys: readonly string[]): boolean {
  if (!Array.isArray(keys)) {
    throw new TypeError('keys must be an array of non-empty strings.');
  }

  for (const key of keys) {
    if (typeof key !== 'string' || key.length === 0) {
      throw new TypeError('keys must be an array of non-empty strings.');
    }
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const input = value as Record<string, unknown>;
  return keys.every((key) => Object.prototype.hasOwnProperty.call(input, key));
}
