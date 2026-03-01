import assert from 'node:assert';
import { describe, it } from 'node:test';
import { coerceNumber } from './coerce-number';

describe('coerceNumber', () => {
  it('returns finite numbers and parses numeric strings', () => {
    assert.equal(coerceNumber(10), 10);
    assert.equal(coerceNumber(' 12.5 '), 12.5);
  });

  it('returns null when coercion is not possible', () => {
    assert.equal(coerceNumber(Number.NaN), null);
    assert.equal(coerceNumber(''), null);
    assert.equal(coerceNumber('abc'), null);
    assert.equal(coerceNumber(true), null);
  });
});
