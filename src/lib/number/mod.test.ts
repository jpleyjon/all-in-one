import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mod } from './mod';

describe('mod', () => {
  it('computes non-negative modulo', () => {
    assert.equal(mod(7, 5), 2);
    assert.equal(mod(-7, 5), 3);
    assert.equal(mod(7, -5), 2);
    assert.equal(Object.is(mod(-4, 2), -0), false);
    assert.equal(mod(-4, 2), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => mod(Number.NaN, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => mod(1, 0), RangeError, 'divisor must be a non-zero finite number.');
  });
});
