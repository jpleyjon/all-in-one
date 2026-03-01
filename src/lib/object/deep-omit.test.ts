import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepOmit } from './deep-omit';

describe('deepOmit', () => {
  it('omits selected nested paths', () => {
    const input = {
      id: 1,
      user: {
        profile: { name: 'Ada', age: 36 },
        tags: ['math', 'logic', 'poetry'],
      },
    };

    assert.deepEqual(deepOmit(input, ['user.profile.age', 'user.tags.1']), {
      id: 1,
      user: {
        profile: { name: 'Ada' },
        tags: ['math', 'poetry'],
      },
    });
  });

  it('returns cloned object when paths do not exist', () => {
    const input = { user: { profile: { name: 'Ada' } } };
    const result = deepOmit(input, ['user.profile.missing']);

    assert.deepEqual(result, input);
    assert.notEqual(result, input);
    assert.notEqual(result.user, input.user);
  });

  it('returns empty root when root path is selected', () => {
    assert.deepEqual(deepOmit({ a: 1 }, ['']), {});
    assert.deepEqual(deepOmit([1, 2, 3], ['']), []);
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => deepOmit(undefined as never, ['a.b']),
      TypeError,
      'input must be a non-null object.',
    );
  });
});
