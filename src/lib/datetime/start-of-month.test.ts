import assert from 'node:assert';
import { describe, it } from 'node:test';
import { startOfMonth } from './start-of-month';

describe('startOfMonth', () => {
  it('returns first day of month at start of day', () => {
    const output = startOfMonth(new Date(2024, 1, 10, 10, 11, 12, 13));

    assert.equal(output.getDate(), 1);
    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [0, 0, 0, 0],
    );
  });
});
