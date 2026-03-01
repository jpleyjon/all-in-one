import assert from 'node:assert';
import { describe, it } from 'node:test';
import { transformValuesDeep } from './transform-values-deep';

describe('transformValuesDeep', () => {
  it('transforms leaf values recursively', () => {
    const input = {
      user: {
        age: 36,
        tags: ['math', 'logic'],
      },
      active: true,
    };

    const result = transformValuesDeep(input, (value) => {
      if (typeof value === 'number') {
        return value + 1;
      }

      if (typeof value === 'string') {
        return value.toUpperCase();
      }

      return value;
    });

    assert.deepEqual(result, {
      user: {
        age: 37,
        tags: ['MATH', 'LOGIC'],
      },
      active: true,
    });
  });

  it('exposes full path to mapper', () => {
    const visitedPaths: string[] = [];

    transformValuesDeep(
      {
        user: {
          age: 36,
          tags: ['math'],
        },
      },
      (value, path) => {
        visitedPaths.push(path.join('.'));
        return value;
      },
    );

    assert.deepEqual(visitedPaths, ['user.age', 'user.tags.0']);
  });

  it('throws for invalid input and mapper', () => {
    assert.throws(
      () => transformValuesDeep([] as never, (value) => value),
      TypeError,
      'input must be a plain object.',
    );
    assert.throws(
      () => transformValuesDeep({ a: 1 }, null as never),
      TypeError,
      'mapper must be a function.',
    );
  });
});
