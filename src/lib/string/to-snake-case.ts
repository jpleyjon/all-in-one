import { toWords } from './to-words';

/**
 * Converts text into snake_case.
 *
 * @param input Text to convert.
 * @returns snake_case text.
 */
export function toSnakeCase(input: string): string {
  return toWords(input).join('_');
}
