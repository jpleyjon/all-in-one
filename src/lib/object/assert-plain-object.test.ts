import assert from 'node:assert';
import { describe, it } from 'node:test';
import { assertPlainObject } from './assert-plain-object';

describe('assertPlainObject', () => {
  it('does not throw for plain objects', () => {
    assert.doesNotThrow(() => assertPlainObject({}));
  });

  it('throws for non-plain values', () => {
    assert.throws(() => assertPlainObject([], 'value'), TypeError, 'value must be a plain object.');
    assert.throws(
      () => assertPlainObject(null, 'value'),
      TypeError,
      'value must be a plain object.',
    );
  });
});
