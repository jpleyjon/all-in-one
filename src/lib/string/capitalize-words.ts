/**
 * Capitalizes the first letter of each word while preserving separators.
 *
 * @param input Text to transform.
 * @returns Text with each word capitalized.
 */
export function capitalizeWords(input: string): string {
  return input.replace(
    /(^|[\s_-]+)([a-zA-Z])/g,
    (_match, prefix: string, letter: string) => prefix + letter.toUpperCase(),
  );
}
