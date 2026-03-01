import type { JsonReviver } from './types';

/**
 * Parses JSON using a custom reviver function.
 *
 * @param input JSON string to parse.
 * @param reviver Function used to transform parsed values.
 * @returns Parsed JSON value typed as `T`.
 * @throws {TypeError} If `input` is not a string or `reviver` is not a function.
 * @throws {SyntaxError} If `input` is not valid JSON.
 */
export function parseJsonWithReviver<T = unknown>(input: string, reviver: JsonReviver): T {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string.');
  }

  if (typeof reviver !== 'function') {
    throw new TypeError('reviver must be a function.');
  }

  return JSON.parse(input, reviver) as T;
}
