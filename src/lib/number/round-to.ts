/**
 * Rounds a number to a fixed number of decimal places.
 *
 * @param value Number to round.
 * @param decimals Decimal places.
 * @returns Rounded number.
 * @throws {RangeError} If `value` is not finite or `decimals` is invalid.
 */
export function roundTo(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer.');
  }

  const factor = 10 ** decimals;
  const absolute = Math.abs(value);
  const rounded = Math.round(absolute * factor) / factor;
  return value < 0 ? -rounded : rounded;
}
