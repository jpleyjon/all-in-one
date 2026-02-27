import assert from 'node:assert';
import { describe, it } from 'node:test';
import { startOfYear } from './start-of-year';

describe('startOfYear', () => {
  it('returns first day of year at start of day', () => {
    const output = startOfYear(new Date(2024, 3, 10, 10, 11, 12, 13));

    assert.equal(output.getMonth(), 0);
    assert.equal(output.getDate(), 1);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [0, 0, 0, 0],
    );
  });
});
