import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isEmpty } from './is-empty';

describe('isEmpty', () => {
  it('should return true for empty arrays', () => {
    assert.equal(isEmpty([]), true);
  });

  it('should return false for non-empty arrays', () => {
    assert.equal(isEmpty([1]), false);
  });
});
