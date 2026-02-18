/**
 * Removes diacritics/accents from latin characters.
 *
 * @param input Text to normalize.
 * @returns Text without accent marks.
 */
export function stripAccents(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
