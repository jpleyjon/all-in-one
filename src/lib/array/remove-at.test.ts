import { describe, it } from 'node:test';
import assert from 'node:assert';
import { removeAt } from './remove-at';

describe('removeAt', () => {
  it('should remove the item at the provided index', () => {
    assert.deepEqual(removeAt([1, 2, 3], 1), [1, 3]);
  });

  it('should throw for invalid indexes', () => {
    assert.throws(
      () => removeAt([1, 2], -1),
      RangeError,
      'index must be an integer between 0 and input.length - 1.',
    );

    assert.throws(
      () => removeAt([1, 2], 2),
      RangeError,
      'index must be an integer between 0 and input.length - 1.',
    );

    assert.throws(
      () => removeAt([1, 2], 1.1),
      RangeError,
      'index must be an integer between 0 and input.length - 1.',
    );
  });
});
