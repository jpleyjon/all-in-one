import assert from 'node:assert';
import { describe, it } from 'node:test';
import { sumNumbers } from './sum-numbers';

describe('sumNumbers', () => {
  it('sums finite values', () => {
    assert.equal(sumNumbers([1, 2, 3]), 6);
    assert.equal(sumNumbers([]), 0);
    assert.equal(sumNumbers([-1, 0.5]), -0.5);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => sumNumbers(1 as never), TypeError, 'values must be an array.');
    assert.throws(
      () => sumNumbers([1, Number.NaN]),
      RangeError,
      'values[1] must be a finite number.',
    );
  });
});
