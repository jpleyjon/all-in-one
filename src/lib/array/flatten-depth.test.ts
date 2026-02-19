import { describe, it } from 'node:test';
import assert from 'node:assert';
import { flattenDepth } from './flatten-depth';

describe('flattenDepth', () => {
  it('should flatten one level by default', () => {
    assert.deepEqual(flattenDepth([1, [2, [3]]]), [1, 2, [3]]);
  });

  it('should flatten up to the provided depth', () => {
    assert.deepEqual(flattenDepth([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]);
  });

  it('should return a shallow copy when depth is zero', () => {
    const input = [1, [2, [3]]];
    const output = flattenDepth(input, 0);

    assert.deepEqual(output, input);
    assert.notStrictEqual(output, input);
  });

  it('should throw for invalid depth', () => {
    assert.throws(
      () => flattenDepth([1, [2]], -1),
      RangeError,
      'depth must be a non-negative integer.',
    );

    assert.throws(
      () => flattenDepth([1, [2]], 1.2),
      RangeError,
      'depth must be a non-negative integer.',
    );
  });
});
