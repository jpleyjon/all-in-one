import assert from 'node:assert';
import { describe, it } from 'node:test';
import { endOfWeek } from './end-of-week';

describe('endOfWeek', () => {
  it('returns end of week with default week start (Sunday)', () => {
    const output = endOfWeek(new Date(2024, 1, 14));

    assert.equal(output.getDay(), 6);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [23, 59, 59, 999],
    );
  });

  it('returns end of week when week starts on Monday', () => {
    const output = endOfWeek(new Date(2024, 1, 14), 1);

    assert.equal(output.getDay(), 0);
  });

  it('throws for invalid weekStartsOn', () => {
    assert.throws(
      () => endOfWeek(new Date(), 7),
      RangeError,
      'weekStartsOn must be an integer between 0 and 6.',
    );
  });
});
