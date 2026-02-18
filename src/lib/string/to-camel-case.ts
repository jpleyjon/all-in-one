import { toWords } from './to-words';

/**
 * Converts text into camelCase.
 *
 * @param input Text to convert.
 * @returns camelCase text.
 */
export function toCamelCase(input: string): string {
  const words = toWords(input);

  if (words.length === 0) {
    return '';
  }

  return words[0] + words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
