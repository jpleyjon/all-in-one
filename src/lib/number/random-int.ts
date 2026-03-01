/**
 * Generates a random integer in the inclusive range `[min, max]`.
 *
 * @param min Minimum integer value.
 * @param max Maximum integer value.
 * @param random Random source function returning values in `[0, 1)`.
 * @returns Random integer in range.
 * @throws {RangeError} If input values are invalid.
 * @throws {TypeError} If `random` is not a function.
 */
export function randomInt(min: number, max: number, random: () => number = Math.random): number {
  if (!Number.isInteger(min)) {
    throw new RangeError('min must be an integer.');
  }

  if (!Number.isInteger(max)) {
    throw new RangeError('max must be an integer.');
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

  return Math.floor(value * (max - min + 1)) + min;
}
