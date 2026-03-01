/**
 * Checks whether a value is a non-empty string after trimming.
 *
 * @param value Value to validate.
 * @returns `true` when value is a non-empty trimmed string.
 */
export function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
