import assert from 'node:assert';
import { describe, it } from 'node:test';
import { averageCents } from './average-cents';

describe('averageCents', () => {
  it('returns average cents with half-up by default', () => {
    assert.equal(averageCents([1, 2]), 2);
    assert.equal(averageCents([100, 200, 300]), 200);
  });

  it('supports custom rounding mode', () => {
    assert.equal(averageCents([2, 3], 'half-even'), 2);
    assert.equal(averageCents([1, 2], 'up'), 2);
  });

  it('returns zero for empty values', () => {
    assert.equal(averageCents([]), 0);
  });

  it('throws for invalid values and mode', () => {
    assert.throws(() => averageCents([1, 2.5]), RangeError, 'values[1] must be a safe integer.');
    assert.throws(
      () => averageCents([1, 2], 'invalid' as never),
      RangeError,
      "mode must be one of: 'half-up', 'half-even', 'down', 'up'.",
    );
  });
});
