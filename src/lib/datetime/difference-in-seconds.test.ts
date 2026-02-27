import assert from 'node:assert';
import { describe, it } from 'node:test';
import { differenceInSeconds } from './difference-in-seconds';

describe('differenceInSeconds', () => {
  it('returns signed truncated second differences', () => {
    const a = new Date('2024-01-01T00:02:30.900Z');
    const b = new Date('2024-01-01T00:00:00.000Z');

    assert.equal(differenceInSeconds(a, b), 150);
    assert.equal(differenceInSeconds(b, a), -150);
  });
});
