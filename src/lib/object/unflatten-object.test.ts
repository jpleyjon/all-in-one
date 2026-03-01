import assert from 'node:assert';
import { describe, it } from 'node:test';
import { unflattenObject } from './unflatten-object';

describe('unflattenObject', () => {
  it('expands delimiter-separated keys', () => {
    const input = {
      'user.profile.name': 'Ada',
      'user.tags.0': 'math',
      'user.tags.1': 'logic',
    };

    assert.deepEqual(unflattenObject(input), {
      user: {
        profile: { name: 'Ada' },
        tags: ['math', 'logic'],
      },
    });
  });

  it('supports custom delimiter', () => {
    const input = { 'user/profile/name': 'Ada' };
    assert.deepEqual(unflattenObject(input, { delimiter: '/' }), {
      user: { profile: { name: 'Ada' } },
    });
  });

  it('handles empty key paths', () => {
    assert.deepEqual(unflattenObject({ '': { a: 1 } }), { a: 1 });
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => unflattenObject([] as never), TypeError, 'input must be a plain object.');
    assert.throws(
      () => unflattenObject({ a: 1 }, { delimiter: '' }),
      RangeError,
      'delimiter must not be empty.',
    );
  });
});
