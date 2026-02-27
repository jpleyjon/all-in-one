import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  addDays,
  addMonths,
  addYears,
  clampDate,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  formatDate,
  fromUnixTimestamp,
  getDaysInMonth,
  getWeekday,
  humanizeDuration,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isTomorrow,
  isValidDate,
  isYesterday,
  maxDate,
  minDate,
  parseDate,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subtractDays,
  subtractMonths,
  subtractYears,
  toISODate,
  toISODateTime,
  toLocalTime,
  toUTC,
  toUnixTimestamp,
} from './datetime';

describe('datetime', () => {
  it('parseDate and isValidDate should parse expected date inputs', () => {
    const inputDate = new Date(2024, 0, 10, 12, 30, 45, 123);
    const parsedFromDate = parseDate(inputDate);
    const parsedFromString = parseDate('2024-01-10T12:30:45.123Z');
    const parsedFromNumber = parseDate(1704899445123);

    assert.ok(parsedFromDate instanceof Date);
    assert.notStrictEqual(parsedFromDate, inputDate);
    assert.equal(parsedFromDate?.getTime(), inputDate.getTime());
    assert.equal(parsedFromString?.toISOString(), '2024-01-10T12:30:45.123Z');
    assert.equal(parsedFromNumber?.getTime(), 1704899445123);
    assert.equal(parseDate(new Date('invalid')), null);
    assert.equal(parseDate('not-a-date'), null);
    assert.equal(isValidDate(inputDate), true);
    assert.equal(isValidDate('not-a-date'), false);
  });

  it('formatDate should format supported tokens', () => {
    const input = new Date(2024, 0, 10, 5, 6, 7, 8);
    assert.equal(formatDate(input, 'YYYY-MM-DD HH:mm:ss.SSS'), '2024-01-10 05:06:07.008');
    assert.equal(formatDate(input, 'DD/MM/YYYY'), '10/01/2024');
    assert.throws(() => formatDate('invalid', 'YYYY'), RangeError, 'date must be a valid date.');
  });

  it('toISODate and toISODateTime should return ISO strings', () => {
    const input = '2024-01-10T12:30:45.123Z';
    assert.equal(toISODate(input), '2024-01-10');
    assert.equal(toISODateTime(input), '2024-01-10T12:30:45.123Z');
  });

  it('add and subtract helpers should adjust date values', () => {
    const base = new Date(2024, 0, 31, 12, 0, 0, 0);

    assert.equal(addDays(base, 2).getDate(), 2);
    assert.equal(addMonths(base, 1).getMonth(), 2);
    assert.equal(addYears(base, 1).getFullYear(), 2025);

    assert.equal(subtractDays(base, 2).getDate(), 29);
    assert.equal(subtractMonths(base, 1).getMonth(), 11);
    assert.equal(subtractYears(base, 1).getFullYear(), 2023);

    assert.throws(() => addDays(base, 1.5), RangeError, 'amount must be an integer.');
    assert.throws(() => subtractMonths(base, 1.2), RangeError, 'amount must be an integer.');
  });

  it('start and end helpers should create normalized boundaries', () => {
    const input = new Date(2024, 1, 13, 10, 20, 30, 400);

    const dayStart = startOfDay(input);
    const dayEnd = endOfDay(input);

    assert.deepEqual(
      [
        dayStart.getHours(),
        dayStart.getMinutes(),
        dayStart.getSeconds(),
        dayStart.getMilliseconds(),
      ],
      [0, 0, 0, 0],
    );
    assert.deepEqual(
      [dayEnd.getHours(), dayEnd.getMinutes(), dayEnd.getSeconds(), dayEnd.getMilliseconds()],
      [23, 59, 59, 999],
    );

    const weekStartSunday = startOfWeek(new Date(2024, 1, 14));
    const weekStartMonday = startOfWeek(new Date(2024, 1, 14), 1);
    const weekEndMonday = endOfWeek(new Date(2024, 1, 14), 1);

    assert.equal(weekStartSunday.getDay(), 0);
    assert.equal(weekStartMonday.getDay(), 1);
    assert.equal(weekEndMonday.getDay(), 0);
    assert.equal(weekEndMonday.getHours(), 23);
    assert.throws(
      () => startOfWeek(new Date(), 9),
      RangeError,
      'weekStartsOn must be an integer between 0 and 6.',
    );

    const monthStart = startOfMonth(input);
    const monthEnd = endOfMonth(input);
    const yearStart = startOfYear(input);
    const yearEnd = endOfYear(input);

    assert.deepEqual([monthStart.getDate(), monthStart.getHours()], [1, 0]);
    assert.equal(monthEnd.getDate(), 29);
    assert.equal(monthEnd.getHours(), 23);
    assert.deepEqual([yearStart.getMonth(), yearStart.getDate()], [0, 1]);
    assert.deepEqual([yearEnd.getMonth(), yearEnd.getDate(), yearEnd.getHours()], [11, 31, 23]);
  });

  it('difference helpers should return signed truncated values', () => {
    const left = new Date('2024-01-03T12:30:30.500Z');
    const right = new Date('2024-01-01T00:00:00.000Z');

    assert.equal(differenceInDays(left, right), 2);
    assert.equal(differenceInHours(left, right), 60);
    assert.equal(differenceInMinutes(left, right), 3630);
    assert.equal(differenceInSeconds(left, right), 217830);
    assert.equal(differenceInDays(right, left), -2);
    assert.throws(() => differenceInHours('invalid', right), RangeError, 'a must be a valid date.');
  });

  it('comparison helpers should compare dates correctly', () => {
    const early = new Date(2024, 0, 1, 10);
    const late = new Date(2024, 0, 2, 9);

    assert.equal(isBefore(early, late), true);
    assert.equal(isBefore(late, early), false);
    assert.equal(isAfter(late, early), true);
    assert.equal(isAfter(early, late), false);
    assert.equal(isSameDay(new Date(2024, 0, 1, 1), new Date(2024, 0, 1, 23)), true);
    assert.equal(isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 2)), false);
    assert.equal(isSameMonth(new Date(2024, 0, 1), new Date(2024, 0, 20)), true);
    assert.equal(isSameMonth(new Date(2024, 0, 1), new Date(2024, 1, 1)), false);
  });

  it('today helpers should match relative days', () => {
    const now = new Date();
    assert.equal(isToday(now), true);
    assert.equal(isYesterday(subtractDays(now, 1)), true);
    assert.equal(isTomorrow(addDays(now, 1)), true);
    assert.equal(isYesterday(now), false);
    assert.equal(isTomorrow(now), false);
  });

  it('minDate and maxDate should select dates from collections', () => {
    const a = new Date('2024-01-10T00:00:00.000Z');
    const b = new Date('2024-01-09T00:00:00.000Z');
    const c = new Date('2024-01-11T00:00:00.000Z');

    const min = minDate([a, b, c]);
    const max = maxDate([a, b, c]);

    assert.equal(min?.toISOString(), b.toISOString());
    assert.equal(max?.toISOString(), c.toISOString());
    assert.equal(minDate([]), undefined);
    assert.equal(maxDate([]), undefined);
    assert.throws(() => minDate([a, 'invalid']), RangeError, 'dates[1] must be a valid date.');
    assert.throws(() => maxDate([a, 'invalid']), RangeError, 'dates[1] must be a valid date.');
  });

  it('clampDate should clamp values inside date bounds', () => {
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-01-10T00:00:00.000Z');

    assert.equal(
      clampDate(new Date('2023-12-01T00:00:00.000Z'), min, max).toISOString(),
      min.toISOString(),
    );
    assert.equal(
      clampDate(new Date('2024-02-01T00:00:00.000Z'), min, max).toISOString(),
      max.toISOString(),
    );
    assert.equal(
      clampDate(new Date('2024-01-05T00:00:00.000Z'), min, max).toISOString(),
      '2024-01-05T00:00:00.000Z',
    );
    assert.throws(
      () => clampDate(new Date('2024-01-05T00:00:00.000Z'), max, min),
      RangeError,
      'min must be less than or equal to max.',
    );
  });

  it('month and weekday helpers should return expected values', () => {
    assert.equal(getDaysInMonth(new Date(2024, 1, 1)), 29);
    assert.equal(getDaysInMonth(new Date(2023, 1, 1)), 28);
    assert.equal(getWeekday(new Date(2024, 0, 7)), 0);
    assert.equal(getWeekday(new Date(2024, 0, 8)), 1);
  });

  it('unix timestamp helpers should convert correctly', () => {
    assert.equal(fromUnixTimestamp(1).toISOString(), '1970-01-01T00:00:01.000Z');
    assert.equal(toUnixTimestamp('1970-01-01T00:00:01.999Z'), 1);
    assert.throws(
      () => fromUnixTimestamp(Number.POSITIVE_INFINITY),
      RangeError,
      'seconds must be a finite number.',
    );
  });

  it('utc/local helpers should map date components as expected', () => {
    const local = new Date(2024, 5, 15, 10, 20, 30, 400);
    const utcAdjusted = toUTC(local);
    const localAdjusted = toLocalTime(utcAdjusted);

    assert.deepEqual(
      [
        utcAdjusted.getUTCFullYear(),
        utcAdjusted.getUTCMonth(),
        utcAdjusted.getUTCDate(),
        utcAdjusted.getUTCHours(),
        utcAdjusted.getUTCMinutes(),
        utcAdjusted.getUTCSeconds(),
        utcAdjusted.getUTCMilliseconds(),
      ],
      [
        local.getFullYear(),
        local.getMonth(),
        local.getDate(),
        local.getHours(),
        local.getMinutes(),
        local.getSeconds(),
        local.getMilliseconds(),
      ],
    );

    assert.deepEqual(
      [
        localAdjusted.getFullYear(),
        localAdjusted.getMonth(),
        localAdjusted.getDate(),
        localAdjusted.getHours(),
        localAdjusted.getMinutes(),
        localAdjusted.getSeconds(),
        localAdjusted.getMilliseconds(),
      ],
      [
        utcAdjusted.getUTCFullYear(),
        utcAdjusted.getUTCMonth(),
        utcAdjusted.getUTCDate(),
        utcAdjusted.getUTCHours(),
        utcAdjusted.getUTCMinutes(),
        utcAdjusted.getUTCSeconds(),
        utcAdjusted.getUTCMilliseconds(),
      ],
    );
  });

  it('humanizeDuration should format and validate duration values', () => {
    assert.equal(humanizeDuration(0), '0ms');
    assert.equal(humanizeDuration(90061001), '1d 1h 1m 1s 1ms');
    assert.equal(humanizeDuration(3600000), '1h');
    assert.equal(humanizeDuration(550), '550ms');
    assert.equal(humanizeDuration(-65000), '-1m 5s');
    assert.equal(humanizeDuration(0.9), '0ms');
    assert.throws(
      () => humanizeDuration(Number.NEGATIVE_INFINITY),
      RangeError,
      'milliseconds must be a finite number.',
    );
  });
});
