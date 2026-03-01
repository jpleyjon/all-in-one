import assert from 'node:assert';
import { describe, it } from 'node:test';
import { fromEntries } from './from-entries';

describe('fromEntries', () => {
  it('creates object from entries', () => {
    assert.deepEqual(
      fromEntries([
        ['a', 1],
        ['b', 2],
      ]),
      { a: 1, b: 2 },
    );
  });

  it('overwrites duplicate keys with last value', () => {
    assert.deepEqual(
      fromEntries([
        ['a', 1],
        ['a', 2],
      ]),
      { a: 2 },
    );
  });

  it('throws for invalid input shape', () => {
    assert.throws(
      () => fromEntries({} as never),
      TypeError,
      'input must be an array of [key, value] entries.',
    );
    assert.throws(
      () => fromEntries([['a', 1, 2] as never]),
      TypeError,
      'input[0] must be a [key, value] entry.',
    );
    assert.throws(
      () => fromEntries([[1 as never, 'x']]),
      TypeError,
      'input[0][0] must be a string key.',
    );
  });
});
