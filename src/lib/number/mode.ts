/**
 * Computes the mode values from a number array.
 *
 * @param values Number array.
 * @returns Sorted modes. Returns empty array for empty input.
 * @throws {TypeError} If `values` is not an array.
 * @throws {RangeError} If any item is not finite.
 */
export function mode(values: number[]): number[] {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array.');
  }

  if (values.length === 0) {
    return [];
  }

  const counts = new Map<number, number>();
  let highestCount = 0;

  values.forEach((value, index) => {
    if (!Number.isFinite(value)) {
      throw new RangeError(`values[${index}] must be a finite number.`);
    }

    const normalized = Object.is(value, -0) ? 0 : value;
    const nextCount = (counts.get(normalized) ?? 0) + 1;
    counts.set(normalized, nextCount);

    if (nextCount > highestCount) {
      highestCount = nextCount;
    }
  });

  if (highestCount <= 1) {
    return [];
  }

  return [...counts.entries()]
    .filter(([, count]) => count === highestCount)
    .map(([value]) => value)
    .sort((left, right) => left - right);
}
