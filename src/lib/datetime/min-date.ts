import type { DateInput } from './types';
import { requireDate } from './internal';

/**
 * Returns the earliest date in a collection.
 *
 * @param dates Date list.
 * @returns Earliest date or undefined for empty input.
 */
export function minDate(dates: readonly DateInput[]): Date | undefined {
  if (dates.length === 0) {
    return undefined;
  }

  let minimum = requireDate(dates[0], 'dates[0]').getTime();

  for (let index = 1; index < dates.length; index += 1) {
    const current = requireDate(dates[index], `dates[${index}]`).getTime();

    if (current < minimum) {
      minimum = current;
    }
  }

  return new Date(minimum);
}
