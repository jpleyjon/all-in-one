import { describe, it } from 'node:test';
import assert from 'node:assert';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should return a shuffled copy', () => {
    const input = [1, 2, 3, 4];
    const output = shuffle(input, () => 0);

    assert.deepEqual(output, [2, 3, 4, 1]);
    assert.deepEqual(input, [1, 2, 3, 4]);
    assert.notStrictEqual(output, input);
  });

  it('should handle empty and single-item arrays', () => {
    assert.deepEqual(
      shuffle([], () => 0.5),
      [],
    );
    assert.deepEqual(
      shuffle([1], () => 0.5),
      [1],
    );
  });
});
