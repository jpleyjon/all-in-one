import assert from 'node:assert';
import { describe, it } from 'node:test';
import { max } from './max';

describe('max', () => {
  it('returns maximum value and undefined for empty arrays', () => {
    assert.equal(max([3, 1, 2]), 3);
    assert.equal(max([1, 3, 2]), 3);
    assert.equal(max([]), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => max(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => max([Number.NaN]), RangeError, 'values[0] must be a finite number.');
    assert.throws(() => max([1, Number.NaN]), RangeError, 'values[1] must be a finite number.');
  });
});
