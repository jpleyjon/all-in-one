/**
 * Clamps cents between minimum and maximum bounds.
 *
 * @param cents Amount in cents.
 * @param min Lower bound.
 * @param max Upper bound.
 * @returns Clamped cents.
 * @throws {RangeError} If inputs are invalid.
 */
export function clampCents(cents: number, min: number, max: number): number {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  if (!Number.isSafeInteger(min)) {
    throw new RangeError('min must be a safe integer.');
  }

  if (!Number.isSafeInteger(max)) {
    throw new RangeError('max must be a safe integer.');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max.');
  }

  if (cents < min) {
    return min;
  }

  if (cents > max) {
    return max;
  }

  return cents;
}
