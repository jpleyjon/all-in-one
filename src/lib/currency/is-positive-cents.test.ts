import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isPositiveCents } from './is-positive-cents';

describe('isPositiveCents', () => {
  it('checks whether cents is positive', () => {
    assert.equal(isPositiveCents(1), true);
    assert.equal(isPositiveCents(0), false);
    assert.equal(isPositiveCents(-1), false);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => isPositiveCents(1.5), RangeError, 'cents must be a safe integer.');
  });
});
