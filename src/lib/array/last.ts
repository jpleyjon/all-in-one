/**
 * Returns the last item from an array.
 *
 * @param input Source array.
 * @returns Last item or `undefined` for empty arrays.
 */
export function last<T>(input: readonly T[]): T | undefined {
  if (input.length === 0) {
    return undefined;
  }

  return input[input.length - 1];
}
