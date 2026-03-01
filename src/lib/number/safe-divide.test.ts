import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeDivide } from './safe-divide';

describe('safeDivide', () => {
  it('divides finite values', () => {
    assert.equal(safeDivide(10, 2), 5);
  });

  it('returns fallback for zero denominator', () => {
    assert.equal(safeDivide(10, 0), 0);
    assert.equal(safeDivide(10, 0, 99), 99);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => safeDivide(Number.NaN, 1),
      RangeError,
      'numerator must be a finite number.',
    );
    assert.throws(
      () => safeDivide(1, Number.NaN),
      RangeError,
      'denominator must be a finite number.',
    );
    assert.throws(
      () => safeDivide(1, 1, Number.NaN),
      RangeError,
      'fallback must be a finite number.',
    );
  });
});
