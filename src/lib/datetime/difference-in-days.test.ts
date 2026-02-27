import assert from 'node:assert';
import { describe, it } from 'node:test';
import { differenceInDays } from './difference-in-days';

describe('differenceInDays', () => {
  it('returns signed truncated day differences', () => {
    const a = new Date('2024-01-03T12:00:00.000Z');
    const b = new Date('2024-01-01T00:00:00.000Z');

    assert.equal(differenceInDays(a, b), 2);
    assert.equal(differenceInDays(b, a), -2);
  });
});
