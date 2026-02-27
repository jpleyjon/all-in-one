import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isValidDate } from './is-valid-date';

describe('isValidDate', () => {
  it('returns true for valid date inputs', () => {
    assert.equal(isValidDate(new Date()), true);
    assert.equal(isValidDate('2024-01-10T00:00:00.000Z'), true);
    assert.equal(isValidDate(1704844800000), true);
  });

  it('returns false for invalid date inputs', () => {
    assert.equal(isValidDate('not-a-date'), false);
  });
});
