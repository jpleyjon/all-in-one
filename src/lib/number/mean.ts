import { sumNumbers } from './sum-numbers';

/**
 * Computes arithmetic mean of number values.
 *
 * @param values Number array.
 * @returns Mean value, or `0` for empty input.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any item is not finite.
 */
export function mean(values: number[]): number {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (values.length === 0) {
    return 0;
  }

  return sumNumbers(values) / values.length;
}
