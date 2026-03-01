import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeAdd } from './safe-add';

describe('safeAdd', () => {
  it('adds finite values', () => {
    assert.equal(safeAdd(2, 3), 5);
  });

  it('throws for invalid inputs and invalid result', () => {
    assert.throws(() => safeAdd(Number.NaN, 1), RangeError, 'a must be a finite number.');
    assert.throws(() => safeAdd(1, Number.NaN), RangeError, 'b must be a finite number.');
    assert.throws(
      () => safeAdd(Number.MAX_VALUE, Number.MAX_VALUE),
      RangeError,
      'result must be a finite number.',
    );
  });
});
