import assert from 'node:assert';
import { describe, it } from 'node:test';
import { between } from './between';

describe('between', () => {
  it('checks inclusive intervals by default', () => {
    assert.equal(between(1, 1, 2), true);
    assert.equal(between(2, 1, 2), true);
    assert.equal(between(3, 1, 2), false);
  });

  it('supports exclusive intervals and reversed bounds', () => {
    assert.equal(between(1, 1, 2, false), false);
    assert.equal(between(1.5, 1, 2, false), true);
    assert.equal(between(5, 10, 1), true);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => between(Number.NaN, 0, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => between(0, Number.NaN, 1), RangeError, 'a must be a finite number.');
    assert.throws(() => between(0, 0, Number.NaN), RangeError, 'b must be a finite number.');
    assert.throws(() => between(0, 0, 1, 1 as never), TypeError, 'inclusive must be a boolean.');
  });
});
