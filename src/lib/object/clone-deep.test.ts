import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cloneDeep } from './clone-deep';

describe('cloneDeep', () => {
  it('deeply clones objects, arrays and dates', () => {
    const input = {
      user: { name: 'Ada' },
      tags: ['math', 'logic'],
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
    };
    const output = cloneDeep(input);

    assert.deepEqual(output, input);
    assert.notEqual(output, input);
    assert.notEqual(output.user, input.user);
    assert.notEqual(output.tags, input.tags);
    assert.notEqual(output.createdAt, input.createdAt);
  });

  it('handles circular references', () => {
    const input: { self?: unknown } = {};
    input.self = input;

    const output = cloneDeep(input);
    assert.equal(output.self, output);
  });

  it('returns non-plain objects as-is', () => {
    const map = new Map<string, number>();
    map.set('a', 1);

    const output = cloneDeep(map);
    assert.equal(output, map);
  });
});
