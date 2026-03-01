import assert from 'node:assert';
import { describe, it } from 'node:test';
import { min } from './min';

describe('min', () => {
  it('returns minimum value and undefined for empty arrays', () => {
    assert.equal(min([3, 1, 2]), 1);
    assert.equal(min([]), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => min(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => min([Number.NaN]), RangeError, 'values[0] must be a finite number.');
    assert.throws(() => min([1, Number.NaN]), RangeError, 'values[1] must be a finite number.');
  });
});
