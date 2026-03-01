import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mode } from './mode';

describe('mode', () => {
  it('returns mode values sorted', () => {
    assert.deepEqual(mode([1, 2, 2, 3]), [2]);
    assert.deepEqual(mode([3, 3, 1, 1, 2]), [1, 3]);
  });

  it('returns empty arrays when input is empty or has no repeats', () => {
    assert.deepEqual(mode([]), []);
    assert.deepEqual(mode([1, 2, 3]), []);
  });

  it('normalizes negative zero', () => {
    assert.deepEqual(mode([-0, 0, 1, 1]), [0, 1]);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => mode(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => mode([1, Number.NaN]), RangeError, 'values[1] must be a finite number.');
  });
});
