/**
 * Generates an array by invoking a factory for each index.
 *
 * @param count Number of items to generate.
 * @param factory Value factory receiving the current index.
 * @returns Generated array.
 */
export function generateArray<T>(count: number, factory: (index: number) => T): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError('count must be a non-negative integer.');
  }

  if (typeof factory !== 'function') {
    throw new TypeError('factory must be a function.');
  }

  return Array.from({ length: count }, (_, index) => factory(index));
}
