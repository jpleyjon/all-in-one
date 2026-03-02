import { assertPlainObject } from './assert-plain-object';
import { isPlainObject } from './is-plain-object';
import type { FlattenObjectOptions, ObjectRecord } from './types';

/**
 * Flattens nested objects/arrays into delimiter-separated keys.
 *
 * @param input Plain object to flatten.
 * @param options Flattening options.
 * @returns A flat object keyed by delimited paths.
 * @throws If `input` is not a plain object.
 * @throws If `options.delimiter` is empty.
 */
export function flattenObject(
  input: ObjectRecord,
  options: FlattenObjectOptions = {},
): ObjectRecord {
  assertPlainObject(input);

  const delimiter = options.delimiter ?? '.';

  if (delimiter.length === 0) {
    throw new RangeError('delimiter must not be empty.');
  }

  const output: ObjectRecord = {};

  const visit = (value: unknown, path: string): void => {
    if (Array.isArray(value)) {
      if (value.length === 0 && path !== '') {
        output[path] = [];
        return;
      }

      value.forEach((item, index) => {
        const nextPath = path === '' ? String(index) : `${path}${delimiter}${index}`;
        visit(item, nextPath);
      });
      return;
    }

    if (isPlainObject(value)) {
      const entries = Object.entries(value);

      if (entries.length === 0 && path !== '') {
        output[path] = {};
        return;
      }

      entries.forEach(([key, nestedValue]) => {
        const nextPath = path === '' ? key : `${path}${delimiter}${key}`;
        visit(nestedValue, nextPath);
      });

      return;
    }

    if (path !== '') {
      output[path] = value;
    }
  };

  visit(input, '');

  return output;
}
