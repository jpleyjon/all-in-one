import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isFiniteNumber } from './is-finite-number';

describe('isFiniteNumber', () => {
  it('returns true for finite numbers', () => {
    assert.equal(isFiniteNumber(1), true);
    assert.equal(isFiniteNumber(-1.5), true);
  });

  it('returns false for non-finite numbers', () => {
    assert.equal(isFiniteNumber(Infinity), false);
    assert.equal(isFiniteNumber(Number.NaN), false);
  });

  it('returns false for non-number values', () => {
    assert.equal(isFiniteNumber('1'), false);
    assert.equal(isFiniteNumber(null), false);
  });
});
