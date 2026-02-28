import assert from 'node:assert';
import { describe, it } from 'node:test';
import { formatCents } from './format-cents';

describe('formatCents', () => {
  it('formats cents with default settings', () => {
    const expected = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(12.34);

    assert.equal(formatCents(1234), expected);
  });

  it('formats cents with custom locale and currency options', () => {
    const expected = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(12.34);

    assert.equal(
      formatCents(1234, { locale: 'de-DE', currency: 'EUR', currencyDisplay: 'code' }),
      expected,
    );
  });

  it('throws for invalid cents values', () => {
    assert.throws(() => formatCents(1.5), RangeError, 'cents must be a safe integer.');
  });

  it('throws for invalid currency codes', () => {
    assert.throws(
      () => formatCents(100, { currency: 'usd' }),
      RangeError,
      'currency must be a 3-letter uppercase ISO code.',
    );
    assert.throws(
      () => formatCents(100, { currency: 'US' }),
      RangeError,
      'currency must be a 3-letter uppercase ISO code.',
    );
  });
});
