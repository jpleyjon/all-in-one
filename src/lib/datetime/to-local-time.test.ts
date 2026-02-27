import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toLocalTime } from './to-local-time';

describe('toLocalTime', () => {
  it('maps UTC components to local components', () => {
    const utcDate = new Date(Date.UTC(2024, 5, 15, 10, 20, 30, 400));
    const output = toLocalTime(utcDate);

    assert.deepEqual(
      [
        output.getFullYear(),
        output.getMonth(),
        output.getDate(),
        output.getHours(),
        output.getMinutes(),
        output.getSeconds(),
        output.getMilliseconds(),
      ],
      [
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        utcDate.getUTCHours(),
        utcDate.getUTCMinutes(),
        utcDate.getUTCSeconds(),
        utcDate.getUTCMilliseconds(),
      ],
    );
  });
});
