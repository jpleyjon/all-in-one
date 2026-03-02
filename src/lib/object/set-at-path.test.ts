import assert from 'node:assert';
import { describe, it } from 'node:test';
import { setAtPath } from './set-at-path';

describe('setAtPath', () => {
  it('sets nested values without mutating input', () => {
    const input = { user: { name: 'Ada' } };
    const output = setAtPath(input, ['user', 'name'], 'Grace') as typeof input;

    assert.deepEqual(output, { user: { name: 'Grace' } });
    assert.deepEqual(input, { user: { name: 'Ada' } });
  });

  it('creates containers for missing paths', () => {
    const output = setAtPath({}, ['items', 0, 'name'], 'book') as Record<string, unknown>;
    assert.deepEqual(output, { items: [{ name: 'book' }] });
  });

  it('returns a cloned value when path is empty', () => {
    const value = { nested: { a: 1 } };
    const output = setAtPath({}, [], value) as typeof value;

    assert.deepEqual(output, value);
    assert.notEqual(output, value);
    assert.notEqual(output.nested, value.nested);
  });
});
