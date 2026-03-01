import { fromEntries } from './from-entries';
import type { ObjectRecord } from './types';

/**
 * Builds a plain object from key/value pairs.
 *
 * @param input Array of `[key, value]` pairs.
 * @returns A plain object built from the provided pairs.
 * @throws {TypeError} If `input` is not an array of valid `[string, unknown]` pairs.
 */
export function fromPairs(input: readonly (readonly [string, unknown])[]): ObjectRecord {
  return fromEntries(input);
}
