import assert from 'node:assert';
import { describe, it } from 'node:test';
import { variance } from './variance';

describe('variance', () => {
  it('computes population and sample variance', () => {
    assert.equal(variance([1, 2, 3]), 2 / 3);
    assert.equal(variance([1, 2, 3], true), 1);
  });

  it('returns zero for empty arrays', () => {
    assert.equal(variance([]), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => variance(1 as never), TypeError, 'values must be an array.');
    assert.throws(() => variance([1], 'yes' as never), TypeError, 'sample must be a boolean.');
    assert.throws(
      () => variance([1], true),
      RangeError,
      'sample variance requires at least two values.',
    );
    assert.throws(
      () => variance([1, Number.NaN]),
      RangeError,
      'values[1] must be a finite number.',
    );
  });
});
