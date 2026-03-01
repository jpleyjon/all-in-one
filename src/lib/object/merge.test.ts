import assert from 'node:assert';
import { describe, it } from 'node:test';
import { merge } from './merge';

describe('merge', () => {
  it('shallow merges objects from left to right', () => {
    const result = merge({ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 });
    assert.deepEqual(result, { a: 1, b: { y: 2 }, c: 3 });
  });

  it('returns empty object for no inputs', () => {
    assert.deepEqual(merge(), {});
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => merge({ a: 1 }, null as never),
      TypeError,
      'inputs[1] must be a plain object.',
    );
  });
});
