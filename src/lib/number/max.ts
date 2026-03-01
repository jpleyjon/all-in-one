/**
 * Returns the maximum value from an array of numbers.
 *
 * @param values Number array.
 * @returns Maximum value, or `undefined` when empty.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any item is not finite.
 */
export function max(values: number[]): number | undefined {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (values.length === 0) {
    return undefined;
  }

  let currentMax = values[0];

  if (!Number.isFinite(currentMax)) {
    throw new RangeError('values[0] must be a finite number.');
  }

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index];

    if (!Number.isFinite(value)) {
      throw new RangeError(`values[${index}] must be a finite number.`);
    }

    if (value > currentMax) {
      currentMax = value;
    }
  }

  return currentMax;
}
