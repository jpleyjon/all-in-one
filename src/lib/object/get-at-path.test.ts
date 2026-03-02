import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getAtPath } from './get-at-path';

describe('getAtPath', () => {
  const input = { user: { profile: { name: 'Ada' }, tags: ['math'] } };

  it('returns nested values', () => {
    assert.equal(getAtPath(input, ['user', 'profile', 'name']), 'Ada');
    assert.equal(getAtPath(input, ['user', 'tags', 0]), 'math');
  });

  it('returns undefined for missing paths or primitive traversal', () => {
    assert.equal(getAtPath(input, ['user', 'missing']), undefined);
    assert.equal(getAtPath({ a: 1 }, ['a', 'b']), undefined);
  });
});
