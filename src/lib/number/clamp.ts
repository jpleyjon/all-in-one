/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 * @returns Clamped number.
 * @throws {RangeError} If values are not finite or `min` is greater than `max`.
 */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(min)) {
    throw new RangeError('min must be a finite number.');
  }

  if (!Number.isFinite(max)) {
    throw new RangeError('max must be a finite number.');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max.');
  }

  return Math.min(Math.max(value, min), max);
}
