import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as datetime from '.';

describe('datetime index', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'addDays',
      'addMonths',
      'addYears',
      'clampDate',
      'differenceInDays',
      'differenceInHours',
      'differenceInMilliseconds',
      'differenceInMinutes',
      'differenceInSeconds',
      'endOfDay',
      'endOfMonth',
      'endOfWeek',
      'endOfYear',
      'formatDate',
      'fromUnixTimestamp',
      'getDaysInMonth',
      'getWeekday',
      'humanizeDuration',
      'isAfter',
      'isBefore',
      'isSameDay',
      'isSameMonth',
      'isToday',
      'isTomorrow',
      'isValidDate',
      'isYesterday',
      'maxDate',
      'minDate',
      'parseDate',
      'startOfDay',
      'startOfMonth',
      'startOfWeek',
      'startOfYear',
      'subtractDays',
      'subtractMonths',
      'subtractYears',
      'toISODate',
      'toISODateTime',
      'toLocalTime',
      'toUTC',
      'toUnixTimestamp',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (datetime as Record<string, unknown>)[name], 'function');
    });
  });
});
