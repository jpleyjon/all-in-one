/**
 * Converts integer cents to decimal dollars.
 *
 * @param cents Amount in cents.
 * @returns Amount in dollars.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function centsToDollars(cents: number): number {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return cents / 100;
}
