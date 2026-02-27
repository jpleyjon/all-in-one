import assert from 'node:assert';
import { describe, it } from 'node:test';
import { startOfWeek } from './start-of-week';

describe('startOfWeek', () => {
  it('returns week start for Sunday-based weeks', () => {
    const output = startOfWeek(new Date(2024, 1, 14));

    assert.equal(output.getDay(), 0);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [0, 0, 0, 0],
    );
  });

  it('returns week start for Monday-based weeks', () => {
    const output = startOfWeek(new Date(2024, 1, 14), 1);

    assert.equal(output.getDay(), 1);
  });

  it('throws for invalid weekStartsOn', () => {
    assert.throws(
      () => startOfWeek(new Date(), -1),
      RangeError,
      'weekStartsOn must be an integer between 0 and 6.',
    );
  });
});
