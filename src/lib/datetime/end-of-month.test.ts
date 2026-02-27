import assert from 'node:assert';
import { describe, it } from 'node:test';
import { endOfMonth } from './end-of-month';

describe('endOfMonth', () => {
  it('returns the last moment of the month', () => {
    const output = endOfMonth(new Date(2024, 1, 10, 8, 0, 0, 0));

    assert.equal(output.getDate(), 29);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [23, 59, 59, 999],
    );
  });
});
