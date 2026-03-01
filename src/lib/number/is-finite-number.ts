/**
 * Checks whether a value is a finite number.
 *
 * @param value Value to validate.
 * @returns `true` when `value` is a finite number.
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
