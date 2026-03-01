import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mean } from './mean';

describe('mean', () => {
  it('computes means and handles empty arrays', () => {
    assert.equal(mean([1, 2, 3]), 2);
    assert.equal(mean([]), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => mean(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => mean([1, Number.NaN]), RangeError, 'values[1] must be a finite number.');
  });
});
