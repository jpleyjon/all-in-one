import assert from 'node:assert';
import { describe, it } from 'node:test';
import { subtractCents } from './subtract-cents';

describe('subtractCents', () => {
  it('subtracts cent amounts', () => {
    assert.equal(subtractCents(500, 125), 375);
    assert.equal(subtractCents(-500, -125), -375);
    assert.equal(subtractCents(100, 250), -150);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => subtractCents(1.5, 1), RangeError, 'a must be a safe integer.');
    assert.throws(() => subtractCents(1, 1.5), RangeError, 'b must be a safe integer.');
  });

  it('throws for overflow', () => {
    assert.throws(
      () => subtractCents(Number.MIN_SAFE_INTEGER, 1),
      RangeError,
      'result is out of safe integer range.',
    );
  });
});
