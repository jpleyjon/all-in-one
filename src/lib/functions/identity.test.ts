import assert from 'node:assert';
import { describe, it } from 'node:test';
import { identity } from './identity';

describe('identity', () => {
  it('returns the exact same value', () => {
    const value = { value: 1 };

    assert.equal(identity(value), value);
  });
});
