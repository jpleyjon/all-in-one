import assert from 'node:assert';
import { describe, it } from 'node:test';
import { formatNumber } from './format-number';

describe('formatNumber', () => {
  it('formats numbers with locale and options', () => {
    assert.equal(
      formatNumber(1234.5, { minimumFractionDigits: 1, maximumFractionDigits: 1 }, 'en-US'),
      '1,234.5',
    );
  });

  it('throws for invalid values', () => {
    assert.throws(() => formatNumber(Number.NaN), RangeError, 'value must be a finite number.');
  });
});
