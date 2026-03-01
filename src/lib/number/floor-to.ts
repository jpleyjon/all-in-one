/**
 * Floors a number to a fixed number of decimal places.
 *
 * @param value Number to floor.
 * @param decimals Decimal places.
 * @returns Floored number.
 * @throws {RangeError} If `value` is not finite or `decimals` is invalid.
 */
export function floorTo(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer.');
  }

  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
}
