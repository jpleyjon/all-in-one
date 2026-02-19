/**
 * Flattens an array one level deep.
 *
 * @param input Nested array.
 * @returns Flattened array.
 */
export function flatten<T>(input: readonly (T | readonly T[])[]): T[] {
  const result: T[] = [];

  input.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...item);
      return;
    }

    result.push(item as T);
  });

  return result;
}
