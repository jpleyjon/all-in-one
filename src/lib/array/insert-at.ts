/**
 * Inserts an item at a given index without mutating the source array.
 *
 * @param input Source array.
 * @param index Insertion index.
 * @param item Item to insert.
 * @returns New array with inserted item.
 * @throws {RangeError} If `index` is out of bounds.
 */
export function insertAt<T>(input: readonly T[], index: number, item: T): T[] {
  if (!Number.isInteger(index) || index < 0 || index > input.length) {
    throw new RangeError('index must be an integer between 0 and input.length.');
  }

  return [...input.slice(0, index), item, ...input.slice(index)];
}
