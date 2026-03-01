import assert from 'node:assert';
import { describe, it } from 'node:test';
import { ceilTo } from './ceil-to';

describe('ceilTo', () => {
  it('ceils with default and custom precision', () => {
    assert.equal(ceilTo(1.1), 2);
    assert.equal(ceilTo(1.231, 2), 1.24);
    assert.equal(ceilTo(-1.239, 2), -1.23);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => ceilTo(Number.NaN), RangeError, 'value must be a finite number.');
    assert.throws(() => ceilTo(1, -1), RangeError, 'decimals must be a non-negative integer.');
    assert.throws(() => ceilTo(1, 1.1), RangeError, 'decimals must be a non-negative integer.');
  });
});
