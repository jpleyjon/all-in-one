/**
 * Normalizes text into lowercase words for case transformations.
 *
 * @param input Raw input string.
 * @returns Normalized words. Empty when the input has no alphanumeric content.
 */
export function toWords(input: string): string[] {
  const normalized = input
    .replace(/([a-z0-9])([A-Z][a-z])/g, '$1 $2')
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();

  if (normalized === '') {
    return [];
  }

  return normalized.split(/\s+/).map((word) => word.toLowerCase());
}
