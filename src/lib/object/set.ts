import { assertObjectLike } from './assert-object-like';
import { normalizePath } from './normalize-path';
import { setAtPath } from './set-at-path';
import type { ObjectPath } from './types';

/**
 * Returns a new object with value set at a path.
 */
export function set<T extends object>(input: T, path: ObjectPath, value: unknown): T {
  assertObjectLike(input);
  return setAtPath(input, normalizePath(path), value) as T;
}
