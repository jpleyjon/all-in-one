import assert from 'node:assert';
import { describe, it } from 'node:test';
import { transformKeysDeep } from './transform-keys-deep';

describe('transformKeysDeep', () => {
  it('transforms keys recursively', () => {
    const input = {
      userProfile: {
        firstName: 'Ada',
        tags: [{ roleName: 'admin' }],
      },
    };

    const result = transformKeysDeep(input, (key) => key.toUpperCase());

    assert.deepEqual(result, {
      USERPROFILE: {
        FIRSTNAME: 'Ada',
        TAGS: [{ ROLENAME: 'admin' }],
      },
    });
  });

  it('passes path and keeps latest key on collision', () => {
    const input = { one: { a: 1, b: 2 } };
    const result = transformKeysDeep(input, (key, _value, path) =>
      path.join('.') === 'one.b' ? 'A' : key.toUpperCase(),
    );

    assert.deepEqual(result, { ONE: { A: 2 } });
  });

  it('clones non-plain leaf values', () => {
    const date = new Date('2024-01-01T00:00:00.000Z');
    const result = transformKeysDeep({ createdAt: date }, (key) => key);

    assert.notEqual(result.createdAt, date);
    assert.deepEqual(result.createdAt, date);
  });

  it('throws for invalid input and mapper', () => {
    assert.throws(
      () => transformKeysDeep([] as never, (key) => key),
      TypeError,
      'input must be a plain object.',
    );
    assert.throws(
      () => transformKeysDeep({ a: 1 }, null as never),
      TypeError,
      'mapper must be a function.',
    );
  });
});
