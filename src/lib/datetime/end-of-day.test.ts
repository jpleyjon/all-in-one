import assert from 'node:assert';
import { describe, it } from 'node:test';
import { endOfDay } from './end-of-day';

describe('endOfDay', () => {
  it('sets time to the end of the day', () => {
    const output = endOfDay(new Date(2024, 1, 10, 10, 11, 12, 13));

    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [23, 59, 59, 999],
    );
  });
});
