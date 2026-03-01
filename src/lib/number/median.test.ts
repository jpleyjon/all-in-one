import assert from 'node:assert';
import { describe, it } from 'node:test';
import { median } from './median';

describe('median', () => {
  it('computes odd and even medians', () => {
    assert.equal(median([3, 1, 2]), 2);
    assert.equal(median([1, 3, 2, 4]), 2.5);
  });

  it('returns undefined for empty arrays', () => {
    assert.equal(median([]), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => median(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => median([1, Number.NaN]), RangeError, 'values[1] must be a finite number.');
  });
});
