/**
 * Performs linear interpolation between two values.
 *
 * @param start Start value.
 * @param end End value.
 * @param t Interpolation factor.
 * @returns Interpolated value.
 * @throws {RangeError} If inputs are not finite numbers.
 */
export function lerp(start: number, end: number, t: number): number {
  if (!Number.isFinite(start)) {
    throw new RangeError('start must be a finite number.');
  }

  if (!Number.isFinite(end)) {
    throw new RangeError('end must be a finite number.');
  }

  if (!Number.isFinite(t)) {
    throw new RangeError('t must be a finite number.');
  }

  return start + (end - start) * t;
}
