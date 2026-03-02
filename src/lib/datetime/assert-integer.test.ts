import assert from 'node:assert';
import { describe, it } from 'node:test';
import { assertInteger } from './assert-integer';

describe('assertInteger', () => {
  it('does not throw for integer values', () => {
    assert.doesNotThrow(() => assertInteger(0, 'value'));
    assert.doesNotThrow(() => assertInteger(-2, 'value'));
  });

  it('throws for non-integer values', () => {
    assert.throws(() => assertInteger(1.5, 'value'), RangeError, 'value must be an integer.');
    assert.throws(
      () => assertInteger(Number.NaN, 'value'),
      RangeError,
      'value must be an integer.',
    );
  });
});
