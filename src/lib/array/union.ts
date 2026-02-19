/**
 * Combines arrays and removes duplicates.
 *
 * @param inputs Arrays to combine.
 * @returns Unique union preserving first appearance order.
 */
export function union<T>(...inputs: readonly (readonly T[])[]): T[] {
  const result: T[] = [];
  const seen = new Set<T>();

  inputs.forEach((input) => {
    input.forEach((item) => {
      if (seen.has(item)) {
        return;
      }

      seen.add(item);
      result.push(item);
    });
  });

  return result;
}
