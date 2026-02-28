/**
 * Checks whether cents is positive.
 *
 * @param cents Amount in cents.
 * @returns True when cents is greater than zero.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function isPositiveCents(cents: number): boolean {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return cents > 0;
}
