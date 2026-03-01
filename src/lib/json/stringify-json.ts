/**
 * Converts a value to a JSON string.
 *
 * @param input Value to stringify.
 * @param space Optional indentation size.
 * @returns JSON string representation of `input`.
 * @throws {RangeError} If `space` is not a non-negative integer.
 * @throws {TypeError} If `input` is not JSON-serializable.
 */
export function stringifyJson(input: unknown, space?: number): string {
  if (space !== undefined && (!Number.isInteger(space) || space < 0)) {
    throw new RangeError('space must be a non-negative integer.');
  }

  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(input, null, space);
  } catch {
    throw new TypeError('input must be JSON-serializable.');
  }

  if (serialized === undefined) {
    throw new TypeError('input must be JSON-serializable.');
  }

  return serialized;
}

