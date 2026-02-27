import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toUTC } from './to-utc';

describe('toUTC', () => {
  it('maps local components to UTC components', () => {
    const local = new Date(2024, 5, 15, 10, 20, 30, 400);
    const output = toUTC(local);

    assert.deepEqual(
      [
        output.getUTCFullYear(),
        output.getUTCMonth(),
        output.getUTCDate(),
        output.getUTCHours(),
        output.getUTCMinutes(),
        output.getUTCSeconds(),
        output.getUTCMilliseconds(),
      ],
      [
        local.getFullYear(),
        local.getMonth(),
        local.getDate(),
        local.getHours(),
        local.getMinutes(),
        local.getSeconds(),
        local.getMilliseconds(),
      ],
    );
  });
});
