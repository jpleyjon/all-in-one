import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toPairs } from './to-pairs';

describe('toPairs', () => {
  it('converts object to pairs', () => {
    assert.deepEqual(toPairs({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('throws for invalid input', () => {
    assert.throws(() => toPairs([] as never), TypeError, 'input must be a plain object.');
  });
});
