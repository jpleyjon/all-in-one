import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Returns the latest date in a collection.
 *
 * @param dates Date list.
 * @returns Latest date or undefined for empty input.
 */
export function maxDate(dates: readonly DateInput[]): Date | undefined {
  if (dates.length === 0) {
    return undefined;
  }

  let maximum = requireDate(dates[0], 'dates[0]').getTime();

  for (let index = 1; index < dates.length; index += 1) {
    const current = requireDate(dates[index], `dates[${index}]`).getTime();

    if (current > maximum) {
      maximum = current;
    }
  }

  return new Date(maximum);
}
