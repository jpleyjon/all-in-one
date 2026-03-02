/**
 * Checks whether a value is a non-null object.
 *
 * @param value Value to evaluate.
 * @returns `true` when `value` is an object and not `null`.
 */
export function isNonNullObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
