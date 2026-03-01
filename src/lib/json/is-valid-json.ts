import { parseJson } from './parse-json';

/**
 * Checks whether a string is valid JSON.
 *
 * @param input Value to validate.
 * @returns `true` when `input` is a valid JSON string, otherwise `false`.
 */
export function isValidJson(input: string): boolean {
  try {
    parseJson(input);
    return true;
  } catch {
    return false;
  }
}
