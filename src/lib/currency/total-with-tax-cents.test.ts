import assert from 'node:assert';
import { describe, it } from 'node:test';
import { totalWithTaxCents } from './total-with-tax-cents';

describe('totalWithTaxCents', () => {
  it('computes total with tax', () => {
    assert.equal(totalWithTaxCents(1000, 0.0825), 1083);
    assert.equal(totalWithTaxCents(-1000, 0.0825), -1083);
  });

  it('supports custom rounding mode', () => {
    assert.equal(totalWithTaxCents(105, 0.1, 'half-even'), 115);
  });

  it('throws for invalid tax rate', () => {
    assert.throws(
      () => totalWithTaxCents(1000, -0.01),
      RangeError,
      'taxRate must be a non-negative finite number.',
    );
  });

  it('throws for overflow', () => {
    assert.throws(
      () => totalWithTaxCents(Number.MAX_SAFE_INTEGER, 1),
      RangeError,
      'sum is out of safe integer range.',
    );
  });
});
