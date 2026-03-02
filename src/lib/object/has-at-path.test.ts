import assert from 'node:assert';
import { describe, it } from 'node:test';
import { hasAtPath } from './has-at-path';

describe('hasAtPath', () => {
  const input = { user: { profile: { name: 'Ada' }, tags: ['math'] } };

  it('returns true when all path segments exist', () => {
    assert.equal(hasAtPath(input, ['user', 'profile', 'name']), true);
    assert.equal(hasAtPath(input, ['user', 'tags', 0]), true);
  });

  it('returns false for missing or inherited paths', () => {
    const withProto = Object.create({ inherited: 1 }) as { own?: number };
    withProto.own = 1;

    assert.equal(hasAtPath(input, ['user', 'profile', 'missing']), false);
    assert.equal(hasAtPath(withProto, ['inherited']), false);
    assert.equal(hasAtPath({ a: 1 }, ['a', 'b']), false);
  });
});
