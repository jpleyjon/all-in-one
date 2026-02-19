import { describe, it } from 'node:test';
import assert from 'node:assert';
import { move } from './move';

describe('move', () => {
  it('should move an item to a different position', () => {
    assert.deepEqual(move([1, 2, 3, 4], 0, 2), [2, 3, 1, 4]);
  });

  it('should return a copy when moving to the same index', () => {
    const input = [1, 2, 3];
    const output = move(input, 1, 1);

    assert.deepEqual(output, input);
    assert.notStrictEqual(output, input);
  });

  it('should throw for invalid indexes', () => {
    assert.throws(
      () => move([1, 2], -1, 1),
      RangeError,
      'fromIndex and toIndex must be valid array indexes.',
    );

    assert.throws(
      () => move([1, 2], 0, 2),
      RangeError,
      'fromIndex and toIndex must be valid array indexes.',
    );

    assert.throws(
      () => move([1, 2], 0.5, 1),
      RangeError,
      'fromIndex and toIndex must be valid array indexes.',
    );
  });
});
