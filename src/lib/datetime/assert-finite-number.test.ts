import assert from 'node:assert';
import { describe, it } from 'node:test';
import { assertFiniteNumber } from './assert-finite-number';

describe('assertFiniteNumber', () => {
  it('does not throw for finite numbers', () => {
    assert.doesNotThrow(() => assertFiniteNumber(0, 'value'));
    assert.doesNotThrow(() => assertFiniteNumber(-12.34, 'value'));
  });

  it('throws for non-finite numbers', () => {
    assert.throws(
      () => assertFiniteNumber(Number.NaN, 'value'),
      RangeError,
      'value must be a finite number.',
    );
    assert.throws(
      () => assertFiniteNumber(Number.POSITIVE_INFINITY, 'value'),
      RangeError,
      'value must be a finite number.',
    );
  });
});
