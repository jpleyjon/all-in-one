/**
 * Masks the middle part of a string.
 *
 * @param input Source string.
 * @param visibleStart Number of visible characters at the start.
 * @param visibleEnd Number of visible characters at the end.
 * @param maskChar Character(s) used for masking.
 * @returns Masked string.
 * @throws {RangeError} If visible bounds are invalid.
 * @throws {Error} If `maskChar` is empty.
 */
export function mask(input: string, visibleStart = 2, visibleEnd = 2, maskChar = '*'): string {
  if (!Number.isInteger(visibleStart) || visibleStart < 0) {
    throw new RangeError('visibleStart must be a non-negative integer.');
  }

  if (!Number.isInteger(visibleEnd) || visibleEnd < 0) {
    throw new RangeError('visibleEnd must be a non-negative integer.');
  }

  if (maskChar.length === 0) {
    throw new Error('maskChar cannot be empty.');
  }

  if (visibleStart + visibleEnd >= input.length) {
    return input;
  }

  const start = input.slice(0, visibleStart);
  const end = input.slice(input.length - visibleEnd);
  const maskedLength = input.length - visibleStart - visibleEnd;
  const masked = maskChar.repeat(maskedLength).slice(0, maskedLength);

  return start + masked + end;
}
