import { describe, it } from 'node:test';
import assert from 'node:assert';
import { minBy } from './min-by';

describe('minBy', () => {
  it('should return item with smallest selector value', () => {
    const input = [
      { id: 'a', score: 20 },
      { id: 'b', score: 10 },
      { id: 'c', score: 15 },
    ];

    assert.deepEqual(
      minBy(input, (item) => item.score),
      input[1],
    );
  });

  it('should support date selector values', () => {
    const input = [
      { id: 'late', createdAt: new Date('2024-06-01') },
      { id: 'early', createdAt: new Date('2024-01-01') },
    ];

    assert.deepEqual(
      minBy(input, (item) => item.createdAt),
      input[1],
    );
  });

  it('should return undefined for empty arrays', () => {
    assert.equal(
      minBy([], (value) => value as number),
      undefined,
    );
  });
});
