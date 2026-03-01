/**
 * Coerces a value to a finite number when possible.
 *
 * @param input Value to coerce.
 * @returns Finite number, or `null` when conversion is not possible.
 */
export function coerceNumber(input: unknown): number | null {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : null;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();

    if (trimmed.length === 0) {
      return null;
    }

    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}
