import type { JsonReplacer } from './types';

/**
 * Converts a value to a JSON string using a custom replacer function.
 *
 * @param input Value to stringify.
 * @param replacer Function used to transform values during serialization.
 * @param space Optional indentation size.
 * @returns JSON string representation of `input`.
 * @throws {TypeError} If `replacer` is not a function or `input` is not JSON-serializable.
 * @throws {RangeError} If `space` is not a non-negative integer.
 */
export function stringifyJsonWithReplacer(
  input: unknown,
  replacer: JsonReplacer,
  space?: number,
): string {
  if (typeof replacer !== 'function') {
    throw new TypeError('replacer must be a function.');
  }

  if (space !== undefined && (!Number.isInteger(space) || space < 0)) {
    throw new RangeError('space must be a non-negative integer.');
  }

  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(input, replacer, space);
  } catch {
    throw new TypeError('input must be JSON-serializable.');
  }

  if (serialized === undefined) {
    throw new TypeError('input must be JSON-serializable.');
  }

  return serialized;
}

