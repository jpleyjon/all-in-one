import assert from 'node:assert';
import { describe, it } from 'node:test';
import { almostEqual } from './almost-equal';

describe('almostEqual', () => {
  it('checks equality with epsilon', () => {
    assert.equal(almostEqual(1, 1 + Number.EPSILON, Number.EPSILON), true);
    assert.equal(almostEqual(1, 1.1, 0.01), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => almostEqual(Number.NaN, 1), RangeError, 'a must be a finite number.');
    assert.throws(() => almostEqual(1, Number.NaN), RangeError, 'b must be a finite number.');
    assert.throws(
      () => almostEqual(1, 1, -1),
      RangeError,
      'epsilon must be a non-negative finite number.',
    );
  });
});
