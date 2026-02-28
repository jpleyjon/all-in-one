import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toAccountingCurrencyString } from './to-accounting-currency-string';

describe('toAccountingCurrencyString', () => {
  it('formats positive cents without parentheses', () => {
    const expected = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(12.34);

    assert.equal(toAccountingCurrencyString(1234), expected);
  });

  it('formats negative cents with parentheses', () => {
    const expected = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(12.34);

    assert.equal(toAccountingCurrencyString(-1234), `(${expected})`);
  });

  it('supports locale and currency options', () => {
    const expected = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(12.34);

    assert.equal(
      toAccountingCurrencyString(1234, {
        locale: 'de-DE',
        currency: 'EUR',
        currencyDisplay: 'code',
      }),
      expected,
    );
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => toAccountingCurrencyString(1.5),
      RangeError,
      'cents must be a safe integer.',
    );
    assert.throws(
      () => toAccountingCurrencyString(100, { currency: 'usd' }),
      RangeError,
      'currency must be a 3-letter uppercase ISO code.',
    );
  });
});
