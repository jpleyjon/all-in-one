import assert from 'node:assert';
import { describe, it } from 'node:test';
import { assertObjectLike } from './assert-object-like';

describe('assertObjectLike', () => {
  it('does not throw for object-like values', () => {
    assert.doesNotThrow(() => assertObjectLike({}));
    assert.doesNotThrow(() => assertObjectLike([]));
  });

  it('throws for non-object-like values', () => {
    assert.throws(
      () => assertObjectLike(null, 'value'),
      TypeError,
      'value must be a non-null object.',
    );
    assert.throws(
      () => assertObjectLike('test', 'value'),
      TypeError,
      'value must be a non-null object.',
    );
  });
});
