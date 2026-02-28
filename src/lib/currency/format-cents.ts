export interface FormatCentsOptions {
  locale?: string;
  currency?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
}

/**
 * Formats an integer cent amount into a localized currency string.
 *
 * @param cents Amount in cents.
 * @param options Formatting options.
 * @returns Formatted currency string.
 * @throws {RangeError} If cents or currency is invalid.
 */
export function formatCents(cents: number, options: FormatCentsOptions = {}): string {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  const { locale = 'en-US', currency = 'USD', currencyDisplay = 'symbol' } = options;

  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new RangeError('currency must be a 3-letter uppercase ISO code.');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
