import { mean } from './mean';

/**
 * Computes variance for a number array.
 *
 * @param values Number array.
 * @param sample Whether to compute sample variance (`n - 1`) instead of population (`n`).
 * @returns Variance value.
 * @throws {TypeError} If inputs are invalid.
 * @throws {RangeError} If input values are invalid or sample requires at least 2 items.
 */
export function variance(values: number[], sample = false): number {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (typeof sample !== 'boolean') {
    throw new TypeError('sample must be a boolean.');
  }

  if (values.length === 0) {
    return 0;
  }

  if (sample && values.length < 2) {
    throw new RangeError('sample variance requires at least two values.');
  }

  const average = mean(values);

  let sumSquaredDifferences = 0;

  values.forEach((value) => {
    const difference = value - average;
    sumSquaredDifferences += difference * difference;
  });

  const divisor = sample ? values.length - 1 : values.length;
  return sumSquaredDifferences / divisor;
}
