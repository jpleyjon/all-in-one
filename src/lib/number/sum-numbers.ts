/**
 * Sums an array of finite numbers.
 *
 * @param values Numbers to sum.
 * @returns Sum of all values.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any item is not finite.
 */
export function sumNumbers(values: number[]): number {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  let total = 0;

  for (const [index, value] of values.entries()) {
    if (!Number.isFinite(value)) {
      throw new RangeError(`values[${index}] must be a finite number.`);
    }

    total += value;
  }

  return total;
}
