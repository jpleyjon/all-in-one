/**
 * Builds an object indexed by a selector key.
 *
 * @param input Source array.
 * @param selector Key selector.
 * @returns Object mapping each key to the latest matching item.
 */
export function keyBy<T, K extends PropertyKey>(
  input: readonly T[],
  selector: (item: T, index: number, source: readonly T[]) => K,
): Record<K, T> {
  const result = {} as Record<K, T>;

  input.forEach((item, index) => {
    const key = selector(item, index, input);
    result[key] = item;
  });

  return result;
}
