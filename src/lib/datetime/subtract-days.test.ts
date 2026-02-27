import assert from 'node:assert';
import { describe, it } from 'node:test';
import { subtractDays } from './subtract-days';

describe('subtractDays', () => {
  it('subtracts days', () => {
    const output = subtractDays(new Date(2024, 0, 10), 2);

    assert.equal(output.getDate(), 8);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => subtractDays(new Date(), 0.5), RangeError, 'amount must be an integer.');
  });
});
