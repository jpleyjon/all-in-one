import { assertObjectLike, cloneDeepValue, getAtPath, normalizePath, setAtPath } from './internal';
import type { ObjectPath } from './types';

/**
 * Picks only selected nested paths from an object.
 *
 * @param input Object to pick from.
 * @param paths Dot-paths or path segments to include.
 * @returns A new partial object containing only the selected paths.
 * @throws {TypeError} If `input` is not object-like or a path has an invalid type.
 * @throws {RangeError} If a path contains an invalid numeric segment.
 */
export function deepPick<T extends object>(input: T, paths: readonly ObjectPath[]): Partial<T> {
  assertObjectLike(input);

  let output: unknown = {};

  for (const path of paths) {
    const segments = normalizePath(path);

    if (segments.length === 0) {
      return cloneDeepValue(input) as Partial<T>;
    }

    const value = getAtPath(input, segments);

    if (value !== undefined) {
      output = setAtPath(output, segments, cloneDeepValue(value));
    }
  }

  return output as Partial<T>;
}
