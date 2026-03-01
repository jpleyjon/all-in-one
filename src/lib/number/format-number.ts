/**
 * Formats a number using `Intl.NumberFormat`.
 *
 * @param value Number to format.
 * @param options Number formatting options.
 * @param locales Locale or locales list.
 * @returns Formatted number string.
 * @throws {RangeError} If `value` is not finite.
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locales?: string | string[],
): string {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  return new Intl.NumberFormat(locales, options).format(value);
}
