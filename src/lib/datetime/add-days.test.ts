import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addDays } from './add-days';

describe('addDays', () => {
  it('adds days and returns a new Date', () => {
    const input = new Date(2024, 0, 10, 8, 0, 0, 0);
    const output = addDays(input, 2);

    assert.notStrictEqual(output, input);
    assert.equal(output.getFullYear(), 2024);
    assert.equal(output.getMonth(), 0);
    assert.equal(output.getDate(), 12);
  });

  it('throws for non-integer amounts', () => {
    assert.throws(() => addDays(new Date(), 1.5), RangeError, 'amount must be an integer.');
  });
});
