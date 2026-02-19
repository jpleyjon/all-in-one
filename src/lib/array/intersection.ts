/**
 * Returns unique values shared by both arrays.
 *
 * @param left Left array.
 * @param right Right array.
 * @returns Intersection preserving first appearance from `left`.
 */
export function intersection<T>(left: readonly T[], right: readonly T[]): T[] {
  const allowed = new Set(right);
  const seen = new Set<T>();
  const result: T[] = [];

  left.forEach((item) => {
    if (!allowed.has(item) || seen.has(item)) {
      return;
    }

    seen.add(item);
    result.push(item);
  });

  return result;
}
