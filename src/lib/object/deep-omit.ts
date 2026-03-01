import { assertObjectLike, cloneDeepValue, normalizePath, unsetAtPath } from './internal';
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
