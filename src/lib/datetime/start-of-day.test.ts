import assert from 'node:assert';
import { describe, it } from 'node:test';
import { startOfDay } from './start-of-day';

describe('startOfDay', () => {
  it('sets time to start of day', () => {
    const output = startOfDay(new Date(2024, 1, 10, 10, 11, 12, 13));

    assert.deepEqual(
      [output.getHours(), output.getMinutes(), output.getSeconds(), output.getMilliseconds()],
      [0, 0, 0, 0],
    );
  });
});
