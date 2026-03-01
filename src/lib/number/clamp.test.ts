import assert from 'node:assert';
import { describe, it } from 'node:test';
import { clamp } from './clamp';

describe('clamp', () => {
  it('clamps values within bounds', () => {
    assert.equal(clamp(5, 1, 10), 5);
    assert.equal(clamp(-1, 0, 10), 0);
    assert.equal(clamp(11, 0, 10), 10);
  });

  it('throws for invalid values', () => {
    assert.throws(() => clamp(Number.NaN, 0, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => clamp(1, Number.NaN, 1), RangeError, 'min must be a finite number.');
    assert.throws(() => clamp(1, 0, Number.NaN), RangeError, 'max must be a finite number.');
    assert.throws(() => clamp(1, 2, 1), RangeError, 'min must be less than or equal to max.');
  });
});
