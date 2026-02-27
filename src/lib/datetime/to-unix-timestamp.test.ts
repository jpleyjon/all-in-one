import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toUnixTimestamp } from './to-unix-timestamp';

describe('toUnixTimestamp', () => {
  it('returns whole unix seconds', () => {
    assert.equal(toUnixTimestamp('1970-01-01T00:00:01.999Z'), 1);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => toUnixTimestamp('invalid'), RangeError, 'date must be a valid date.');
  });
});
