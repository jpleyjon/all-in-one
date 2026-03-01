import { assertPlainObject, cloneDeepValue } from './internal';
import type { ObjectRecord } from './types';

/**
 * Applies default values for keys that are undefined.
 *
 * @param input Base plain object.
 * @param sources Source objects used to fill undefined keys from left to right.
 * @returns A new object with defaults applied.
 * @throws {TypeError} If `input` or any source is not a plain object.
 */
export function defaults<T extends ObjectRecord>(
  input: T,
  ...sources: ObjectRecord[]
): ObjectRecord {
  assertPlainObject(input);

  const output = cloneDeepValue(input) as ObjectRecord;

  for (const [index, source] of sources.entries()) {
    assertPlainObject(source, `sources[${index}]`);

    for (const [key, value] of Object.entries(source)) {
      if (output[key] === undefined) {
        output[key] = cloneDeepValue(value);
      }
    }
  }

  return output;
}
