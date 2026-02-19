/**
 * Removes duplicates based on a selector key while preserving order.
 *
 * @param input Source array.
 * @param selector Key selector.
 * @returns Array with unique items by selected key.
 */
export function uniqueBy<T, K>(
  input: readonly T[],
  selector: (item: T, index: number, source: readonly T[]) => K,
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  input.forEach((item, index) => {
    const key = selector(item, index, input);
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    result.push(item);
  });

  return result;
}
