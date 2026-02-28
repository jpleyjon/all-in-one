import assert from 'node:assert';
import { describe, it } from 'node:test';
import { discountAmountCents } from './discount-amount-cents';

describe('discountAmountCents', () => {
  it('computes discount amount', () => {
    assert.equal(discountAmountCents(1000, 0.15), 150);
    assert.equal(discountAmountCents(-1000, 0.15), -150);
  });

  it('supports custom rounding mode', () => {
    assert.equal(discountAmountCents(105, 0.1, 'half-even'), 10);
  });

  it('throws for invalid discount rate', () => {
    assert.throws(
      () => discountAmountCents(1000, -0.1),
      RangeError,
      'discountRate must be a non-negative finite number.',
    );
    assert.throws(
      () => discountAmountCents(1000, Number.POSITIVE_INFINITY),
      RangeError,
      'discountRate must be a non-negative finite number.',
    );
  });
});
