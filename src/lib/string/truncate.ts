/**
 * Truncates text to a maximum length.
 *
 * @param input Text to truncate.
 * @param maxLength Maximum resulting length.
 * @param suffix Suffix appended when truncation occurs.
 * @returns Truncated text.
 * @throws {RangeError} If `maxLength` is not a non-negative integer.
 */
export function truncate(
  input: string,
  maxLength: number,
  suffix = '...',
): string {
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError('maxLength must be a non-negative integer.');
  }

  if (maxLength === 0) {
    return '';
  }

  if (input.length <= maxLength) {
    return input;
  }

  if (suffix.length >= maxLength) {
    return input.slice(0, maxLength);
  }

  return input.slice(0, maxLength - suffix.length) + suffix;
}
