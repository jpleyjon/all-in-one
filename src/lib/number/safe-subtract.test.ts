import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeSubtract } from './safe-subtract';

describe('safeSubtract', () => {
  it('subtracts finite values', () => {
    assert.equal(safeSubtract(5, 3), 2);
  });

  it('throws for invalid inputs and invalid result', () => {
    assert.throws(() => safeSubtract(Number.NaN, 1), RangeError, 'a must be a finite number.');
    assert.throws(() => safeSubtract(1, Number.NaN), RangeError, 'b must be a finite number.');
    assert.throws(
      () => safeSubtract(-Number.MAX_VALUE, Number.MAX_VALUE),
      RangeError,
      'result must be a finite number.',
    );
  });
});
