/**
 * Checks whether cents is negative.
 *
 * @param cents Amount in cents.
 * @returns True when cents is less than zero.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function isNegativeCents(cents: number): boolean {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return cents < 0;
}
