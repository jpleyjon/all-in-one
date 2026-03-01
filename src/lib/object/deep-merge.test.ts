import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('deep merges nested plain objects', () => {
    const result = deepMerge(
      { user: { name: 'Ada', settings: { darkMode: false } } },
      { user: { settings: { darkMode: true, compact: true } } },
    );

    assert.deepEqual(result, {
      user: {
        name: 'Ada',
        settings: { darkMode: true, compact: true },
      },
    });
  });

  it('replaces non-plain values and clones arrays', () => {
    const source = { tags: ['math', 'logic'] };
    const result = deepMerge({ tags: ['x'] }, source);

    assert.deepEqual(result, { tags: ['math', 'logic'] });
    assert.notEqual(result.tags, source.tags);
  });

  it('returns empty object when no inputs are provided', () => {
    assert.deepEqual(deepMerge(), {});
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => deepMerge({ a: 1 }, [] as never),
      TypeError,
      'inputs[1] must be a plain object.',
    );
  });
});
