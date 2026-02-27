import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toISODate } from './to-iso-date';

describe('toISODate', () => {
  it('returns the ISO date portion', () => {
    assert.equal(toISODate('2024-01-10T12:30:45.123Z'), '2024-01-10');
  });
});
