/**
 * Returns the first item from an array.
 *
 * @param input Source array.
 * @returns First item or `undefined` for empty arrays.
 */
export function first<T>(input: readonly T[]): T | undefined {
  return input[0];
}
