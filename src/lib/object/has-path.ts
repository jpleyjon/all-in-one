import { assertObjectLike, hasAtPath, normalizePath } from './internal';
import type { ObjectPath } from './types';

/**
 * Checks whether a path exists as own properties.
 *
 * @param input Object to inspect.
 * @param path Dot-path or path segments to check.
 * @returns `true` when the full path exists as own properties, otherwise `false`.
 * @throws {TypeError} If `input` is not object-like or `path` has an invalid type.
 * @throws {RangeError} If `path` contains an invalid numeric segment.
 */
export function hasPath(input: unknown, path: ObjectPath): boolean {
  assertObjectLike(input);
  return hasAtPath(input, normalizePath(path));
}
