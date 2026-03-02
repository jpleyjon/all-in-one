/**
 * Asserts that a numeric value is finite.
 *
 * @param value Number to validate.
 * @param name Parameter name used in error messages.
 * @throws If `value` is not finite.
 */
export function assertFiniteNumber(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number.`);
  }
}
