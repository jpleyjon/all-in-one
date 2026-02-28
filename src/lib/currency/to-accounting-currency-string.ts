import type { FormatCentsOptions } from './format-cents';
import { formatCents } from './format-cents';

export type AccountingFormatCentsOptions = FormatCentsOptions;

/**
 * Formats cents using accounting-style negatives in parentheses.
 *
 * @param cents Amount in cents.
 * @param options Formatting options.
 * @returns Formatted currency string.
 * @throws {RangeError} If inputs are invalid.
 */
export function toAccountingCurrencyString(
  cents: number,
  options: AccountingFormatCentsOptions = {},
): string {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  const formatted = formatCents(Math.abs(cents), options);
  return cents < 0 ? `(${formatted})` : formatted;
}
