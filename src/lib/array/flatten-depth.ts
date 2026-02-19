/**
 * Flattens an array up to a given depth.
 *
 * @param input Nested array.
 * @param depth Maximum flatten depth.
 * @returns Flattened array.
 * @throws {RangeError} If `depth` is not a non-negative integer.
 */
export function flattenDepth<T>(input: readonly unknown[], depth = 1): T[] {
  if (!Number.isInteger(depth) || depth < 0) {
    throw new RangeError('depth must be a non-negative integer.');
  }

  const visit = (current: readonly unknown[], level: number): unknown[] => {
    if (level === 0) {
      return [...current];
    }

    const flattened: unknown[] = [];

    current.forEach((item) => {
      if (Array.isArray(item)) {
        flattened.push(...visit(item, level - 1));
        return;
      }

      flattened.push(item);
    });

    return flattened;
  };

  return visit(input, depth) as T[];
}
