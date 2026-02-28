/**
 * Sums integer cent amounts.
 *
 * @param values Cent values.
 * @returns Total cents.
 * @throws {RangeError} If any value is not a safe integer.
 */
export function sumCents(values: readonly number[]): number {
  let total = 0;

  values.forEach((value, index) => {
    if (!Number.isSafeInteger(value)) {
      throw new RangeError(`values[${index}] must be a safe integer.`);
    }

    total += value;
  });

  if (!Number.isSafeInteger(total)) {
    throw new RangeError('sum is out of safe integer range.');
  }

  return total;
}
