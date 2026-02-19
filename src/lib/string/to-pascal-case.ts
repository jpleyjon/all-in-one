import { toWords } from './to-words';

/**
 * Converts text into PascalCase.
 *
 * @param input Text to convert.
 * @returns PascalCase text.
 */
export function toPascalCase(input: string): string {
  return toWords(input)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
