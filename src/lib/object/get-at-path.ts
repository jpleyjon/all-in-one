import type { PathSegment } from './types';
import { isNonNullObject } from './is-non-null-object';

/**
 * Reads a nested value at a given path.
 *
 * @param input Source value to traverse.
 * @param segments Path segments to follow.
 * @returns The value at `segments`, or `undefined` when traversal fails.
 */
export function getAtPath(input: unknown, segments: readonly PathSegment[]): unknown {
  let current: unknown = input;

  for (const segment of segments) {
    if (!isNonNullObject(current)) {
      return undefined;
    }

    current = (current as Record<string | number, unknown>)[segment];
  }

  return current;
}
