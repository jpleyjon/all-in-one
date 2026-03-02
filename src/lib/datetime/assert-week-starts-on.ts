/**
 * Asserts that a week-start index is valid.
 *
 * @param value Week start index.
 * @throws If `value` is not an integer in the range `0..6`.
 */
export function assertWeekStartsOn(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 6) {
    throw new RangeError('weekStartsOn must be an integer between 0 and 6.');
  }
}
