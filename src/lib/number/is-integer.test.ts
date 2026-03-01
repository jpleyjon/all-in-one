import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isInteger } from './is-integer';

describe('isInteger', () => {
  it('returns true for integers', () => {
    assert.equal(isInteger(1), true);
    assert.equal(isInteger(-10), true);
  });

  it('returns false for decimals and non-finite numbers', () => {
    assert.equal(isInteger(1.2), false);
    assert.equal(isInteger(Infinity), false);
  });

  it('returns false for non-number values', () => {
    assert.equal(isInteger('1'), false);
  });
});
