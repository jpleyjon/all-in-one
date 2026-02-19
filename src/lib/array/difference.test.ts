import { describe, it } from 'node:test';
import assert from 'node:assert';
import { difference } from './difference';

describe('difference', () => {
  it('should remove values that exist in the right array', () => {
    assert.deepEqual(difference([1, 2, 3, 4], [2, 4]), [1, 3]);
  });

  it('should return a shallow copy when there are no exclusions', () => {
    const input = [1, 2];
    const output = difference(input, []);

    assert.deepEqual(output, [1, 2]);
    assert.notStrictEqual(output, input);
  });
});
