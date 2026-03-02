import assert from 'node:assert';
import { describe, it } from 'node:test';
import { unsetAtPath } from './unset-at-path';

describe('unsetAtPath', () => {
  it('removes nested object properties immutably', () => {
    const input = { user: { name: 'Ada', age: 30 } };
    const output = unsetAtPath(input, ['user', 'age']) as typeof input;

    assert.deepEqual(output, { user: { name: 'Ada' } });
    assert.deepEqual(input, { user: { name: 'Ada', age: 30 } });
  });

  it('removes array indexes', () => {
    const input = { items: ['a', 'b', 'c'] };
    const output = unsetAtPath(input, ['items', 1]) as typeof input;
    assert.deepEqual(output, { items: ['a', 'c'] });
  });

  it('returns input when path is empty, missing, or input is not object-like', () => {
    const input = { a: 1 };
    assert.equal(unsetAtPath(input, []), input);
    assert.equal(unsetAtPath(input, ['missing']), input);
    assert.equal(unsetAtPath(1, ['a']), 1);
  });
});
