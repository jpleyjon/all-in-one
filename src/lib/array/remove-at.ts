/**
 * Removes an item at a given index without mutating the source array.
 *
 * @param input Source array.
 * @param index Removal index.
 * @returns New array without the removed item.
 * @throws {RangeError} If `index` is out of bounds.
 */
export function removeAt<T>(input: readonly T[], index: number): T[] {
  if (!Number.isInteger(index) || index < 0 || index >= input.length) {
    throw new RangeError('index must be an integer between 0 and input.length - 1.');
  }

  return [...input.slice(0, index), ...input.slice(index + 1)];
}
