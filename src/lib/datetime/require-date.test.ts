import assert from 'node:assert';
import { describe, it } from 'node:test';
import { requireDate } from './require-date';

describe('requireDate', () => {
  it('returns a parsed date for valid inputs', () => {
    const output = requireDate('2024-01-10T12:30:45.123Z', 'date');
    assert.equal(output.toISOString(), '2024-01-10T12:30:45.123Z');
  });

  it('throws for invalid date inputs', () => {
    assert.throws(
      () => requireDate('not-a-date', 'date'),
      RangeError,
      'date must be a valid date.',
    );
  });
});
