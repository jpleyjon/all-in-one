/**
 * Parses a JSON string.
 *
 * @param input JSON string to parse.
 * @returns Parsed JSON value typed as `T`.
 * @throws {TypeError} If `input` is not a string.
 * @throws {SyntaxError} If `input` is not valid JSON.
 */
export function parseJson<T = unknown>(input: string): T {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string.');
  }

  return JSON.parse(input) as T;
}
