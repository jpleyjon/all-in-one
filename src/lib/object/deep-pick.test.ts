import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepPick } from './deep-pick';

describe('deepPick', () => {
  it('picks selected nested paths', () => {
    const input = {
      id: 1,
      user: {
        profile: { name: 'Ada', age: 36 },
        tags: ['math', 'logic'],
      },
    };

    const result = deepPick(input, ['user.profile.name', 'user.tags.1']) as {
      user: { profile: { name: string }; tags: string[] };
    };

    assert.deepEqual(result.user.profile, { name: 'Ada' });
    assert.equal(result.user.tags[1], 'logic');
    assert.equal(0 in result.user.tags, false);
  });

  it('ignores missing paths and returns empty object when no paths', () => {
    const input = { id: 1, user: { profile: { name: 'Ada' } } };
    assert.deepEqual(deepPick(input, ['user.profile.missing']), {});
    assert.deepEqual(deepPick(input, []), {});
  });

  it('returns deep clone when root path is selected', () => {
    const input = { user: { profile: { name: 'Ada' } } };
    const result = deepPick(input, ['']);

    assert.deepEqual(result, input);
    assert.notEqual(result, input);
    assert.notEqual((result as typeof input).user, input.user);
  });

  it('throws for invalid input and paths', () => {
    assert.throws(
      () => deepPick(null as never, ['user.profile.name']),
      TypeError,
      'input must be a non-null object.',
    );
    assert.throws(
      () => deepPick({ a: 1 }, [1 as never]),
      TypeError,
      'path must be a string or an array of segments.',
    );
    assert.throws(
      () => deepPick({ a: 1 }, [[-1]]),
      RangeError,
      'path[0] must be a non-negative integer when numeric.',
    );
  });
});
