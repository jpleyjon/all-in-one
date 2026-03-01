import assert from 'node:assert';
import { describe, it } from 'node:test';
import { invert } from './invert';

describe('invert', () => {
  it('inverts keys and values', () => {
    assert.deepEqual(invert({ a: 1, b: 'two', c: true }), { '1': 'a', two: 'b', true: 'c' });
  });

  it('uses last key when duplicate values exist', () => {
    assert.deepEqual(invert({ a: 1, b: 1 }), { '1': 'b' });
  });

  it('throws for invalid input', () => {
    assert.throws(() => invert([] as never), TypeError, 'input must be a plain object.');
  });
});
