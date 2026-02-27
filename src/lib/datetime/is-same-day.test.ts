import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isSameDay } from './is-same-day';

describe('isSameDay', () => {
  it('returns true for dates on the same local day', () => {
    assert.equal(isSameDay(new Date(2024, 0, 1, 1), new Date(2024, 0, 1, 23)), true);
  });

  it('returns false for dates on different days', () => {
    assert.equal(isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 2)), false);
  });
});
