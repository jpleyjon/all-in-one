import assert from 'node:assert';
import { describe, it } from 'node:test';
import { weightedAllocateCents } from './weighted-allocate-cents';

describe('weightedAllocateCents', () => {
  it('allocates cents by weight and preserves totals', () => {
    const result = weightedAllocateCents(100, [1, 2, 3]);

    assert.deepEqual(result, [17, 33, 50]);
    assert.equal(
      result.reduce((total, value) => total + value, 0),
      100,
    );
  });

  it('allocates negative totals by weight and preserves totals', () => {
    const result = weightedAllocateCents(-100, [1, 2, 3]);

    assert.deepEqual(result, [-17, -33, -50]);
    assert.equal(
      result.reduce((total, value) => total + value, 0),
      -100,
    );
  });

  it('handles zero total', () => {
    assert.deepEqual(weightedAllocateCents(0, [1, 2, 3]), [0, 0, 0]);
  });

  it('uses stable tie-breaking for equal fractions', () => {
    assert.deepEqual(weightedAllocateCents(2, [1, 1, 1]), [1, 1, 0]);
  });

  it('throws for invalid cents and weights', () => {
    assert.throws(
      () => weightedAllocateCents(1.5, [1]),
      RangeError,
      'cents must be a safe integer.',
    );
    assert.throws(
      () => weightedAllocateCents(10, []),
      RangeError,
      'weights must contain at least one value.',
    );
    assert.throws(
      () => weightedAllocateCents(10, [1, -1]),
      RangeError,
      'weights[1] must be a non-negative finite number.',
    );
    assert.throws(
      () => weightedAllocateCents(10, [1, Number.POSITIVE_INFINITY]),
      RangeError,
      'weights[1] must be a non-negative finite number.',
    );
    assert.throws(
      () => weightedAllocateCents(10, [0, 0]),
      RangeError,
      'weights must contain at least one value greater than 0.',
    );
  });
});
