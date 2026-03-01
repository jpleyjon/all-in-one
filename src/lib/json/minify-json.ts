import { parseJson } from './parse-json';
import { stringifyJson } from './stringify-json';

/**
 * Removes unnecessary whitespace from JSON text.
 *
 * @param input JSON string to minify.
 * @returns Minified JSON string.
 * @throws {TypeError} If `input` is not a string.
 * @throws {SyntaxError} If `input` is not valid JSON.
 */
export function minifyJson(input: string): string {
  return stringifyJson(parseJson(input));
}

