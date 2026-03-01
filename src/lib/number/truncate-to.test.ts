import assert from 'node:assert';
import { describe, it } from 'node:test';
import { truncateTo } from './truncate-to';

describe('truncateTo', () => {
  it('truncates with default and custom precision', () => {
    assert.equal(truncateTo(1.9), 1);
    assert.equal(truncateTo(1.239, 2), 1.23);
    assert.equal(truncateTo(-1.239, 2), -1.23);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => truncateTo(Number.NaN), RangeError, 'value must be a finite number.');
    assert.throws(() => truncateTo(1, -1), RangeError, 'decimals must be a non-negative integer.');
    assert.throws(() => truncateTo(1, 1.1), RangeError, 'decimals must be a non-negative integer.');
  });
});
