import { isValidCurrencyCode } from './is-valid-currency-code';

/**
 * Normalizes a currency code to uppercase and validates it.
 *
 * @param code Currency code.
 * @returns Normalized code.
 * @throws {RangeError} If code is invalid.
 */
export function normalizeCurrencyCode(code: string): string {
  const normalized = code.trim().toUpperCase();

  if (!isValidCurrencyCode(normalized)) {
    throw new RangeError('code must be a valid 3-letter ISO currency code.');
  }

  return normalized;
}
