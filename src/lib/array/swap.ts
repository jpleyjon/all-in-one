/**
 * Swaps two items in an array without mutating the source array.
 *
 * @param input Source array.
 * @param leftIndex First index.
 * @param rightIndex Second index.
 * @returns New array with swapped items.
 * @throws {RangeError} If either index is out of bounds.
 */
export function swap<T>(input: readonly T[], leftIndex: number, rightIndex: number): T[] {
  if (
    !Number.isInteger(leftIndex) ||
    !Number.isInteger(rightIndex) ||
    leftIndex < 0 ||
    rightIndex < 0 ||
    leftIndex >= input.length ||
    rightIndex >= input.length
  ) {
    throw new RangeError('leftIndex and rightIndex must be valid array indexes.');
  }

  if (leftIndex === rightIndex) {
    return [...input];
  }

  const result = [...input];
  const leftValue = result[leftIndex];
  result[leftIndex] = result[rightIndex];
  result[rightIndex] = leftValue;

  return result;
}
