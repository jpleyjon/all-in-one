import { assertObjectLike } from './assert-object-like';
import { normalizePath } from './normalize-path';
import { unsetAtPath } from './unset-at-path';
import type { ObjectPath } from './types';

/**
 * Returns a new object with a path removed.
 */
export function unset<T extends object>(input: T, path: ObjectPath): T {
  assertObjectLike(input);
  return unsetAtPath(input, normalizePath(path)) as T;
}
