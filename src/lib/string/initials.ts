import { toWords } from './to-words';

/**
 * Builds uppercase initials from words.
 *
 * @param input Source text.
 * @param max Maximum number of initials to return.
 * @returns Initials string.
 * @throws {RangeError} If `max` is not a non-negative integer.
 */
export function initials(input: string, max = 2): string {
  if (!Number.isInteger(max) || max < 0) {
    throw new RangeError('max must be a non-negative integer.');
  }

  if (max === 0) {
    return '';
  }

  return toWords(input)
    .slice(0, max)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}
