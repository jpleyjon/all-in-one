import { assertObjectLike, getAtPath, normalizePath, setAtPath } from './internal';
import type { ObjectPath } from './types';

/**
 * Updates a value at path based on an updater function.
 *
 * @param input Object to update.
 * @param path Dot-path or path segments where the value is stored.
 * @param updater Function that receives the current value and returns the next value.
 * @returns A new object with the updated value at `path`.
 * @throws {TypeError} If `input` is not object-like or `updater` is not a function.
 * @throws {RangeError} If `path` contains an invalid numeric segment.
 */
export function update<T extends object>(
  input: T,
  path: ObjectPath,
  updater: (currentValue: unknown) => unknown,
): T {
  assertObjectLike(input);

  if (typeof updater !== 'function') {
    throw new TypeError('updater must be a function.');
  }

  const segments = normalizePath(path);
  const currentValue = getAtPath(input, segments);
  const nextValue = updater(currentValue);

  return setAtPath(input, segments, nextValue) as T;
}
