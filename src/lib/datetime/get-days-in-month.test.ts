import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getDaysInMonth } from './get-days-in-month';

describe('getDaysInMonth', () => {
  it('returns correct days for leap and common years', () => {
    assert.equal(getDaysInMonth(new Date(2024, 1, 1)), 29);
    assert.equal(getDaysInMonth(new Date(2023, 1, 1)), 28);
  });
});
