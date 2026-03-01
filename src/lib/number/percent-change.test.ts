import assert from 'node:assert';
import { describe, it } from 'node:test';
import { percentChange } from './percent-change';

describe('percentChange', () => {
  it('computes percentage changes', () => {
    assert.equal(percentChange(100, 120), 20);
    assert.equal(percentChange(120, 90), -25);
  });

  it('returns zero when both previous and current are zero', () => {
    assert.equal(percentChange(0, 0), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => percentChange(Number.NaN, 1),
      RangeError,
      'previous must be a finite number.',
    );
    assert.throws(
      () => percentChange(1, Number.NaN),
      RangeError,
      'current must be a finite number.',
    );
    assert.throws(
      () => percentChange(1, 1, -1),
      RangeError,
      'precision must be a non-negative integer.',
    );
    assert.throws(
      () => percentChange(0, 1),
      RangeError,
      'previous must not be zero when current is non-zero.',
    );
  });
});
