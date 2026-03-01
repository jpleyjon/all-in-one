import { parseDate } from '../datetime/parse-date';
import type { DateInput } from '../datetime/types';

/**
 * Checks whether start and end define a valid date range.
 *
 * @param start Start date input.
 * @param end End date input.
 * @param inclusive Whether equal timestamps are allowed.
 * @returns `true` when both dates are valid and in range order.
 * @throws {TypeError} If `inclusive` is not a boolean.
 */
export function isValidDateRange(start: DateInput, end: DateInput, inclusive = true): boolean {
  if (typeof inclusive !== 'boolean') {
    throw new TypeError('inclusive must be a boolean.');
  }

  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (startDate === null || endDate === null) {
    return false;
  }

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  return inclusive ? startTime <= endTime : startTime < endTime;
}
