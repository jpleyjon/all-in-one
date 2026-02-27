import assert from 'node:assert';
import { describe, it } from 'node:test';
import { minDate } from './min-date';

describe('minDate', () => {
  it('returns undefined for empty lists', () => {
    assert.equal(minDate([]), undefined);
  });

  it('returns the earliest date', () => {
    const result = minDate([
      new Date('2024-01-03T00:00:00.000Z'),
      new Date('2024-01-01T00:00:00.000Z'),
      new Date('2024-01-02T00:00:00.000Z'),
    ]);

    assert.equal(result?.toISOString(), '2024-01-01T00:00:00.000Z');
  });

  it('throws for invalid entries', () => {
    assert.throws(
      () => minDate([new Date('2024-01-01T00:00:00.000Z'), 'invalid']),
      RangeError,
      'dates[1] must be a valid date.',
    );
  });
});
