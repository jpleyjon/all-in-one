import { describe, it } from 'node:test';
import assert from 'node:assert';
import { chunk } from './chunk';

describe('chunk', () => {
  it('should split items by chunk size', () => {
    assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  });

  it('should return empty arrays unchanged', () => {
    assert.deepEqual(chunk([], 3), []);
  });

  it('should throw for invalid size', () => {
    assert.throws(
      () => chunk([1, 2], 0),
      RangeError,
      'size must be a positive integer.',
    );

    assert.throws(
      () => chunk([1, 2], 1.5),
      RangeError,
      'size must be a positive integer.',
    );
  });
});
