import assert from 'node:assert';
import { describe, it } from 'node:test';
import { percentageOfTotal } from './percentage-of-total';

describe('percentageOfTotal', () => {
  it('computes percentage with default precision', () => {
    assert.equal(percentageOfTotal(1, 3), 33.33);
    assert.equal(percentageOfTotal(250, 1000), 25);
  });

  it('supports custom precision', () => {
    assert.equal(percentageOfTotal(1, 3, 1), 33.3);
  });

  it('handles negative values and normalizes negative zero', () => {
    assert.equal(percentageOfTotal(-250, 1000), -25);

    const value = percentageOfTotal(-1, Number.MAX_SAFE_INTEGER);
    assert.equal(value, 0);
    assert.equal(Object.is(value, -0), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => percentageOfTotal(1.5, 100),
      RangeError,
      'partCents must be a safe integer.',
    );
    assert.throws(
      () => percentageOfTotal(100, 1.5),
      RangeError,
      'totalCents must be a safe integer.',
    );
    assert.throws(() => percentageOfTotal(100, 0), RangeError, 'totalCents must not be 0.');
    assert.throws(
      () => percentageOfTotal(100, 200, -1),
      RangeError,
      'precision must be a non-negative integer.',
    );
  });
});
