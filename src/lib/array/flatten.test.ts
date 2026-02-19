import { describe, it } from 'node:test';
import assert from 'node:assert';
import { flatten } from './flatten';

describe('flatten', () => {
  it('should flatten one level', () => {
    assert.deepEqual(flatten([1, [2, 3], 4, [5]]), [1, 2, 3, 4, 5]);
  });

  it('should keep nested deeper arrays at one level flatten', () => {
    assert.deepEqual(flatten<number | number[]>([1, [[2]], 3]), [1, [2], 3]);
  });
});
