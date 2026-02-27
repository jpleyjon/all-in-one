import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toISODateTime } from './to-iso-date-time';

describe('toISODateTime', () => {
  it('returns an ISO date-time string', () => {
    assert.equal(toISODateTime('2024-01-10T12:30:45.123Z'), '2024-01-10T12:30:45.123Z');
  });
});
