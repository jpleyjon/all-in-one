import assert from 'node:assert';
import { describe, it } from 'node:test';
import { normalizeCurrencyCode } from './normalize-currency-code';

describe('normalizeCurrencyCode', () => {
  it('normalizes valid currency codes', () => {
    assert.equal(normalizeCurrencyCode(' usd '), 'USD');
    assert.equal(normalizeCurrencyCode('eur'), 'EUR');
  });

  it('throws for invalid currency codes', () => {
    assert.throws(
      () => normalizeCurrencyCode('US'),
      RangeError,
      'code must be a valid 3-letter ISO currency code.',
    );
  });
});
