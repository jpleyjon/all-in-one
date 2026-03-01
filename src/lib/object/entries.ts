import { assertPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Returns typed key/value entries for a plain object.
 *
 * @param input Plain object to convert.
 * @returns A typed array of `[key, value]` tuples.
 * @throws {TypeError} If `input` is not a plain object.
 */
export function entries<T extends ObjectRecord>(input: T): [keyof T & string, T[keyof T]][] {
  assertPlainObject(input);
  return Object.entries(input) as [keyof T & string, T[keyof T]][];
}
