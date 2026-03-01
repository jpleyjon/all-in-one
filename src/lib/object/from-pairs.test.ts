import assert from 'node:assert';
import { describe, it } from 'node:test';
import { fromPairs } from './from-pairs';

describe('fromPairs', () => {
  it('converts pairs to object', () => {
    assert.deepEqual(
      fromPairs([
        ['a', 1],
        ['b', 2],
      ]),
      { a: 1, b: 2 },
    );
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => fromPairs([['a'] as never]),
      TypeError,
      'input[0] must be a [key, value] entry.',
    );
  });
});
