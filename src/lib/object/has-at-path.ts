import type { PathSegment } from './types';
import { isNonNullObject } from './is-non-null-object';

/**
 * Checks whether a nested path exists as own-properties.
 *
 * @param input Source value to traverse.
 * @param segments Path segments to follow.
 * @returns `true` when all segments exist as own-properties.
 */
export function hasAtPath(input: unknown, segments: readonly PathSegment[]): boolean {
  let current: unknown = input;

  for (const segment of segments) {
    if (!isNonNullObject(current)) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(current, segment)) {
      return false;
    }

    current = (current as Record<string | number, unknown>)[segment];
  }

  return true;
}
