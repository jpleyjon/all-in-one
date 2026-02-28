import assert from 'node:assert';
import { describe, it } from 'node:test';
import { taxAmountCents } from './tax-amount-cents';

describe('taxAmountCents', () => {
  it('computes tax amount', () => {
    assert.equal(taxAmountCents(1000, 0.0825), 83);
    assert.equal(taxAmountCents(-1000, 0.0825), -83);
  });

  it('supports custom rounding mode', () => {
    assert.equal(taxAmountCents(105, 0.1, 'half-even'), 10);
  });

  it('throws for invalid tax rate', () => {
    assert.throws(
      () => taxAmountCents(1000, -0.1),
      RangeError,
      'taxRate must be a non-negative finite number.',
    );
    assert.throws(
      () => taxAmountCents(1000, Number.POSITIVE_INFINITY),
      RangeError,
      'taxRate must be a non-negative finite number.',
    );
  });
});
