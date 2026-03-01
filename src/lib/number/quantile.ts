/**
 * Computes a quantile using linear interpolation.
 *
 * @param values Number array.
 * @param q Quantile in the inclusive range `0..1`.
 * @returns Quantile value, or `undefined` for empty input.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any input value is invalid.
 */
export function quantile(values: number[], q: number): number | undefined {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (!Number.isFinite(q) || q < 0 || q > 1) {
    throw new RangeError('q must be a finite number between 0 and 1.');
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

  if (q === 0) {
    return sorted[0];
  }

  if (q === 1) {
    return sorted[sorted.length - 1];
  }

  const position = (sorted.length - 1) * q;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);

  if (lowerIndex === upperIndex) {
    return sorted[lowerIndex];
  }

  const weight = position - lowerIndex;
  const lower = sorted[lowerIndex];
  const upper = sorted[upperIndex];

  return lower + (upper - lower) * weight;
}
