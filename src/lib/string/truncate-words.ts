import { normalizeWhitespace } from './normalize-whitespace';

/**
 * Truncates text by word count.
 *
 * @param input Text to truncate.
 * @param maxWords Maximum number of words to keep.
 * @param suffix Suffix appended when truncation occurs.
 * @returns Truncated text.
 * @throws {RangeError} If `maxWords` is not a non-negative integer.
 */
export function truncateWords(input: string, maxWords: number, suffix = '...'): string {
  if (!Number.isInteger(maxWords) || maxWords < 0) {
    throw new RangeError('maxWords must be a non-negative integer.');
  }

  if (maxWords === 0) {
    return '';
  }

  const normalized = normalizeWhitespace(input);
  if (normalized === '') {
    return '';
  }

  const words = normalized.split(' ');

  if (words.length <= maxWords) {
    return normalized;
  }

  return words.slice(0, maxWords).join(' ') + suffix;
}
