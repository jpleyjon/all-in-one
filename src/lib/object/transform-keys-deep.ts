import { assertPlainObject, cloneDeepValue, isPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Recursively transforms keys for nested plain objects.
 */
export function transformKeysDeep(
  input: ObjectRecord,
  mapper: (key: string, value: unknown, path: readonly string[]) => string,
): ObjectRecord {
  assertPlainObject(input);

  if (typeof mapper !== 'function') {
    throw new TypeError('mapper must be a function.');
  }

  const visit = (value: unknown, path: readonly string[]): unknown => {
    if (Array.isArray(value)) {
      return value.map((item) => visit(item, path));
    }

    if (isPlainObject(value)) {
      const output: ObjectRecord = {};

      for (const [key, nestedValue] of Object.entries(value)) {
        const nextPath = [...path, key];
        const nextKey = mapper(key, nestedValue, nextPath);
        output[nextKey] = visit(nestedValue, nextPath);
      }

      return output;
    }

    return cloneDeepValue(value);
  };

  return visit(input, []) as ObjectRecord;
}
