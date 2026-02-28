/**
 * Checks whether a value is a valid 3-letter uppercase ISO currency code.
 *
 * @param code Currency code.
 * @returns True when valid.
 */
export function isValidCurrencyCode(code: string): boolean {
  return /^[A-Z]{3}$/.test(code.trim().toUpperCase());
}
