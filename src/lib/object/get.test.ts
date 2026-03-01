import assert from 'node:assert';
import { describe, it } from 'node:test';
import { get } from './get';

describe('get', () => {
  const source = {
    user: {
      profile: { name: 'Ada' },
      tags: ['math', 'logic'],
    },
  };

  it('reads nested values by string and array paths', () => {
    assert.equal(get(source, 'user.profile.name'), 'Ada');
    assert.equal(get(source, ['user', 'tags', 1]), 'logic');
  });

  it('returns default value when path does not exist', () => {
    assert.equal(get(source, 'user.profile.age', 99), 99);
  });

  it('returns default when traversal reaches a primitive early', () => {
    assert.equal(get({ a: 1 }, 'a.b', 42), 42);
  });

  it('returns input for empty path', () => {
    assert.deepEqual(get(source, ''), source);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => get(null as never, 'user.profile.name'),
      TypeError,
      'input must be a non-null object.',
    );
    assert.throws(
      () => get(source, 1 as never),
      TypeError,
      'path must be a string or an array of segments.',
    );
    assert.throws(
      () => get(source, [1.2 as never]),
      TypeError,
      'path[0] must be a string or integer.',
    );
    assert.throws(
      () => get(source, [-1]),
      RangeError,
      'path[0] must be a non-negative integer when numeric.',
    );
  });
});
