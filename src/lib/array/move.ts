/**
 * Moves an item from one index to another without mutating the source array.
 *
 * @param input Source array.
 * @param fromIndex Current item index.
 * @param toIndex Destination index.
 * @returns New array with moved item.
 * @throws {RangeError} If either index is out of bounds.
 */
export function move<T>(
  input: readonly T[],
  fromIndex: number,
  toIndex: number,
): T[] {
  if (
    !Number.isInteger(fromIndex)
    || !Number.isInteger(toIndex)
    || fromIndex < 0
    || toIndex < 0
    || fromIndex >= input.length
    || toIndex >= input.length
  ) {
    throw new RangeError('fromIndex and toIndex must be valid array indexes.');
  }

  if (fromIndex === toIndex) {
    return [...input];
  }

  const result = [...input];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);
  return result;
}
