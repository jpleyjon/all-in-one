/**
 * Computes the median of number values.
 *
 * @param values Number array.
 * @returns Median value, or `undefined` for empty input.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any item is not finite.
 */
export function median(values: number[]): number | undefined {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (values.length === 0) {
    return undefined;
  }

  const sorted = values.map((value, index) => {
    if (!Number.isFinite(value)) {
      throw new RangeError(`values[${index}] must be a finite number.`);
    }

    return value;
  });

  sorted.sort((left, right) => left - right);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }

  return (sorted[middle - 1] + sorted[middle]) / 2;
}
