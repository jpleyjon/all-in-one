import { describe, it } from 'node:test';
import assert from 'node:assert';
import { swap } from './swap';

describe('swap', () => {
  it('should swap two indexes', () => {
    assert.deepEqual(swap([1, 2, 3], 0, 2), [3, 2, 1]);
  });

  it('should return a copy when indexes are equal', () => {
    const input = [1, 2, 3];
    const output = swap(input, 1, 1);

    assert.deepEqual(output, input);
    assert.notStrictEqual(output, input);
  });

  it('should throw for invalid indexes', () => {
    assert.throws(
      () => swap([1, 2], -1, 1),
      RangeError,
      'leftIndex and rightIndex must be valid array indexes.',
    );

    assert.throws(
      () => swap([1, 2], 0, 2),
      RangeError,
      'leftIndex and rightIndex must be valid array indexes.',
    );

    assert.throws(
      () => swap([1, 2], 0.2, 1),
      RangeError,
      'leftIndex and rightIndex must be valid array indexes.',
    );
  });
});
