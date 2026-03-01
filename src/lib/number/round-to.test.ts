import assert from 'node:assert';
import { describe, it } from 'node:test';
import { roundTo } from './round-to';

describe('roundTo', () => {
  it('rounds with default and custom precision', () => {
    assert.equal(roundTo(1.5), 2);
    assert.equal(roundTo(1.235, 2), 1.24);
    assert.equal(roundTo(-1.235, 2), -1.24);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => roundTo(Number.NaN), RangeError, 'value must be a finite number.');
    assert.throws(() => roundTo(1, -1), RangeError, 'decimals must be a non-negative integer.');
    assert.throws(() => roundTo(1, 1.2), RangeError, 'decimals must be a non-negative integer.');
  });
});
