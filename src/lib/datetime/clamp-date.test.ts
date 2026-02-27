import assert from 'node:assert';
import { describe, it } from 'node:test';
import { clampDate } from './clamp-date';

describe('clampDate', () => {
  it('clamps values below and above bounds', () => {
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-01-10T00:00:00.000Z');

    assert.equal(
      clampDate(new Date('2023-12-30T00:00:00.000Z'), min, max).toISOString(),
      min.toISOString(),
    );
    assert.equal(
      clampDate(new Date('2024-01-20T00:00:00.000Z'), min, max).toISOString(),
      max.toISOString(),
    );
  });

  it('returns current date when already in range', () => {
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-01-10T00:00:00.000Z');

    assert.equal(
      clampDate(new Date('2024-01-05T00:00:00.000Z'), min, max).toISOString(),
      '2024-01-05T00:00:00.000Z',
    );
  });

  it('throws when min is greater than max', () => {
    assert.throws(
      () =>
        clampDate(
          new Date('2024-01-05T00:00:00.000Z'),
          new Date('2024-01-10T00:00:00.000Z'),
          new Date('2024-01-01T00:00:00.000Z'),
        ),
      RangeError,
      'min must be less than or equal to max.',
    );
  });
});
