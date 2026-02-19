/**
 * Collapses all whitespace sequences into a single space and trims the result.
 *
 * @param input Text to normalize.
 * @returns Text with normalized whitespace.
 */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}
