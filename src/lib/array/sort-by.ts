import type { PrimitiveComparable, SortDirection } from './types';

/**
 * Sorts an array by selector value without mutating the original array.
 *
 * @param input Source array.
 * @param selector Sort key selector.
 * @param direction Sort direction.
 * @returns Sorted array copy.
 * @throws {RangeError} If `direction` is invalid.
 */
export function sortBy<T>(
  input: readonly T[],
  selector: (item: T, index: number, source: readonly T[]) => PrimitiveComparable,
  direction: SortDirection = 'asc',
): T[] {
  if (direction !== 'asc' && direction !== 'desc') {
    throw new RangeError("direction must be either 'asc' or 'desc'.");
  }

  const factor = direction === 'asc' ? 1 : -1;

  const normalize = (value: PrimitiveComparable): string | number | bigint => {
    if (value instanceof Date) {
      return value.getTime();
    }

    return value;
  };

  return input
    .map((item, index) => ({
      item,
      index,
      key: normalize(selector(item, index, input)),
    }))
    .sort((left, right) => {
      if (left.key < right.key) {
        return -1 * factor;
      }

      if (left.key > right.key) {
        return 1 * factor;
      }

      return left.index - right.index;
    })
    .map((entry) => entry.item);
}
