/**
 * Converts integer cents to an exact fixed-point dollar string.
 *
 * @param cents Amount in cents.
 * @returns Dollar amount with two decimal places.
 * @throws {RangeError} If cents is not a safe integer.
 */
export function centsToDollarsString(cents: number): string {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  const sign = cents < 0 ? '-' : '';
  const absoluteCents = Math.abs(cents);
  const whole = Math.trunc(absoluteCents / 100);
  const fraction = String(absoluteCents % 100).padStart(2, '0');

  return `${sign}${whole}.${fraction}`;
}
