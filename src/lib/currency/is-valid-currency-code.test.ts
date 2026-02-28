import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isValidCurrencyCode } from './is-valid-currency-code';

describe('isValidCurrencyCode', () => {
  it('validates currency codes', () => {
    assert.equal(isValidCurrencyCode('USD'), true);
    assert.equal(isValidCurrencyCode(' usd '), true);
    assert.equal(isValidCurrencyCode('EUR'), true);
    assert.equal(isValidCurrencyCode('US'), false);
    assert.equal(isValidCurrencyCode('USDD'), false);
    assert.equal(isValidCurrencyCode('12A'), false);
  });
});
