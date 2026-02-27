import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isToday } from './is-today';

describe('isToday', () => {
  it('detects whether a date is today', () => {
    const now = new Date();
    const other = new Date(now);
    other.setDate(other.getDate() + 2);

    assert.equal(isToday(now), true);
    assert.equal(isToday(other), false);
  });
});
