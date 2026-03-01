import { assertPlainObject, setAtPath, splitPathWithDelimiter } from './internal';
import type { ObjectRecord, UnflattenObjectOptions } from './types';

/**
 * Expands a flat object with delimiter-separated keys.
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
