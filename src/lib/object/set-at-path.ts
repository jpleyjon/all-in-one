import type { PathSegment } from './types';
import { cloneDeepValue } from './clone-deep-value';
import { isPlainObject } from './is-plain-object';

function createContainer(nextSegment: PathSegment | undefined): unknown {
  return typeof nextSegment === 'number' ? [] : {};
}

/**
 * Sets a nested value at a path without mutating the original input.
 *
 * @param input Source value to copy and update.
 * @param segments Path segments to set.
 * @param value Value to assign.
 * @returns A copied value with `value` set at `segments`.
 */
export function setAtPath(
  input: unknown,
  segments: readonly PathSegment[],
  value: unknown,
): unknown {
  if (segments.length === 0) {
    return cloneDeepValue(value);
  }

  const [head, ...tail] = segments;
  const base = (
    Array.isArray(input) ? [...input] : isPlainObject(input) ? { ...input } : createContainer(head)
  ) as Record<string | number, unknown>;

  const current = base[head];
  const next = tail.length === 0 ? value : setAtPath(current, tail, value);

  base[head] = next;
  return base;
}
