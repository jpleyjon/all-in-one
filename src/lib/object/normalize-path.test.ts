import assert from 'node:assert';
import { describe, it } from 'node:test';
import { normalizePath } from './normalize-path';

describe('normalizePath', () => {
  it('normalizes string and array paths', () => {
    assert.deepEqual(normalizePath('user.profile.0.name'), ['user', 'profile', 0, 'name']);
    assert.deepEqual(normalizePath(['user', 'profile', 1]), ['user', 'profile', 1]);
    assert.deepEqual(normalizePath(''), []);
  });

  it('throws for invalid path inputs', () => {
    assert.throws(
      () => normalizePath(1 as never),
      TypeError,
      'path must be a string or an array of segments.',
    );
    assert.throws(
      () => normalizePath([1.2 as never]),
      TypeError,
      'path[0] must be a string or integer.',
    );
    assert.throws(
      () => normalizePath([-1]),
      RangeError,
      'path[0] must be a non-negative integer when numeric.',
    );
  });
});
