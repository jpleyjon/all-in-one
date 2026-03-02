import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isPlainObject } from './is-plain-object';

describe('isPlainObject', () => {
  it('returns true for plain objects', () => {
    assert.equal(isPlainObject({ a: 1 }), true);
    assert.equal(isPlainObject(Object.create(null)), true);
  });

  it('returns false for non-plain values', () => {
    assert.equal(isPlainObject([]), false);
    assert.equal(isPlainObject(new Date()), false);
    assert.equal(isPlainObject(null), false);
  });
});
