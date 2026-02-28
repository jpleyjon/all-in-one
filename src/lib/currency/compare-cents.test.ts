import assert from 'node:assert';
import { describe, it } from 'node:test';
import { compareCents } from './compare-cents';

describe('compareCents', () => {
  it('compares cent values', () => {
    assert.equal(compareCents(1, 2), -1);
    assert.equal(compareCents(2, 1), 1);
    assert.equal(compareCents(2, 2), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => compareCents(0.5, 1), RangeError, 'a must be a safe integer.');
    assert.throws(() => compareCents(1, 0.5), RangeError, 'b must be a safe integer.');
  });
});
