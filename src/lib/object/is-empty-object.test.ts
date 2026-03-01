import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isEmptyObject } from './is-empty-object';

describe('isEmptyObject', () => {
  it('returns true for empty objects', () => {
    assert.equal(isEmptyObject({}), true);
  });

  it('returns false for non-empty objects', () => {
    assert.equal(isEmptyObject({ a: 1 }), false);
  });

  it('throws for invalid input', () => {
    assert.throws(() => isEmptyObject([] as never), TypeError, 'input must be a plain object.');
  });
});
