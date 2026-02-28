/**
 * Returns the minimum cent amount from a list.
 *
 * @param values Cent values.
 * @returns Smallest cent value or undefined for empty input.
 * @throws {RangeError} If any value is not a safe integer.
 */
export function minCents(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  const first = values[0];

  if (!Number.isSafeInteger(first)) {
    throw new RangeError('values[0] must be a safe integer.');
  }

  let minimum = first;

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index];

    if (!Number.isSafeInteger(value)) {
      throw new RangeError(`values[${index}] must be a safe integer.`);
    }

    if (value < minimum) {
      minimum = value;
    }
  }

  return minimum;
}
