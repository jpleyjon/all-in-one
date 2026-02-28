import assert from 'node:assert';
import { describe, it } from 'node:test';
import { absCents } from './abs-cents';

describe('absCents', () => {
  it('returns absolute cents', () => {
    assert.equal(absCents(10), 10);
    assert.equal(absCents(-10), 10);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => absCents(1.1), RangeError, 'cents must be a safe integer.');
  });
});
