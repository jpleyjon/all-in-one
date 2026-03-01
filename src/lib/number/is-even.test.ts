import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isEven } from './is-even';

describe('isEven', () => {
  it('checks even integers', () => {
    assert.equal(isEven(2), true);
    assert.equal(isEven(-4), true);
    assert.equal(isEven(3), false);
    assert.equal(isEven(2.5), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => isEven(Number.NaN), RangeError, 'value must be a finite number.');
  });
});
