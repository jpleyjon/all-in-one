import { describe, it } from 'node:test';
import assert from 'node:assert';
import { intersection } from './intersection';

describe('intersection', () => {
  it('should return shared unique values preserving left order', () => {
    assert.deepEqual(intersection([1, 2, 1, 3, 4], [4, 1, 5]), [1, 4]);
  });

  it('should return empty array when there is no overlap', () => {
    assert.deepEqual(intersection([1, 2], [3, 4]), []);
  });
});
