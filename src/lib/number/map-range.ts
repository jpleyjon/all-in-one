import { clamp } from './clamp';

/**
 * Maps a number from one range to another.
 *
 * @param value Input value.
 * @param inMin Input range minimum.
 * @param inMax Input range maximum.
 * @param outMin Output range minimum.
 * @param outMax Output range maximum.
 * @param clampOutput Whether output should be clamped to output bounds.
 * @returns Mapped value in output range.
 * @throws {RangeError} If inputs are invalid or input range has zero length.
 * @throws {TypeError} If `clampOutput` is not a boolean.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampOutput = false,
): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(inMin)) {
    throw new RangeError('inMin must be a finite number.');
  }

  if (!Number.isFinite(inMax)) {
    throw new RangeError('inMax must be a finite number.');
  }

  if (!Number.isFinite(outMin)) {
    throw new RangeError('outMin must be a finite number.');
  }

  if (!Number.isFinite(outMax)) {
    throw new RangeError('outMax must be a finite number.');
  }

  if (inMin === inMax) {
    throw new RangeError('inMin and inMax must be different.');
  }

  if (typeof clampOutput !== 'boolean') {
    throw new TypeError('clampOutput must be a boolean.');
  }

  const normalized = (value - inMin) / (inMax - inMin);
  const mapped = outMin + normalized * (outMax - outMin);

  if (!clampOutput) {
    return mapped;
  }

  const minOut = Math.min(outMin, outMax);
  const maxOut = Math.max(outMin, outMax);
  return clamp(mapped, minOut, maxOut);
}
