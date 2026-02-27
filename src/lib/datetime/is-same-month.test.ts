import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isSameMonth } from './is-same-month';

describe('isSameMonth', () => {
  it('returns true for dates in the same month', () => {
    assert.equal(isSameMonth(new Date(2024, 0, 1), new Date(2024, 0, 20)), true);
  });

  it('returns false for dates in different months', () => {
    assert.equal(isSameMonth(new Date(2024, 0, 1), new Date(2024, 1, 1)), false);
  });
});
