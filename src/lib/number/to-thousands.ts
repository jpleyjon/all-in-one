/**
 * Formats a number using a custom thousands separator.
 *
 * @param value Number to format.
 * @param separator Thousands separator.
 * @returns Formatted string.
 * @throws {RangeError} If `value` is not finite.
 * @throws {TypeError} If `separator` is invalid.
 */
export function toThousands(value: number, separator = ','): string {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (typeof separator !== 'string' || separator.length === 0) {
    throw new TypeError('separator must be a non-empty string.');
  }

  const [integerPart, decimalPart] = Math.abs(value).toString().split('.');
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const signPrefix = value < 0 ? '-' : '';

  return decimalPart === undefined
    ? `${signPrefix}${groupedInteger}`
    : `${signPrefix}${groupedInteger}.${decimalPart}`;
}
