import { assertObjectLike } from './assert-object-like';
import { cloneDeepValue } from './clone-deep-value';
import { normalizePath } from './normalize-path';
import { unsetAtPath } from './unset-at-path';
import type { ObjectPath } from './types';

/**
 * Omits selected nested paths from an object.
 */
export function deepOmit<T extends object>(input: T, paths: readonly ObjectPath[]): T {
  assertObjectLike(input);

  let output: unknown = cloneDeepValue(input);

  for (const path of paths) {
    const segments = normalizePath(path);

    if (segments.length === 0) {
      return (Array.isArray(output) ? [] : {}) as T;
    }

    output = unsetAtPath(output, segments);
  }

  return output as T;
}
