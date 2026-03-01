/**
 * Checks whether a value is an integer number.
 *
 * @param value Value to validate.
 * @returns `true` when `value` is an integer.
 */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}
