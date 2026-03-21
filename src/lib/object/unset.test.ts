import assert from 'node:assert';
import { describe, it } from 'node:test';
import { unset } from './unset';

describe('unset', () => {
  it('removes nested object keys immutably', () => {
    const input = { user: { profile: { name: 'Ada', age: 36 } } };
    const output = unset(input, 'user.profile.age');

    assert.deepEqual(output, { user: { profile: { name: 'Ada' } } });
    assert.deepEqual(input, { user: { profile: { name: 'Ada', age: 36 } } });
  });

  it('removes array indexes', () => {
    const input = { tags: ['math', 'logic', 'poetry'] };
    const output = unset(input, ['tags', 1]);

    assert.deepEqual(output, { tags: ['math', 'poetry'] });
  });

  it('removes nested keys inside array items immutably', () => {
    const input = {
      users: [{ profile: { name: 'Ada', age: 36 } }, { profile: { name: 'Grace', age: 40 } }],
    };

    const output = unset(input, ['users', 1, 'profile', 'age']);

    assert.deepEqual(output, {
      users: [{ profile: { name: 'Ada', age: 36 } }, { profile: { name: 'Grace' } }],
    });
    assert.deepEqual(input, {
      users: [{ profile: { name: 'Ada', age: 36 } }, { profile: { name: 'Grace', age: 40 } }],
    });
  });

  it('returns original object when path is missing or empty', () => {
    const input = { a: 1 };
    assert.equal(unset(input, 'b.c'), input);
    assert.equal(unset(input, ''), input);
  });

  it('returns original object when a nested path segment is missing', () => {
    const input = { user: { profile: { name: 'Ada' } } };

    assert.equal(unset(input, 'user.profile.age'), input);
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => unset(undefined as never, 'a.b'),
      TypeError,
      'input must be a non-null object.',
    );
  });
});
