import { toWords } from './to-words';

/**
 * Converts text into kebab-case.
 *
 * @param input Text to convert.
 * @returns kebab-case text.
 */
export function toKebabCase(input: string): string {
  return toWords(input).join('-');
}
