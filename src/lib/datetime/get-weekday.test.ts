import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getWeekday } from './get-weekday';

describe('getWeekday', () => {
  it('returns local weekday index', () => {
    assert.equal(getWeekday(new Date(2024, 0, 7)), 0);
    assert.equal(getWeekday(new Date(2024, 0, 8)), 1);
  });
});
