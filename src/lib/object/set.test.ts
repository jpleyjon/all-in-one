import assert from 'node:assert';
import { describe, it } from 'node:test';
import { set } from './set';

describe('set', () => {
  it('sets a nested value immutably', () => {
    const input = { user: { profile: { name: 'Ada' } } };
    const output = set(input, 'user.profile.name', 'Grace');

    assert.deepEqual(output, { user: { profile: { name: 'Grace' } } });
    assert.deepEqual(input, { user: { profile: { name: 'Ada' } } });
  });

  it('creates missing branches and array indexes', () => {
    const output = set({ user: {} }, ['user', 'tags', 0], 'math');
    assert.deepEqual(output, { user: { tags: ['math'] } });
  });

  it('returns cloned value when path is empty', () => {
    const replacement = { id: 1 };
    const output = set({ user: { id: 2 } }, '', replacement);

    assert.deepEqual(output, replacement);
    assert.notEqual(output, replacement);
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => set(null as never, 'a.b', 1),
      TypeError,
      'input must be a non-null object.',
    );
  });
});
