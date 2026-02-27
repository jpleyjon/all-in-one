import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Clamps a date between min and max bounds.
 *
 * @param date Date input.
 * @param min Lower bound.
 * @param max Upper bound.
 * @returns Clamped date.
 * @throws {RangeError} If min is after max.
 */
export function clampDate(date: DateInput, min: DateInput, max: DateInput): Date {
  const current = requireDate(date, 'date');
  const minDateValue = requireDate(min, 'min');
  const maxDateValue = requireDate(max, 'max');

  if (minDateValue.getTime() > maxDateValue.getTime()) {
    throw new RangeError('min must be less than or equal to max.');
  }

  if (current.getTime() < minDateValue.getTime()) {
    return minDateValue;
  }

  if (current.getTime() > maxDateValue.getTime()) {
    return maxDateValue;
  }

  return current;
}
