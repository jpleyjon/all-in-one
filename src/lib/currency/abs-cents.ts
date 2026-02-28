/**
 * Returns absolute cents value.
 *
 * @param cents Amount in cents.
 * @returns Absolute amount in cents.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function absCents(cents: number): number {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return Math.abs(cents);
}
