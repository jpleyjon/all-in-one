import { describe, it } from 'node:test';
import assert from 'node:assert';
import { union } from './union';

describe('union', () => {
  it('should combine arrays and deduplicate values', () => {
    assert.deepEqual(union([1, 2], [2, 3], [3, 4]), [1, 2, 3, 4]);
  });

  it('should return empty array with no inputs', () => {
    assert.deepEqual(union<number>(), []);
  });
});
