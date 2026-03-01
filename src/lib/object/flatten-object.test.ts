import assert from 'node:assert';
import { describe, it } from 'node:test';
import { flattenObject } from './flatten-object';

describe('flattenObject', () => {
  it('flattens nested objects and arrays', () => {
    const input = {
      user: {
        profile: { name: 'Ada' },
        tags: ['math', 'logic'],
      },
    };

    assert.deepEqual(flattenObject(input), {
      'user.profile.name': 'Ada',
      'user.tags.0': 'math',
      'user.tags.1': 'logic',
    });
  });

  it('keeps empty objects and arrays as values', () => {
    const input = { a: {}, b: [] };
    assert.deepEqual(flattenObject(input), { a: {}, b: [] });
  });

  it('supports custom delimiter', () => {
    const input = { user: { profile: { name: 'Ada' } } };
    assert.deepEqual(flattenObject(input, { delimiter: '/' }), { 'user/profile/name': 'Ada' });
  });

  it('supports empty-string root keys containing arrays', () => {
    assert.deepEqual(flattenObject({ '': ['a', 'b'] }), { '0': 'a', '1': 'b' });
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => flattenObject([] as never), TypeError, 'input must be a plain object.');
    assert.throws(
      () => flattenObject({ a: 1 }, { delimiter: '' }),
      RangeError,
      'delimiter must not be empty.',
    );
  });
});
