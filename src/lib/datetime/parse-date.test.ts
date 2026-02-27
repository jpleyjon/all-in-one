import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseDate } from './parse-date';

describe('parseDate', () => {
  it('parses valid inputs and clones Date values', () => {
    const date = new Date(2024, 0, 10, 12, 30, 45, 123);

    const parsedDate = parseDate(date);
    const parsedString = parseDate('2024-01-10T12:30:45.123Z');
    const parsedNumber = parseDate(1704899445123);

    assert.notStrictEqual(parsedDate, date);
    assert.equal(parsedDate?.getTime(), date.getTime());
    assert.equal(parsedString?.toISOString(), '2024-01-10T12:30:45.123Z');
    assert.equal(parsedNumber?.getTime(), 1704899445123);
  });

  it('returns null for invalid inputs', () => {
    assert.equal(parseDate(new Date('invalid')), null);
    assert.equal(parseDate('not-a-date'), null);
  });
});
