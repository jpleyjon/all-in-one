import { assertPlainObject } from './assert-plain-object';
import { setAtPath } from './set-at-path';
import { splitPathWithDelimiter } from './split-path-with-delimiter';
import type { ObjectRecord, UnflattenObjectOptions } from './types';

/**
 * Expands a flat object with delimiter-separated keys.
 *
 * @param input Flat object with delimited keys.
 * @param options Unflattening options.
 * @returns A nested object created from delimited paths.
 * @throws If `input` is not a plain object.
 * @throws If `options.delimiter` is empty.
 */
export function unflattenObject(
  input: ObjectRecord,
  options: UnflattenObjectOptions = {},
): ObjectRecord {
  assertPlainObject(input);

  const delimiter = options.delimiter ?? '.';

  if (delimiter.length === 0) {
    throw new RangeError('delimiter must not be empty.');
  }

  let output: ObjectRecord = {};

  for (const [path, value] of Object.entries(input)) {
    const segments = splitPathWithDelimiter(path, delimiter);
    output = setAtPath(output, segments, value) as ObjectRecord;
  }

  return output;
}
