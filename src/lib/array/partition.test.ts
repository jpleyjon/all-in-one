import { describe, it } from 'node:test';
import assert from 'node:assert';
import { partition } from './partition';

describe('partition', () => {
  it('should split values by predicate', () => {
    assert.deepEqual(
      partition([1, 2, 3, 4], (value) => value % 2 === 0),
      [
        [2, 4],
        [1, 3],
      ],
    );
  });

  it('should keep empty buckets when nothing matches', () => {
    assert.deepEqual(
      partition([1, 3], (value) => value % 2 === 0),
      [[], [1, 3]],
    );
  });
});
