import assert from 'node:assert';
import { describe, it } from 'node:test';
import { splitEvenCents } from './split-even-cents';

describe('splitEvenCents', () => {
  it('splits cents evenly while preserving totals', () => {
    assert.deepEqual(splitEvenCents(10, 3), [4, 3, 3]);
    assert.deepEqual(splitEvenCents(-10, 3), [-4, -3, -3]);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => splitEvenCents(1.5, 2), RangeError, 'cents must be a safe integer.');
    assert.throws(() => splitEvenCents(10, 0), RangeError, 'parts must be a positive integer.');
  });
});
