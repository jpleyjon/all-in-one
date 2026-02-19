/**
 * Splits an array into chunks of a fixed size.
 *
 * @param input Source array.
 * @param size Chunk size.
 * @returns Chunked array.
 * @throws {RangeError} If `size` is not a positive integer.
 */
export function chunk<T>(input: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive integer.');
  }

  const result: T[][] = [];

  for (let index = 0; index < input.length; index += size) {
    result.push(input.slice(index, index + size));
  }

  return result;
}
