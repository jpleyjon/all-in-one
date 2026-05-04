/**
 * Wraps a generator and ensures unique outputs across calls.
 *
 * @param generator Source generator.
 * @param options Uniqueness settings.
 * @returns Unique generator wrapper.
 */
export function createUniqueGenerator<T>(
  generator: () => T,
  options: { maxAttempts?: number } = {},
): () => T {
  if (typeof generator !== 'function') {
    throw new TypeError('generator must be a function.');
  }

  const maxAttempts = options.maxAttempts ?? 100;

  if (!Number.isInteger(maxAttempts) || maxAttempts <= 0) {
    throw new RangeError('maxAttempts must be a positive integer.');
  }

  const seen = new Set<T>();

  return (): T => {
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const value = generator();

      if (!seen.has(value)) {
        seen.add(value);
        return value;
      }
    }

    throw new Error('unable to generate a unique value within maxAttempts.');
  };
}
