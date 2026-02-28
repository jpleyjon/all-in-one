import assert from 'node:assert';
import { describe, it } from 'node:test';
import { minCents } from './min-cents';

describe('minCents', () => {
  it('returns the minimum value', () => {
    assert.equal(minCents([300, -200, 100, 0]), -200);
  });

  it('returns undefined for empty values', () => {
    assert.equal(minCents([]), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => minCents([1.5]), RangeError, 'values[0] must be a safe integer.');
    assert.throws(() => minCents([1, 2.5]), RangeError, 'values[1] must be a safe integer.');
  });
});
