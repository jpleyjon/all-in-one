import assert from 'node:assert';
import { describe, it } from 'node:test';
import { maxCents } from './max-cents';

describe('maxCents', () => {
  it('returns the maximum value', () => {
    assert.equal(maxCents([300, -200, 100, 0]), 300);
    assert.equal(maxCents([100, 300, -200]), 300);
  });

  it('returns undefined for empty values', () => {
    assert.equal(maxCents([]), undefined);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => maxCents([1.5]), RangeError, 'values[0] must be a safe integer.');
    assert.throws(() => maxCents([1, 2.5]), RangeError, 'values[1] must be a safe integer.');
  });
});
