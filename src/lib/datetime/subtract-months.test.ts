import assert from 'node:assert';
import { describe, it } from 'node:test';
import { subtractMonths } from './subtract-months';

describe('subtractMonths', () => {
  it('subtracts months', () => {
    const output = subtractMonths(new Date(2024, 5, 10), 2);

    assert.equal(output.getMonth(), 3);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => subtractMonths(new Date(), 0.5), RangeError, 'amount must be an integer.');
  });
});
