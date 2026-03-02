import { assertPlainObject } from './assert-plain-object';
import { cloneDeepValue } from './clone-deep-value';
import { isPlainObject } from './is-plain-object';
import type { DiffObjectsResult, ObjectRecord } from './types';

function isEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) {
    return true;
  }

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() === right.getTime();
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false;
    }

    for (let index = 0; index < left.length; index += 1) {
      if (!isEqual(left[index], right[index])) {
        return false;
      }
    }

    return true;
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    for (const key of leftKeys) {
      if (!(key in right) || !isEqual(left[key], right[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

/**
 * Computes deep added/removed/changed paths between two plain objects.
 *
 * @param left Base plain object.
 * @param right Comparison plain object.
 * @returns An object with `added`, `removed`, and `changed` path maps.
 * @throws {TypeError} If `left` or `right` is not a plain object.
 */
export function diffObjects(left: ObjectRecord, right: ObjectRecord): DiffObjectsResult {
  assertPlainObject(left, 'left');
  assertPlainObject(right, 'right');

  const output: DiffObjectsResult = {
    added: {},
    removed: {},
    changed: {},
  };

  const compare = (leftValue: unknown, rightValue: unknown, path: string): void => {
    if (isPlainObject(leftValue) && isPlainObject(rightValue)) {
      const keys = new Set<string>([...Object.keys(leftValue), ...Object.keys(rightValue)]);

      for (const key of keys) {
        const nextPath = path === '' ? key : `${path}.${key}`;

        if (!(key in leftValue)) {
          output.added[nextPath] = cloneDeepValue(rightValue[key]);
          continue;
        }

        if (!(key in rightValue)) {
          output.removed[nextPath] = cloneDeepValue(leftValue[key]);
          continue;
        }

        compare(leftValue[key], rightValue[key], nextPath);
      }

      return;
    }

    if (!isEqual(leftValue, rightValue)) {
      output.changed[path] = {
        before: cloneDeepValue(leftValue),
        after: cloneDeepValue(rightValue),
      };
    }
  };

  compare(left, right, '');

  return output;
}
