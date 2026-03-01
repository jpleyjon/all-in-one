import assert from 'node:assert';
import { describe, it } from 'node:test';
import { percent } from './percent';

describe('percent', () => {
  it('computes percentages with precision', () => {
    assert.equal(percent(25, 100), 25);
    assert.equal(percent(1, 3, 3), 33.333);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => percent(Number.NaN, 1), RangeError, 'part must be a finite number.');
    assert.throws(() => percent(1, Number.NaN), RangeError, 'total must be a finite number.');
    assert.throws(() => percent(1, 0), RangeError, 'total must not be zero.');
    assert.throws(() => percent(1, 1, -1), RangeError, 'precision must be a non-negative integer.');
    assert.throws(
      () => percent(1, 1, 1.1),
      RangeError,
      'precision must be a non-negative integer.',
    );
  });
});
