import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isPositiveSafeInteger } from './is-positive-safe-integer';

describe('isPositiveSafeInteger', () => {
  it('returns true for positive safe integers', () => {
    assert.equal(isPositiveSafeInteger(1), true);
    assert.equal(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER), true);
  });

  it('returns false for non-positive or unsafe values', () => {
    assert.equal(isPositiveSafeInteger(0), false);
    assert.equal(isPositiveSafeInteger(-1), false);
    assert.equal(isPositiveSafeInteger(1.2), false);
    assert.equal(isPositiveSafeInteger(Number.MAX_SAFE_INTEGER + 1), false);
    assert.equal(isPositiveSafeInteger('1'), false);
  });
});
