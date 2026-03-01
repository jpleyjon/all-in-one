import { entries } from './entries';
import type { ObjectRecord } from './types';

/**
 * Converts a plain object to key/value pairs.
 *
 * @param input Plain object to convert.
 * @returns A typed array of `[key, value]` tuples.
 * @throws {TypeError} If `input` is not a plain object.
 */
export function toPairs<T extends ObjectRecord>(input: T): [keyof T & string, T[keyof T]][] {
  return entries(input);
}
