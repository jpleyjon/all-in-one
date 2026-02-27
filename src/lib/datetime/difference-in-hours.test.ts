import assert from 'node:assert';
import { describe, it } from 'node:test';
import { differenceInHours } from './difference-in-hours';

describe('differenceInHours', () => {
  it('returns signed truncated hour differences', () => {
    const a = new Date('2024-01-01T02:59:59.000Z');
    const b = new Date('2024-01-01T00:00:00.000Z');

    assert.equal(differenceInHours(a, b), 2);
    assert.equal(differenceInHours(b, a), -2);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => differenceInHours('invalid', new Date()),
      RangeError,
      'a must be a valid date.',
    );
  });
});
