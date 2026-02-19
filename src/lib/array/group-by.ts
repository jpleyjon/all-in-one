/**
 * Groups array items by a selector key.
 *
 * @param input Source array.
 * @param selector Group key selector.
 * @returns Object mapping each key to its grouped items.
 */
export function groupBy<T, K extends PropertyKey>(
  input: readonly T[],
  selector: (item: T, index: number, source: readonly T[]) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;

  input.forEach((item, index) => {
    const key = selector(item, index, input);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  });

  return result;
}
