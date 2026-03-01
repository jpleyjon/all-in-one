import assert from 'node:assert';
import { describe, it } from 'node:test';
import { quantile } from './quantile';

describe('quantile', () => {
  it('computes min, max, exact index, and interpolated quantiles', () => {
    assert.equal(quantile([5, 1, 3], 0), 1);
    assert.equal(quantile([5, 1, 3], 1), 5);
    assert.equal(quantile([1, 2, 3, 4, 5], 0.5), 3);
    assert.equal(quantile([1, 2, 3, 4], 0.25), 1.75);
  });

  it('returns undefined for empty arrays', () => {
    assert.equal(quantile([], 0.5), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => quantile(1 as never, 0.5), TypeError, 'values must be an array.');
    assert.throws(
      () => quantile([1], Number.NaN),
      RangeError,
      'q must be a finite number between 0 and 1.',
    );
    assert.throws(
      () => quantile([1], -0.1),
      RangeError,
      'q must be a finite number between 0 and 1.',
    );
    assert.throws(
      () => quantile([1], 1.1),
      RangeError,
      'q must be a finite number between 0 and 1.',
    );
    assert.throws(
      () => quantile([1, Number.NaN], 0.5),
      RangeError,
      'values[1] must be a finite number.',
    );
  });
});
