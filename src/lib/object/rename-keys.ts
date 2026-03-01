import { assertPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Renames keys using a key mapping object.
 */
export function renameKeys<T extends ObjectRecord>(
  input: T,
  mapping: Record<string, string>,
): ObjectRecord {
  assertPlainObject(input);
  assertPlainObject(mapping, 'mapping');

  const output: ObjectRecord = {};

  for (const [key, value] of Object.entries(input)) {
    output[mapping[key] ?? key] = value;
  }

  return output;
}
