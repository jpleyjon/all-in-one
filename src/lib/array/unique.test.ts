import { describe, it } from 'node:test';
import assert from 'node:assert';
import { unique } from './unique';

describe('unique', () => {
  it('should remove duplicate primitive values', () => {
    assert.deepEqual(unique([1, 2, 1, 3, 2]), [1, 2, 3]);
  });

  it('should preserve first occurrence order', () => {
    assert.deepEqual(unique(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
  });
});
