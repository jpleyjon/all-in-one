import { sum } from './sum';

/**
 * Calculates the average of numeric values.
 *
 * @param input Number array.
 * @returns Arithmetic mean, or `0` for empty arrays.
 */
export function average(input: readonly number[]): number {
  if (input.length === 0) {
    return 0;
  }

  return sum(input) / input.length;
}
