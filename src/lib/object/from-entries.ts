import type { ObjectRecord } from './types';

/**
 * Builds a plain object from key/value entries.
 *
 * @param input Array of `[key, value]` entries.
 * @returns A plain object built from the provided entries.
 * @throws {TypeError} If `input` is not an array of valid `[string, unknown]` entries.
 */
export function fromEntries(input: readonly (readonly [string, unknown])[]): ObjectRecord {
  if (!Array.isArray(input)) {
    throw new TypeError('input must be an array of [key, value] entries.');
  }

  const output: ObjectRecord = {};

  input.forEach((entry, index) => {
    if (!Array.isArray(entry) || entry.length !== 2) {
      throw new TypeError(`input[${index}] must be a [key, value] entry.`);
    }

    const [key, value] = entry;

    if (typeof key !== 'string') {
      throw new TypeError(`input[${index}][0] must be a string key.`);
    }

    output[key] = value;
  });

  return output;
}
