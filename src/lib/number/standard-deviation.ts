import { variance } from './variance';

/**
 * Computes standard deviation for a number array.
 *
 * @param values Number array.
 * @param sample Whether to compute sample standard deviation.
 * @returns Standard deviation value.
 * @throws {TypeError} If inputs are invalid.
 * @throws {RangeError} If input values are invalid or sample requires at least 2 items.
 */
export function standardDeviation(values: number[], sample = false): number {
  return Math.sqrt(variance(values, sample));
}
