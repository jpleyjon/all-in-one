import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNegativeCents } from './is-negative-cents';

describe('isNegativeCents', () => {
  it('checks whether cents is negative', () => {
    assert.equal(isNegativeCents(-1), true);
    assert.equal(isNegativeCents(0), false);
    assert.equal(isNegativeCents(1), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => isNegativeCents(1.5), RangeError, 'cents must be a safe integer.');
  });
});
