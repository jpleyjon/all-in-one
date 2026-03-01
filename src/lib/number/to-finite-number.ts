/**
 * Converts a value to a finite number.
 *
 * @param input Value to convert.
 * @param fallback Optional fallback used when conversion fails.
 * @returns Parsed finite number.
 * @throws {RangeError} If `fallback` is provided and is not finite.
 * @throws {TypeError} If conversion fails and no fallback is provided.
 */
export function toFiniteNumber(input: unknown, fallback?: number): number {
  if (fallback !== undefined && !Number.isFinite(fallback)) {
    throw new RangeError('fallback must be a finite number.');
  }

  if (typeof input === 'number' && Number.isFinite(input)) {
    return input;
  }

  if (typeof input === 'string' && input.trim() !== '') {
    const parsed = Number(input);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new TypeError('input must be a finite number or numeric string.');
}
