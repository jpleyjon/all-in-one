/**
 * Removes duplicate values while preserving the first occurrence order.
 *
 * @param input Source array.
 * @returns Array with unique values.
 */
export function unique<T>(input: readonly T[]): T[] {
  return [...new Set(input)];
}
