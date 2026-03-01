import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toThousands } from './to-thousands';

describe('toThousands', () => {
  it('formats integer and decimal values', () => {
    assert.equal(toThousands(1234567), '1,234,567');
    assert.equal(toThousands(1234567.89), '1,234,567.89');
    assert.equal(toThousands(-1234567), '-1,234,567');
  });

  it('supports custom separators', () => {
    assert.equal(toThousands(1234567, ' '), '1 234 567');
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => toThousands(Number.NaN), RangeError, 'value must be a finite number.');
    assert.throws(() => toThousands(1, ''), TypeError, 'separator must be a non-empty string.');
    assert.throws(
      () => toThousands(1, 1 as never),
      TypeError,
      'separator must be a non-empty string.',
    );
  });
});
