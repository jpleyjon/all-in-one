import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isValidDateRange } from './is-valid-date-range';

describe('isValidDateRange', () => {
  it('checks inclusive date ranges by default', () => {
    assert.equal(isValidDateRange('2024-01-01', '2024-01-01'), true);
    assert.equal(isValidDateRange('2024-01-01', '2024-01-02'), true);
    assert.equal(isValidDateRange('2024-01-02', '2024-01-01'), false);
  });

  it('supports exclusive ranges', () => {
    assert.equal(isValidDateRange('2024-01-01', '2024-01-01', false), false);
    assert.equal(isValidDateRange('2024-01-01', '2024-01-02', false), true);
  });

  it('returns false when either date is invalid', () => {
    assert.equal(isValidDateRange('invalid-date', '2024-01-01'), false);
    assert.equal(isValidDateRange('2024-01-01', 'invalid-date'), false);
  });

  it('throws for invalid inclusive flag', () => {
    assert.throws(
      () => isValidDateRange('2024-01-01', '2024-01-02', 'yes' as never),
      TypeError,
      'inclusive must be a boolean.',
    );
  });
});
