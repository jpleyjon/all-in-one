/**
 * Performs a case-insensitive `includes` check.
 *
 * @param input Source string.
 * @param search Search term.
 * @returns `true` if `search` exists in `input` ignoring case.
 */
export function includesIgnoreCase(input: string, search: string): boolean {
  return input.toLocaleLowerCase().includes(search.toLocaleLowerCase());
}
