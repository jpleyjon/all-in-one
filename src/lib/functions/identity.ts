/**
 * Returns the provided value unchanged.
 *
 * @param value Input value.
 * @returns The same value.
 */
export function identity<T>(value: T): T {
  return value;
}
