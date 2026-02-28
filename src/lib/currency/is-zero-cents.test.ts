import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isZeroCents } from './is-zero-cents';

describe('isZeroCents', () => {
  it('checks whether cents is zero', () => {
    assert.equal(isZeroCents(0), true);
    assert.equal(isZeroCents(1), false);
    assert.equal(isZeroCents(-1), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => isZeroCents(0.5), RangeError, 'cents must be a safe integer.');
  });
});
