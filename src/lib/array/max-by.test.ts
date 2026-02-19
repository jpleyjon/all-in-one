import { describe, it } from 'node:test';
import assert from 'node:assert';
import { maxBy } from './max-by';

describe('maxBy', () => {
  it('should return item with largest selector value', () => {
    const input = [
      { id: 'a', score: 20 },
      { id: 'b', score: 10 },
      { id: 'c', score: 15 },
    ];

    assert.deepEqual(maxBy(input, (item) => item.score), input[0]);
  });

  it('should support date selector values', () => {
    const input = [
      { id: 'early', createdAt: new Date('2024-01-01') },
      { id: 'late', createdAt: new Date('2024-06-01') },
    ];

    assert.deepEqual(maxBy(input, (item) => item.createdAt), input[1]);
  });

  it('should return undefined for empty arrays', () => {
    assert.equal(maxBy([], (value) => value as number), undefined);
  });
});
