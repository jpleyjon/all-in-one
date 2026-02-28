import assert from 'node:assert';
import { describe, it } from 'node:test';
import { dollarsToCents } from './dollars-to-cents';

describe('dollarsToCents', () => {
  it('converts valid dollar inputs to cents', () => {
    assert.equal(dollarsToCents(12), 1200);
    assert.equal(dollarsToCents(12.34), 1234);
    assert.equal(dollarsToCents('12.34'), 1234);
    assert.equal(dollarsToCents('.99'), 99);
    assert.equal(dollarsToCents('-0.99'), -99);
    assert.equal(dollarsToCents('+5.2'), 520);
    assert.equal(dollarsToCents(' 10.00 '), 1000);
  });

  it('throws for invalid numeric values', () => {
    assert.throws(
      () => dollarsToCents(Number.POSITIVE_INFINITY),
      RangeError,
      'amount must be a finite number.',
    );
    assert.throws(() => dollarsToCents(Number.NaN), RangeError, 'amount must be a finite number.');
  });

  it('throws for invalid decimal text', () => {
    assert.throws(() => dollarsToCents(''), RangeError, 'amount must be a valid decimal number.');
    assert.throws(
      () => dollarsToCents('abc'),
      RangeError,
      'amount must be a valid decimal number.',
    );
    assert.throws(
      () => dollarsToCents('1.2.3'),
      RangeError,
      'amount must be a valid decimal number.',
    );
  });

  it('throws for more than two decimal places', () => {
    assert.throws(
      () => dollarsToCents('1.999'),
      RangeError,
      'amount must have at most 2 decimal places.',
    );
  });

  it('throws for values outside safe integer range', () => {
    assert.throws(
      () => dollarsToCents('90071992547409.92'),
      RangeError,
      'amount is out of safe integer range.',
    );
    assert.throws(
      () => dollarsToCents('9007199254740992'),
      RangeError,
      'amount is out of safe integer range.',
    );
  });
});
