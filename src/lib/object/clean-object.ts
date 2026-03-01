import { assertPlainObject, cloneDeepValue, isPlainObject } from './internal';
import type { CleanObjectOptions, ObjectRecord } from './types';

const DEFAULT_OPTIONS: Required<CleanObjectOptions> = {
  deep: true,
  removeUndefined: true,
  removeNull: true,
  removeEmptyString: true,
  removeEmptyObject: false,
  removeEmptyArray: false,
};

function shouldRemove(value: unknown, options: Required<CleanObjectOptions>): boolean {
  if (options.removeUndefined && value === undefined) {
    return true;
  }

  if (options.removeNull && value === null) {
    return true;
  }

  if (options.removeEmptyString && value === '') {
    return true;
  }

  if (options.removeEmptyObject && isPlainObject(value) && Object.keys(value).length === 0) {
    return true;
  }

  if (options.removeEmptyArray && Array.isArray(value) && value.length === 0) {
    return true;
  }

  return false;
}

/**
 * Removes unwanted values from a plain object.
 *
 * @param input Plain object to clean.
 * @param options Cleanup behavior options.
 * @returns A new object with the selected values removed.
 * @throws {TypeError} If `input` is not a plain object.
 */
export function cleanObject(input: ObjectRecord, options: CleanObjectOptions = {}): ObjectRecord {
  assertPlainObject(input);

  const resolved: Required<CleanObjectOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const visit = (value: unknown, depth: number): unknown => {
    if (Array.isArray(value)) {
      if (!resolved.deep && depth > 0) {
        return cloneDeepValue(value);
      }

      const cleaned = value
        .map((item) => visit(item, depth + 1))
        .filter((item) => !shouldRemove(item, resolved));
      return cleaned;
    }

    if (isPlainObject(value)) {
      if (!resolved.deep && depth > 0) {
        return cloneDeepValue(value);
      }

      const output: ObjectRecord = {};

      for (const [key, nestedValue] of Object.entries(value)) {
        const cleanedValue = visit(nestedValue, depth + 1);

        if (!shouldRemove(cleanedValue, resolved)) {
          output[key] = cleanedValue;
        }
      }

      return output;
    }

    return cloneDeepValue(value);
  };

  return visit(input, 0) as ObjectRecord;
}
