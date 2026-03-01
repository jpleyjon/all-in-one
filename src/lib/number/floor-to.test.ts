import assert from 'node:assert';
import { describe, it } from 'node:test';
import { floorTo } from './floor-to';

describe('floorTo', () => {
  it('floors with default and custom precision', () => {
    assert.equal(floorTo(1.9), 1);
    assert.equal(floorTo(1.239, 2), 1.23);
    assert.equal(floorTo(-1.231, 2), -1.24);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => floorTo(Number.NaN), RangeError, 'value must be a finite number.');
    assert.throws(() => floorTo(1, -1), RangeError, 'decimals must be a non-negative integer.');
    assert.throws(() => floorTo(1, 1.1), RangeError, 'decimals must be a non-negative integer.');
  });
});
