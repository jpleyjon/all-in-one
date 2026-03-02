import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNonNullObject } from './is-non-null-object';

describe('isNonNullObject', () => {
  it('returns true for non-null objects', () => {
    assert.equal(isNonNullObject({}), true);
    assert.equal(isNonNullObject([]), true);
  });

  it('returns false for null and primitives', () => {
    assert.equal(isNonNullObject(null), false);
    assert.equal(isNonNullObject('value'), false);
    assert.equal(isNonNullObject(1), false);
  });
});
