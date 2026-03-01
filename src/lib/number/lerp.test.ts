import assert from 'node:assert';
import { describe, it } from 'node:test';
import { lerp } from './lerp';

describe('lerp', () => {
  it('interpolates between start and end values', () => {
    assert.equal(lerp(0, 10, 0), 0);
    assert.equal(lerp(0, 10, 0.5), 5);
    assert.equal(lerp(0, 10, 1), 10);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => lerp(Number.NaN, 1, 0.5), RangeError, 'start must be a finite number.');
    assert.throws(() => lerp(1, Number.NaN, 0.5), RangeError, 'end must be a finite number.');
    assert.throws(() => lerp(1, 1, Number.NaN), RangeError, 't must be a finite number.');
  });
});
