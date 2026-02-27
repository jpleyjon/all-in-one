import assert from 'node:assert';
import { describe, it } from 'node:test';
import { differenceInMinutes } from './difference-in-minutes';

describe('differenceInMinutes', () => {
  it('returns signed truncated minute differences', () => {
    const a = new Date('2024-01-01T01:30:59.000Z');
    const b = new Date('2024-01-01T00:00:00.000Z');

    assert.equal(differenceInMinutes(a, b), 90);
    assert.equal(differenceInMinutes(b, a), -90);
  });
});
