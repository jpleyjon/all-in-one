import assert from 'node:assert';
import { describe, it } from 'node:test';
import { entries } from './entries';

describe('entries', () => {
  it('returns object entries', () => {
    assert.deepEqual(entries({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('throws for invalid input', () => {
    assert.throws(() => entries(null as never), TypeError, 'input must be a plain object.');
  });
});
