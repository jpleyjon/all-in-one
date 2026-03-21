import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseNumber } from './parse-number';

describe('parseNumber', () => {
  it('parses common numeric strings', () => {
    assert.equal(parseNumber('1,234.56', 'en-US'), 1234.56);
    assert.equal(parseNumber(' -1,234.56 ', 'en-US'), -1234.56);
    assert.equal(parseNumber('1e3', 'en-US'), 1000);
  });

  it('parses localized separators', () => {
    assert.equal(parseNumber('1.234,56', 'de-DE'), 1234.56);
  });

  it('falls back to default separators when locale parts are missing', () => {
    const originalNumberFormat = Intl.NumberFormat;

    class MockNumberFormat {
      formatToParts(): Intl.NumberFormatPart[] {
        return [{ type: 'integer', value: '12345' }];
      }

      format(value: number): string {
        return String(value);
      }
    }

    Object.defineProperty(Intl, 'NumberFormat', {
      configurable: true,
      value: MockNumberFormat,
    });

    try {
      assert.equal(parseNumber('1,234.56'), 1234.56);
    } finally {
      Object.defineProperty(Intl, 'NumberFormat', {
        configurable: true,
        value: originalNumberFormat,
      });
    }
  });

  it('supports locales without a group separator', () => {
    const originalNumberFormat = Intl.NumberFormat;

    class MockNumberFormat {
      formatToParts(): Intl.NumberFormatPart[] {
        return [
          { type: 'group', value: '' },
          { type: 'decimal', value: '.' },
        ];
      }

      format(value: number): string {
        return String(value);
      }
    }

    Object.defineProperty(Intl, 'NumberFormat', {
      configurable: true,
      value: MockNumberFormat,
    });

    try {
      assert.equal(parseNumber('1234.56'), 1234.56);
    } finally {
      Object.defineProperty(Intl, 'NumberFormat', {
        configurable: true,
        value: originalNumberFormat,
      });
    }
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => parseNumber(1 as never), TypeError, 'input must be a string.');
    assert.throws(() => parseNumber('   '), TypeError, 'input must be a non-empty numeric string.');
    assert.throws(() => parseNumber('abc'), TypeError, 'input must be a valid numeric string.');
    assert.throws(
      () => parseNumber('1 2 3', 'en-US'),
      TypeError,
      'input must be a valid numeric string.',
    );
    assert.throws(
      () => parseNumber('1e 2', 'en-US'),
      TypeError,
      'input must be a valid numeric string.',
    );
    assert.throws(
      () => parseNumber('1..2', 'en-US'),
      TypeError,
      'input must be a valid numeric string.',
    );
    assert.throws(
      () => parseNumber('1e309', 'en-US'),
      TypeError,
      'input must be a valid numeric string.',
    );
  });
});
