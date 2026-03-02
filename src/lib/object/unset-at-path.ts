import type { ObjectRecord, PathSegment } from './types';
import { isNonNullObject } from './is-non-null-object';

/**
 * Removes a nested value at a path without mutating the original input.
 *
 * @param input Source value to copy and update.
 * @param segments Path segments to remove.
 * @returns A copied value with the path removed when present.
 */
export function unsetAtPath(input: unknown, segments: readonly PathSegment[]): unknown {
  if (segments.length === 0 || !isNonNullObject(input)) {
    return input;
  }

  const [head, ...tail] = segments;

  if (!Object.prototype.hasOwnProperty.call(input, head)) {
    return input;
  }

  const base = (Array.isArray(input) ? [...input] : { ...(input as ObjectRecord) }) as Record<
    string | number,
    unknown
  >;

  if (tail.length === 0) {
    if (Array.isArray(base) && typeof head === 'number') {
      (base as unknown[]).splice(head, 1);
    } else {
      delete base[head];
    }

    return base;
  }

  base[head] = unsetAtPath(base[head], tail);
  return base;
}
