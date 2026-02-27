import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addMonths } from './add-months';

describe('addMonths', () => {
  it('adds months', () => {
    const output = addMonths(new Date(2024, 0, 15), 2);

    assert.equal(output.getFullYear(), 2024);
    assert.equal(output.getMonth(), 2);
    assert.equal(output.getDate(), 15);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => addMonths(new Date(), 1.2), RangeError, 'amount must be an integer.');
  });
});
