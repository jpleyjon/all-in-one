import { describe, it } from 'node:test';
import assert from 'node:assert';
import { insertAt } from './insert-at';

describe('insertAt', () => {
  it('should insert at start, middle, and end', () => {
    assert.deepEqual(insertAt([2, 3], 0, 1), [1, 2, 3]);
    assert.deepEqual(insertAt([1, 3], 1, 2), [1, 2, 3]);
    assert.deepEqual(insertAt([1, 2], 2, 3), [1, 2, 3]);
  });

  it('should throw for invalid indexes', () => {
    assert.throws(
      () => insertAt([1, 2], -1, 0),
      RangeError,
      'index must be an integer between 0 and input.length.',
    );

    assert.throws(
      () => insertAt([1, 2], 3, 0),
      RangeError,
      'index must be an integer between 0 and input.length.',
    );

    assert.throws(
      () => insertAt([1, 2], 1.2, 0),
      RangeError,
      'index must be an integer between 0 and input.length.',
    );
  });
});
