import { assertObjectLike, getAtPath, normalizePath } from './internal';
import type { ObjectPath } from './types';

/**
 * Safely reads a nested value at a path.
 *
 * @param input Object to read from.
 * @param path Dot-path or path segments to read.
 * @param defaultValue Value returned when the resolved path is `undefined`.
 * @returns The value at `path`, or `defaultValue` when no value is found.
 * @throws {TypeError} If `input` is not object-like or `path` has an invalid type.
 * @throws {RangeError} If `path` contains an invalid numeric segment.
 */
export function get<TDefault = undefined>(
  input: unknown,
  path: ObjectPath,
  defaultValue?: TDefault,
): unknown | TDefault {
  assertObjectLike(input);

  const value = getAtPath(input, normalizePath(path));
  return value === undefined ? (defaultValue as TDefault) : value;
}
