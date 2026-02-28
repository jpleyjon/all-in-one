/**
 * Checks whether cents equals zero.
 *
 * @param cents Amount in cents.
 * @returns True when cents is exactly zero.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function isZeroCents(cents: number): boolean {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return cents === 0;
}
