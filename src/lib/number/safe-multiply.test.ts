import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeMultiply } from './safe-multiply';

describe('safeMultiply', () => {
  it('multiplies finite values', () => {
    assert.equal(safeMultiply(2, 3), 6);
  });

  it('throws for invalid inputs and invalid result', () => {
    assert.throws(() => safeMultiply(Number.NaN, 1), RangeError, 'a must be a finite number.');
    assert.throws(() => safeMultiply(1, Number.NaN), RangeError, 'b must be a finite number.');
    assert.throws(
      () => safeMultiply(Number.MAX_VALUE, 2),
      RangeError,
      'result must be a finite number.',
    );
  });
});
