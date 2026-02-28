/**
 * Negates a cent amount.
 *
 * @param cents Amount in cents.
 * @returns Negated amount in cents.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function negateCents(cents: number): number {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  return cents === 0 ? 0 : -cents;
}
