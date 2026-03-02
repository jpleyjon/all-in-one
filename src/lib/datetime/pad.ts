/**
 * Left-pads a numeric value with zeros to a fixed width.
 *
 * @param value Number to pad.
 * @param width Target output width.
 * @returns Zero-padded string.
 */
export function pad(value: number, width: number): string {
  return String(value).padStart(width, '0');
}
