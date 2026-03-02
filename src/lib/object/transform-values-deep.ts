import { assertPlainObject } from './assert-plain-object';
import { isPlainObject } from './is-plain-object';
import type { ObjectRecord, PathSegment } from './types';

/**
 * Recursively transforms leaf values in nested objects and arrays.
 *
 * @param input Plain object to transform.
 * @param mapper Mapping function invoked for each non-object leaf value.
 * @returns A new object with transformed leaf values.
 * @throws If `input` is not a plain object.
 * @throws If `mapper` is not a function.
 */
export function transformValuesDeep(
  input: ObjectRecord,
  mapper: (value: unknown, path: readonly PathSegment[]) => unknown,
): ObjectRecord {
  assertPlainObject(input);

  if (typeof mapper !== 'function') {
    throw new TypeError('mapper must be a function.');
  }

  const visit = (value: unknown, path: readonly PathSegment[]): unknown => {
    if (Array.isArray(value)) {
      return value.map((item, index) => visit(item, [...path, index]));
    }

    if (isPlainObject(value)) {
      const output: ObjectRecord = {};

      for (const [key, nestedValue] of Object.entries(value)) {
        output[key] = visit(nestedValue, [...path, key]);
      }

      return output;
    }

    return mapper(value, path);
  };

  return visit(input, []) as ObjectRecord;
}
