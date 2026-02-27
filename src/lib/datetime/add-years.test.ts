import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addYears } from './add-years';

describe('addYears', () => {
  it('adds years', () => {
    const output = addYears(new Date(2024, 5, 1), 3);

    assert.equal(output.getFullYear(), 2027);
    assert.equal(output.getMonth(), 5);
    assert.equal(output.getDate(), 1);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => addYears(new Date(), 0.1), RangeError, 'amount must be an integer.');
  });
});
