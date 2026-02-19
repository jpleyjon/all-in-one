/**
 * Checks whether an array has no items.
 *
 * @param input Array to check.
 * @returns `true` when the array is empty.
 */
export function isEmpty<T>(input: readonly T[]): boolean {
  return input.length === 0;
}
