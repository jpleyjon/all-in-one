export type RoundingMode = 'half-up' | 'half-even' | 'down' | 'up';

const ROUNDING_MODES: readonly RoundingMode[] = ['half-up', 'half-even', 'down', 'up'];

function roundHalfUp(value: number): number {
  const sign = value < 0 ? -1 : 1;
  const absolute = Math.abs(value);
  return sign * Math.floor(absolute + 0.5 + Number.EPSILON);
}

function roundHalfEven(value: number): number {
  const sign = value < 0 ? -1 : 1;
  const absolute = Math.abs(value);

  const lower = Math.floor(absolute);
  const fractional = absolute - lower;

  if (fractional < 0.5 - Number.EPSILON) {
    return sign * lower;
  }

  if (fractional > 0.5 + Number.EPSILON) {
    return sign * (lower + 1);
  }

  const even = lower % 2 === 0 ? lower : lower + 1;
  return sign * even;
}

/**
 * Multiplies cents by a factor and rounds to integer cents.
 *
 * @param cents Amount in cents.
 * @param factor Multiplication factor.
 * @param mode Rounding mode.
 * @returns Rounded cent value.
 * @throws {RangeError} If inputs are invalid.
 */
export function multiplyCents(
  cents: number,
  factor: number,
  mode: RoundingMode = 'half-up',
): number {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  if (!Number.isFinite(factor)) {
    throw new RangeError('factor must be a finite number.');
  }

  if (!ROUNDING_MODES.includes(mode)) {
    throw new RangeError("mode must be one of: 'half-up', 'half-even', 'down', 'up'.");
  }

  const product = cents * factor;

  if (!Number.isFinite(product)) {
    throw new RangeError('result is out of numeric range.');
  }

  let rounded: number;

  if (mode === 'half-up') {
    rounded = roundHalfUp(product);
  } else if (mode === 'half-even') {
    rounded = roundHalfEven(product);
  } else if (mode === 'down') {
    rounded = Math.floor(product);
  } else {
    rounded = Math.ceil(product);
  }

  if (!Number.isSafeInteger(rounded)) {
    throw new RangeError('result is out of safe integer range.');
  }

  return rounded;
}
