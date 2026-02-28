import assert from 'node:assert';
import { describe, it } from 'node:test';
import { centsToDollars } from './cents-to-dollars';

describe('centsToDollars', () => {
  it('converts cents to dollars', () => {
    assert.equal(centsToDollars(1234), 12.34);
    assert.equal(centsToDollars(-99), -0.99);
    assert.equal(centsToDollars(0), 0);
  });

  it('throws for non-safe integers', () => {
    assert.throws(() => centsToDollars(1.5), RangeError, 'cents must be a safe integer.');
    assert.throws(
      () => centsToDollars(Number.POSITIVE_INFINITY),
      RangeError,
      'cents must be a safe integer.',
    );
  });
});
