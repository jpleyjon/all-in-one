import assert from 'node:assert';
import { describe, it } from 'node:test';
import { subtractYears } from './subtract-years';

describe('subtractYears', () => {
  it('subtracts years', () => {
    const output = subtractYears(new Date(2024, 5, 10), 2);

    assert.equal(output.getFullYear(), 2022);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => subtractYears(new Date(), 0.5), RangeError, 'amount must be an integer.');
  });
});
