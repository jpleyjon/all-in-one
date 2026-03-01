import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toFiniteNumber } from './to-finite-number';

describe('toFiniteNumber', () => {
  it('returns finite number input as-is', () => {
    assert.equal(toFiniteNumber(12.3), 12.3);
  });

  it('parses numeric strings', () => {
    assert.equal(toFiniteNumber('12.5'), 12.5);
    assert.equal(toFiniteNumber(' 10 '), 10);
  });

  it('returns fallback when conversion fails', () => {
    assert.equal(toFiniteNumber('abc', 7), 7);
    assert.equal(toFiniteNumber('', 9), 9);
  });

  it('throws for invalid fallback', () => {
    assert.throws(
      () => toFiniteNumber('1', Number.POSITIVE_INFINITY),
      RangeError,
      'fallback must be a finite number.',
    );
  });

  it('throws when conversion fails without fallback', () => {
    assert.throws(
      () => toFiniteNumber('abc'),
      TypeError,
      'input must be a finite number or numeric string.',
    );
    assert.throws(
      () => toFiniteNumber(true as never),
      TypeError,
      'input must be a finite number or numeric string.',
    );
  });
});
