import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseCurrencyStringToCents } from './parse-currency-string-to-cents';

describe('parseCurrencyStringToCents', () => {
  it('parses valid currency strings', () => {
    assert.equal(parseCurrencyStringToCents('1234'), 123400);
    assert.equal(parseCurrencyStringToCents('1,234'), 123400);
    assert.equal(parseCurrencyStringToCents('1,234.56'), 123456);
    assert.equal(parseCurrencyStringToCents('.99'), 99);
    assert.equal(parseCurrencyStringToCents('-0.50'), -50);
    assert.equal(parseCurrencyStringToCents('+10.25'), 1025);
  });

  it('throws for empty and malformed input', () => {
    assert.throws(
      () => parseCurrencyStringToCents(''),
      RangeError,
      'input must be a valid currency amount.',
    );

    assert.throws(
      () => parseCurrencyStringToCents('+'),
      RangeError,
      'input must be a valid currency amount.',
    );

    assert.throws(
      () => parseCurrencyStringToCents('.'),
      RangeError,
      'input must be a valid currency amount.',
    );

    assert.throws(
      () => parseCurrencyStringToCents('1,23'),
      RangeError,
      'input must be a valid currency amount.',
    );

    assert.throws(
      () => parseCurrencyStringToCents('1.234'),
      RangeError,
      'input must be a valid currency amount.',
    );
  });
});
