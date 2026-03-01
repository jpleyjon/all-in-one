import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isSafeInteger } from './is-safe-integer';

describe('isSafeInteger', () => {
  it('returns true for safe integers', () => {
    assert.equal(isSafeInteger(1), true);
    assert.equal(isSafeInteger(Number.MAX_SAFE_INTEGER), true);
  });

  it('returns false for unsafe numbers', () => {
    assert.equal(isSafeInteger(Number.MAX_SAFE_INTEGER + 1), false);
    assert.equal(isSafeInteger(1.2), false);
  });

  it('returns false for non-number values', () => {
    assert.equal(isSafeInteger('1'), false);
  });
});
