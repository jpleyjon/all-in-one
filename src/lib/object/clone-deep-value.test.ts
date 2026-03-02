import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cloneDeepValue } from './clone-deep-value';

describe('cloneDeepValue', () => {
  it('deeply clones arrays, objects, and dates', () => {
    const input = {
      user: { name: 'Ada' },
      tags: ['math', 'logic'],
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
    };

    const output = cloneDeepValue(input);
    assert.deepEqual(output, input);
    assert.notEqual(output, input);
    assert.notEqual(output.user, input.user);
    assert.notEqual(output.tags, input.tags);
    assert.notEqual(output.createdAt, input.createdAt);
  });

  it('handles circular references and preserves non-plain objects', () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;

    const output = cloneDeepValue(circular);
    assert.equal(output.self, output);

    const map = new Map<string, number>();
    map.set('a', 1);
    assert.equal(cloneDeepValue(map), map);
  });
});
