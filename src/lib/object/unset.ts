import { assertObjectLike, normalizePath, unsetAtPath } from './internal';
import type { ObjectPath } from './types';

/**
 * Returns a new object with a path removed.
 */
export function unset<T extends object>(input: T, path: ObjectPath): T {
  assertObjectLike(input);
  return unsetAtPath(input, normalizePath(path)) as T;
}
