import { assertPlainObject } from './internal';
import type { ObjectRecord } from './types';

/**
 * Maps object values while preserving keys.
 */
export function mapValues<T extends ObjectRecord, R>(
  input: T,
  mapper: (value: T[keyof T], key: keyof T, input: T) => R,
): Record<string, R> {
  assertPlainObject(input);

  const output: Record<string, R> = {};

  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    output[String(key)] = mapper(value, key, input);
  }

  return output;
}
