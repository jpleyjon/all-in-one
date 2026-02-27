import assert from 'node:assert';
import { describe, it } from 'node:test';
import { endOfYear } from './end-of-year';

describe('endOfYear', () => {
  it('returns the last moment of the year', () => {
    const output = endOfYear(new Date(2024, 3, 10, 5, 6, 7, 8));

    assert.equal(output.getMonth(), 11);
    assert.equal(output.getDate(), 31);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [23, 59, 59, 999],
    );
  });
});
