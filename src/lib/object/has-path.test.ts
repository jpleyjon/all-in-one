import assert from 'node:assert';
import { describe, it } from 'node:test';
import { hasPath } from './has-path';

describe('hasPath', () => {
  const source = { user: { profile: { name: 'Ada' }, tags: ['math'] } };

  it('returns true when path exists', () => {
    assert.equal(hasPath(source, 'user.profile.name'), true);
    assert.equal(hasPath(source, ['user', 'tags', 0]), true);
  });

  it('returns false when path does not exist', () => {
    assert.equal(hasPath(source, 'user.profile.age'), false);
    assert.equal(hasPath(source, 'user.tags.4'), false);
    assert.equal(hasPath({ a: 1 }, 'a.b'), false);
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => hasPath(undefined as never, 'user.profile.name'),
      TypeError,
      'input must be a non-null object.',
    );
  });
});
