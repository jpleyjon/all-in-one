/**
 * Asserts that a numeric value is an integer.
 *
 * @param value Number to validate.
 * @param name Parameter name used in error messages.
 * @throws If `value` is not an integer.
 */
export function assertInteger(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`${name} must be an integer.`);
  }
}
