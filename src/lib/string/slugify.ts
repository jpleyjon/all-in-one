import { stripAccents } from './strip-accents';
import { toWords } from './to-words';

/**
 * Converts text into a URL-friendly slug.
 *
 * @param input Text to convert.
 * @returns Slugified text in kebab-case.
 */
export function slugify(input: string): string {
  return toWords(stripAccents(input)).join('-');
}
