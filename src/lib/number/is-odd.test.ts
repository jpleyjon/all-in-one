import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isOdd } from './is-odd';

describe('isOdd', () => {
  it('checks odd integers', () => {
    assert.equal(isOdd(3), true);
    assert.equal(isOdd(-3), true);
    assert.equal(isOdd(2), false);
    assert.equal(isOdd(2.5), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => isOdd(Number.NaN), RangeError, 'value must be a finite number.');
  });
});
