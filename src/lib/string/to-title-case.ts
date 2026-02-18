import { toWords } from './to-words';

/**
 * Converts text into Title Case words separated by spaces.
 *
 * @param input Text to convert.
 * @returns Title Case text.
 */
export function toTitleCase(input: string): string {
  return toWords(input)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
