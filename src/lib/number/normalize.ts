/**
 * Normalizes a value to a 0..1 scale using a source range.
 *
 * @param value Input value.
 * @param min Source range minimum.
 * @param max Source range maximum.
 * @returns Normalized value.
 * @throws {RangeError} If inputs are invalid or range has zero length.
 */
export function normalize(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(min)) {
    throw new RangeError('min must be a finite number.');
  }

  if (!Number.isFinite(max)) {
    throw new RangeError('max must be a finite number.');
  }

  if (min === max) {
    throw new RangeError('min and max must be different.');
  }

  return (value - min) / (max - min);
}
