/**
 * Returns values from `left` that are not present in `right`.
 *
 * @param left Base array.
 * @param right Exclusion array.
 * @returns Array difference.
 */
export function difference<T>(left: readonly T[], right: readonly T[]): T[] {
  const excluded = new Set(right);

  return left.filter((item) => !excluded.has(item));
}
