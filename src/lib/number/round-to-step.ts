export type RoundToStepMode =
  | 'half-up'
  | 'half-even'
  | 'up'
  | 'down'
  | 'toward-zero'
  | 'away-from-zero';

function isSupportedMode(mode: string): mode is RoundToStepMode {
  return (
    mode === 'half-up' ||
    mode === 'half-even' ||
    mode === 'up' ||
    mode === 'down' ||
    mode === 'toward-zero' ||
    mode === 'away-from-zero'
  );
}

function roundHalfEven(value: number): number {
  const truncated = Math.trunc(value);
  const fraction = Math.abs(value - truncated);

  if (fraction < 0.5) {
    return truncated;
  }

  if (fraction > 0.5) {
    return truncated + Math.sign(value);
  }

  return truncated % 2 === 0 ? truncated : truncated + Math.sign(value);
}

function countFractionDigits(value: number): number {
  const text = value.toString().toLowerCase();
  const exponentIndex = text.indexOf('e');

  if (exponentIndex === -1) {
    return text.split('.')[1]?.length ?? 0;
  }

  const coefficient = text.slice(0, exponentIndex);
  const exponent = Number(text.slice(exponentIndex + 1));
  const coefficientFractionDigits = coefficient.split('.')[1]?.length ?? 0;

  return Math.max(0, coefficientFractionDigits - exponent);
}

function applyRounding(value: number, mode: RoundToStepMode): number {
  if (mode === 'half-up') {
    return value >= 0 ? Math.floor(value + 0.5) : Math.ceil(value - 0.5);
  }

  if (mode === 'half-even') {
    return roundHalfEven(value);
  }

  if (mode === 'up') {
    return Math.ceil(value);
  }

  if (mode === 'down') {
    return Math.floor(value);
  }

  if (mode === 'toward-zero') {
    return Math.trunc(value);
  }

  return value < 0 ? Math.floor(value) : Math.ceil(value);
}

/**
 * Rounds a number to the nearest step increment.
 *
 * @param value Number to round.
 * @param step Positive increment step.
 * @param mode Rounding mode.
 * @returns Rounded value aligned to `step`.
 * @throws {RangeError} If values are invalid.
 * @throws {TypeError} If `mode` is not supported.
 */
export function roundToStep(
  value: number,
  step: number,
  mode: RoundToStepMode = 'half-up',
): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError('step must be a positive finite number.');
  }

  if (!isSupportedMode(mode)) {
    throw new TypeError('mode must be a supported rounding mode.');
  }

  const scaled = value / step;
  const rounded = applyRounding(scaled, mode) * step;
  const normalized = Number(rounded.toFixed(countFractionDigits(step)));

  return Object.is(rounded, -0) ? 0 : normalized;
}
