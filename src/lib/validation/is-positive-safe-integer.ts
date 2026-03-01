/**
 * Checks whether a value is a positive safe integer.
 *
 * @param value Value to validate.
 * @returns `true` when value is a positive safe integer.
 */
export function isPositiveSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}
