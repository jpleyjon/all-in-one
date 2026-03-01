import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepFreeze } from './deep-freeze';

describe('deepFreeze', () => {
  it('deeply freezes nested objects and arrays', () => {
    const input = {
      user: { profile: { name: 'Ada' } },
      tags: ['math'],
    };

    const result = deepFreeze(input);

    assert.equal(result, input);
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.user), true);
    assert.equal(Object.isFrozen(result.user.profile), true);
    assert.equal(Object.isFrozen(result.tags), true);
  });

  it('supports primitive values', () => {
    assert.equal(deepFreeze(1), 1);
    assert.equal(deepFreeze('x'), 'x');
    assert.equal(deepFreeze(null), null);
  });

  it('handles circular references', () => {
    const input: { self?: unknown } = {};
    input.self = input;

    const result = deepFreeze(input);
    assert.equal(Object.isFrozen(result), true);
    assert.equal(result.self, result);
  });
});
