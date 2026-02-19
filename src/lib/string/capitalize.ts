/**
 * Capitalizes the first character of a string.
 *
 * @param input Text to capitalize.
 * @returns Text with an uppercased first character.
 */
export function capitalize(input: string): string {
  if (input === '') {
    return '';
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}
