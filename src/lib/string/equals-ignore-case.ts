/**
 * Compares two strings case-insensitively.
 *
 * @param left Left string.
 * @param right Right string.
 * @returns `true` if strings are equal ignoring case.
 */
export function equalsIgnoreCase(left: string, right: string): boolean {
  return left.toLocaleLowerCase() === right.toLocaleLowerCase();
}
