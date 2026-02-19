/**
 * Splits an array into two arrays based on a predicate.
 *
 * @param input Source array.
 * @param predicate Split condition.
 * @returns Tuple with `[matches, nonMatches]`.
 */
export function partition<T>(
  input: readonly T[],
  predicate: (item: T, index: number, source: readonly T[]) => boolean,
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  input.forEach((item, index) => {
    if (predicate(item, index, input)) {
      truthy.push(item);
      return;
    }

    falsy.push(item);
  });

  return [truthy, falsy];
}
