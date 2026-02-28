import { dollarsToCents } from './dollars-to-cents';

/**
 * Parses a common currency string into integer cents.
 *
 * Supported examples: `1234`, `1,234`, `1,234.56`, `.99`, `-0.50`.
 *
 * @param input Currency string.
 * @returns Amount in cents.
 * @throws {RangeError} If input format is invalid.
 */
export function parseCurrencyStringToCents(input: string): number {
  const raw = input.trim();

  if (raw.length === 0) {
    throw new RangeError('input must be a valid currency amount.');
  }

  const sign = raw.startsWith('-') || raw.startsWith('+') ? raw[0] : '';
  const unsigned = sign.length > 0 ? raw.slice(1) : raw;

  if (unsigned.length === 0 || unsigned === '.') {
    throw new RangeError('input must be a valid currency amount.');
  }

  if (unsigned.includes(',')) {
    const commaPattern = /^\d{1,3}(,\d{3})*(?:\.\d+)?$/;

    if (!commaPattern.test(unsigned)) {
      throw new RangeError('input must be a valid currency amount.');
    }
  }

  const normalized = unsigned.replace(/,/g, '');

  try {
    return dollarsToCents(sign + normalized);
  } catch {
    throw new RangeError('input must be a valid currency amount.');
  }
}
