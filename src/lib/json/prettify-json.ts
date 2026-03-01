import { parseJson } from './parse-json';
import { stringifyJson } from './stringify-json';

/**
 * Formats JSON text with indentation.
 *
 * @param input JSON string to format.
 * @param space Number of spaces used for indentation.
 * @returns Formatted JSON string.
 * @throws {TypeError} If `input` is not a string.
 * @throws {SyntaxError} If `input` is not valid JSON.
 * @throws {RangeError} If `space` is not a non-negative integer.
 */
export function prettifyJson(input: string, space = 2): string {
  return stringifyJson(parseJson(input), space);
}
