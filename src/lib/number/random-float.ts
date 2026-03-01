/**
 * Generates a random float in the half-open range `[min, max)`.
 *
 * @param min Minimum value.
 * @param max Maximum value.
 * @param random Random source function returning values in `[0, 1)`.
 * @returns Random float in range.
 * @throws {RangeError} If input values are invalid.
 * @throws {TypeError} If `random` is not a function.
 */
export function randomFloat(min: number, max: number, random: () => number = Math.random): number {
  if (!Number.isFinite(min)) {
    throw new RangeError('min must be a finite number.');
  }

  if (!Number.isFinite(max)) {
    throw new RangeError('max must be a finite number.');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max.');
  }

  if (typeof random !== 'function') {
    throw new TypeError('random must be a function.');
  }

  const value = random();

  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('random() must return a finite number in [0, 1).');
  }

  return value * (max - min) + min;
}
