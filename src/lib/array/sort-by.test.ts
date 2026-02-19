import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sortBy } from './sort-by';

describe('sortBy', () => {
  it('should sort values ascending by default', () => {
    assert.deepEqual(
      sortBy([3, 1, 2], (value) => value),
      [1, 2, 3],
    );
  });

  it('should sort values in descending order', () => {
    assert.deepEqual(
      sortBy(['b', 'a', 'c'], (value) => value, 'desc'),
      ['c', 'b', 'a'],
    );
  });

  it('should support date keys', () => {
    const input = [
      { id: 'b', createdAt: new Date('2024-02-01') },
      { id: 'a', createdAt: new Date('2024-01-01') },
    ];

    assert.deepEqual(
      sortBy(input, (item) => item.createdAt),
      [input[1], input[0]],
    );
  });

  it('should preserve input and keep equal keys stable', () => {
    const input = [
      { id: 'a', score: 1 },
      { id: 'b', score: 1 },
      { id: 'c', score: 2 },
    ];

    const output = sortBy(input, (item) => item.score);

    assert.deepEqual(output, [input[0], input[1], input[2]]);
    assert.notStrictEqual(output, input);
  });

  it('should throw for invalid direction', () => {
    assert.throws(
      () => sortBy([1, 2], (value) => value, 'up' as 'asc'),
      RangeError,
      "direction must be either 'asc' or 'desc'.",
    );
  });
});
