import assert from 'node:assert';
import { describe, it } from 'node:test';
import { inRange } from './in-range';

describe('inRange', () => {
  it('checks inclusive ranges by default', () => {
    assert.equal(inRange(1, 1, 2), true);
    assert.equal(inRange(2, 1, 2), true);
    assert.equal(inRange(3, 1, 2), false);
  });

  it('supports exclusive ranges', () => {
    assert.equal(inRange(1, 1, 2, false), false);
    assert.equal(inRange(1.5, 1, 2, false), true);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => inRange(Number.NaN, 0, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => inRange(0, Number.NaN, 1), RangeError, 'min must be a finite number.');
    assert.throws(() => inRange(0, 0, Number.NaN), RangeError, 'max must be a finite number.');
    assert.throws(() => inRange(0, 2, 1), RangeError, 'min must be less than or equal to max.');
    assert.throws(() => inRange(0, 0, 1, 1 as never), TypeError, 'inclusive must be a boolean.');
  });
});
