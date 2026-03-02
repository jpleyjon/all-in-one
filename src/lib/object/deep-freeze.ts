import { isNonNullObject } from './is-non-null-object';

/**
 * Deeply freezes an object/array graph.
 *
 * @param input Value to freeze.
 * @param seen Internal set of already-visited objects to safely handle circular references.
 * @returns The same input reference, frozen recursively when object-like.
 */
export function deepFreeze<T>(input: T, seen = new WeakSet<object>()): T {
  if (!isNonNullObject(input)) {
    return input;
  }

  if (seen.has(input)) {
    return input;
  }

  seen.add(input);

  if (Array.isArray(input)) {
    input.forEach((item) => {
      deepFreeze(item, seen);
    });
  } else {
    for (const value of Object.values(input)) {
      deepFreeze(value, seen);
    }
  }

  Object.freeze(input);
  return input;
}
