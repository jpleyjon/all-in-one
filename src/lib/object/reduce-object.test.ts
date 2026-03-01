import assert from 'node:assert';
import { describe, it } from 'node:test';
import { reduceObject } from './reduce-object';

describe('reduceObject', () => {
  it('reduces object entries', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = reduceObject(input, (acc, value, key) => `${acc}${String(key)}:${value};`, '');

    assert.equal(result, 'a:1;b:2;c:3;');
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => reduceObject(null as never, (acc) => acc, 0),
      TypeError,
      'input must be a plain object.',
    );
  });
});
