/**
 * Checks whether a value is a safe integer.
 *
 * @param value Value to validate.
 * @returns `true` when `value` is a safe integer.
 */
export function isSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value);
}
