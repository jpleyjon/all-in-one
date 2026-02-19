/**
 * Sums all numbers in an array.
 *
 * @param input Number array.
 * @returns Sum value.
 */
export function sum(input: readonly number[]): number {
  return input.reduce((acc, value) => acc + value, 0);
}
