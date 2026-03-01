/**
 * Checks whether a value is a hex color string.
 *
 * @param value Value to validate.
 * @returns `true` when value is a valid hex color.
 */
export function isHexColor(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
}
