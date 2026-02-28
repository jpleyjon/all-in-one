import assert from 'node:assert';
import { describe, it } from 'node:test';
import { sumCents } from './sum-cents';

describe('sumCents', () => {
  it('sums cent values', () => {
    assert.equal(sumCents([100, 250, -50]), 300);
    assert.equal(sumCents([]), 0);
  });

  it('throws when a value is invalid', () => {
    assert.throws(() => sumCents([100, 1.5]), RangeError, 'values[1] must be a safe integer.');
  });

  it('throws when sum exceeds safe range', () => {
    assert.throws(
      () => sumCents([Number.MAX_SAFE_INTEGER, 1]),
      RangeError,
      'sum is out of safe integer range.',
    );
  });
});
