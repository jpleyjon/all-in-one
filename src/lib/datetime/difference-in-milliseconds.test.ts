import assert from 'node:assert';
import { describe, it } from 'node:test';
import { differenceInMilliseconds } from './difference-in-milliseconds';

describe('differenceInMilliseconds', () => {
  it('returns signed millisecond differences', () => {
    assert.equal(
      differenceInMilliseconds('2024-01-02T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
      86400000,
    );
    assert.equal(
      differenceInMilliseconds('2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z'),
      -86400000,
    );
  });

  it('throws for invalid date inputs', () => {
    assert.throws(() => differenceInMilliseconds('nope', '2024-01-01T00:00:00.000Z'), RangeError);
  });
});
