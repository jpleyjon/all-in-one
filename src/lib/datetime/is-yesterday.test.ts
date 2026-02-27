import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isYesterday } from './is-yesterday';

describe('isYesterday', () => {
  it('detects whether a date is yesterday', () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    assert.equal(isYesterday(yesterday), true);
    assert.equal(isYesterday(now), false);
  });
});
